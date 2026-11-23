import { normalizeGallery } from '../../utils/gallery';

export function PhotoGallery({
  image,
  images,
  heroClassName = 'h-52 w-full object-cover'
}: {
  image?: string;
  images?: string[];
  heroClassName?: string;
}) {
  const photos = normalizeGallery(image, images);
  if (photos.length === 0) return null;
  const [cover, ...rest] = photos;

  return (
    <div>
      <img src={cover} alt="" className={heroClassName} />
      {rest.length > 0 ?
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {rest.map((src) =>
            <img key={src} src={src} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          )}
        </div> :
        null}
    </div>
  );
}
