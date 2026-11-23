import { adminFieldClass, Field } from './ui';

interface SeoFieldsEditorProps {
  slug: string;
  title: string;
  description: string;
  imageAlt?: string;
  onSlugChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onImageAltChange?: (value: string) => void;
}

export function SeoFieldsEditor({
  slug,
  title,
  description,
  imageAlt,
  onSlugChange,
  onTitleChange,
  onDescriptionChange,
  onImageAltChange
}: SeoFieldsEditorProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-4 sm:p-5">
      <div>
        <h2 className="font-display text-2xl font-light tracking-tight">Search appearance</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Optional title and description overrides. Leave them blank to use the page content automatically.
        </p>
      </div>
      <Field label="URL slug" hint="Lowercase words separated with hyphens. Changing this changes the public URL.">
        <input value={slug} onChange={(event) => onSlugChange(event.target.value)} className={adminFieldClass} placeholder="sunrise-yoga" />
      </Field>
      <Field label="SEO title" hint={`${title.length}/60 characters`}>
        <input value={title} maxLength={70} onChange={(event) => onTitleChange(event.target.value)} className={adminFieldClass} placeholder="Uses the page title when blank" />
      </Field>
      <Field label="Meta description" hint={`${description.length}/160 characters`}>
        <textarea
          value={description}
          maxLength={180}
          rows={3}
          onChange={(event) => onDescriptionChange(event.target.value)}
          className={adminFieldClass}
          placeholder="Uses the summary or description when blank" />
      </Field>
      {onImageAltChange ?
        <Field label="Featured image alt text" hint="Describe the image for visitors who cannot see it.">
          <input value={imageAlt ?? ''} onChange={(event) => onImageAltChange(event.target.value)} className={adminFieldClass} />
        </Field> :
        null}
    </section>
  );
}
