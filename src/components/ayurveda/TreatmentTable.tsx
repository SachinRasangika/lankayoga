import { Link } from 'react-router-dom';
import { therapies } from '../../data/ayurveda';
import { contact } from '../../data/contact';

const columns = ['Treatment', 'Description', 'Duration', 'Booking window'] as const;

export function TreatmentTable() {
  return (
    <div className="mt-14">
      <div className="hidden overflow-hidden rounded-3xl border border-line md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-warm">
              {columns.map((column) =>
              <th
                key={column}
                scope="col"
                className="px-5 py-4 text-[0.6875rem] font-medium uppercase tracking-widest text-muted">
                
                  {column}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {therapies.map((therapy) =>
            <tr key={therapy.id} className="border-t border-line">
                <th scope="row" className="px-5 py-5 align-top font-display text-xl font-light text-ink">
                  {therapy.name}
                </th>
                <td className="px-5 py-5 align-top text-sm leading-relaxed text-muted">{therapy.description}</td>
                <td className="whitespace-nowrap px-5 py-5 align-top text-sm text-ink">{therapy.duration}</td>
                <td className="px-5 py-5 align-top text-sm leading-relaxed text-ink">
                  <p>{therapy.bookingWindow}</p>
                  <Link
                    to={`/contact?topic=${encodeURIComponent(`${therapy.name} (${therapy.duration})`)}`}
                    className="mt-2 inline-block text-xs text-terracotta-600 underline underline-offset-4 dark:text-terracotta-300">
                    
                    Request this treatment
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-4 md:hidden">
        {therapies.map((therapy) =>
        <li key={therapy.id} className="rounded-3xl border border-line bg-raised p-5">
            <h3 className="font-display text-2xl font-light text-ink">{therapy.name}</h3>
            <dl className="mt-4 flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-[0.6875rem] uppercase tracking-widest text-muted">Description</dt>
                <dd className="mt-1 leading-relaxed text-muted">{therapy.description}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] uppercase tracking-widest text-muted">Duration</dt>
                <dd className="mt-1 text-ink">{therapy.duration}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] uppercase tracking-widest text-muted">Booking window</dt>
                <dd className="mt-1 leading-relaxed text-ink">{therapy.bookingWindow}</dd>
              </div>
            </dl>
            <Link
              to={`/contact?topic=${encodeURIComponent(`${therapy.name} (${therapy.duration})`)}`}
              className="mt-4 inline-block text-sm text-ink underline underline-offset-4">
              
              Request this treatment
            </Link>
          </li>
        )}
      </ul>

      <p className="mt-6 text-sm text-muted">
        Treatment requests go to{' '}
        <a href={`mailto:${contact.email}`} className="text-ink underline underline-offset-4">
          {contact.email}
        </a>
        , or call{' '}
        <a href={`tel:${contact.phoneTel}`} className="text-ink underline underline-offset-4">
          {contact.phoneDisplay}
        </a>
        .
      </p>
    </div>);

}
