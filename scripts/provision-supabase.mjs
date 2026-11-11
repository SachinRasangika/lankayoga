import { readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const API = 'https://api.supabase.com/v1';
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  console.error('Set SUPABASE_ACCESS_TOKEN first (supabase.com/dashboard/account/tokens).');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
};

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, { headers, ...options });
  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!response.ok) {
    throw new Error(`${options.method ?? 'GET'} ${path} ${response.status}: ${typeof body === 'string' ? body : JSON.stringify(body)}`);
  }
  return body;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const dbPassword = process.env.SUPABASE_DB_PASSWORD || `Ly#${randomBytes(12).toString('base64url')}`;
const adminEmail = process.env.ADMIN_EMAIL || 'admin@lankayogaayurveda.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'lanka-admin';
const region = process.env.SUPABASE_REGION || 'ap-southeast-1';
const name = process.env.SUPABASE_PROJECT_NAME || 'lankayoga';

const orgs = await api('/organizations');
const org = orgs[0];
if (!org) {
  throw new Error('No Supabase organization on this account. Sign in at supabase.com first.');
}

console.log(`Using org ${org.name} (${org.id})`);

const existing = await api('/projects');
let project = existing.find((item) => item.name === name);
if (!project) {
  console.log(`Creating project ${name} in ${region}…`);
  project = await api('/projects', {
    method: 'POST',
    body: JSON.stringify({
      name,
      organization_id: org.id,
      db_pass: dbPassword,
      region,
      plan: 'free'
    })
  });
} else {
  console.log(`Project ${name} already exists (${project.id}).`);
}

const ref = project.id;
let status = project.status;
for (let attempt = 0; attempt < 40 && status !== 'ACTIVE_HEALTHY'; attempt += 1) {
  console.log(`Waiting for database… ${status ?? 'starting'}`);
  await sleep(8000);
  const latest = (await api('/projects')).find((item) => item.id === ref);
  status = latest?.status;
}
if (status !== 'ACTIVE_HEALTHY') {
  throw new Error(`Project did not become healthy (status: ${status}). Try again in a minute.`);
}

const keys = await api(`/projects/${ref}/api-keys`);
const anon = keys.find((item) => item.name === 'anon' || item.tags?.includes?.('anon'))?.api_key
  ?? keys.find((item) => item.name === 'anon')?.api_key;
const service = keys.find((item) => item.name === 'service_role' || item.tags?.includes?.('service_role'))?.api_key
  ?? keys.find((item) => item.name === 'service_role')?.api_key;
if (!anon || !service) {
  throw new Error(`Could not read API keys: ${JSON.stringify(keys)}`);
}

const url = `https://${ref}.supabase.co`;
const sql = readFileSync(new URL('../supabase/migrations/20260920000000_init.sql', import.meta.url), 'utf8');
console.log('Applying schema…');
await api(`/projects/${ref}/database/query`, {
  method: 'POST',
  body: JSON.stringify({ query: sql })
});

console.log('Creating staff login…');
const userResponse = await fetch(`${url}/auth/v1/admin/users`, {
  method: 'POST',
  headers: {
    apikey: service,
    Authorization: `Bearer ${service}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true
  })
});
if (!userResponse.ok) {
  const detail = await userResponse.text();
  if (!detail.includes('already been registered') && !detail.includes('already exists')) {
    throw new Error(`Could not create admin user: ${detail}`);
  }
}

try {
  await api(`/projects/${ref}/config/auth`, {
    method: 'PATCH',
    body: JSON.stringify({ DISABLE_SIGNUP: true })
  });
} catch (error) {
  console.warn(`Could not disable public signup: ${error.message}`);
}

const env = `VITE_SUPABASE_URL=${url}
VITE_SUPABASE_ANON_KEY=${anon}
SUPABASE_SERVICE_ROLE_KEY=${service}
SUPABASE_PROJECT_REF=${ref}
SUPABASE_DB_PASSWORD=${dbPassword}
ADMIN_EMAIL=${adminEmail}
ADMIN_PASSWORD=${adminPassword}
`;
writeFileSync(new URL('../.env.local', import.meta.url), env);
writeFileSync(new URL('../.env', import.meta.url), `VITE_SUPABASE_URL=${url}\nVITE_SUPABASE_ANON_KEY=${anon}\n`);

console.log(`Connected. Project ${ref}`);
console.log(`Staff login: ${adminEmail}`);
