import { Link } from 'wouter-preact';

export const renderRating = (rating: number) => {
  const calculatedRating = Math.round(rating * 10);

  if (calculatedRating > 79) {
    return <div className="text-green-600">{calculatedRating}</div>;
  } else if (calculatedRating < 70) {
    return <div className="text-red-600">{calculatedRating}</div>;
  } else {
    return <div className="text-amber-500">{calculatedRating}</div>;
  }
};

export const HorizontalCard = ({
  poster_path,
  title,
  mediaType,
  id,
  release_date,
  rating,
}: {
  poster_path: string;
  title: string;
  mediaType: string;
  id: string;
  release_date: string;
  rating: number;
}) => {
  return (
    <Link to={`/details/${mediaType}/${id}`}>
      <div className="p-2 rounded-md hover:bg-blue-300 cursor-pointer">
        <div className="flex gap-2 items-start">
          <figure className="w-12 overflow-hidden rounded-lg flex-shrink-0">
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                  : `https://placehold.co/185x278?text=${title}`
              }
              className="w-full"
              alt={title}
              width="185"
              height="278"
              loading="lazy"
            />
          </figure>
          <div className="flex flex-col gap-1 flex-grow">
            <div className="font-semibold">{title}</div>
            <div className="flex gap-1 text-sm">
              <div>{release_date.slice(0, 4)}</div>•
              <div>{renderRating(rating)}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const TitleCard = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {
  return (
    <div>
      <div className="pb-2 border-b border-gray-300 mb-2">
        <h1 className="text-2xl font-bold text-blue-400">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export const CreditsCard = ({
  img,
  name,
  character,
}: {
  img: string;
  name: string;
  character: string;
}) => {
  return (
    <article className="text-sm mt-1">
      <figure className="w-20 flex-shrink-0 rounded-full overflow-hidden">
        <img
          src={
            img
              ? `https://image.tmdb.org/t/p/w185${img}`
              : `https://placehold.co/185x278?text=${name}`
          }
          alt="cast-thumbnail"
          className="h-20 object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          width="185"
          height="278"
        />
      </figure>
      <div className="py-2 text-center flex-grow">
        <h5 className="font-semibold line-clamp-2">{name}</h5>
        <p className="font-light line-clamp-2">{character}</p>
      </div>
    </article>
  );
};
