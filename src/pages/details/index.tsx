import { useParams } from 'wouter-preact';
import useFetch from '../../hooks/useFetch';
import { renderRating, TitleCard, CreditsCard } from '../../components/card';

export default function Details() {
  const params = useParams();
  const { data, isLoading, error } = useFetch<any>(
    `https://api.themoviedb.org/3/${params.mediaType}/${params.id}?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=en-US`
  );

  const {
    data: creditsData,
    isLoading: isLoadingCreditsData,
    error: errorCreditsData,
  } = useFetch<any>(
    `https://api.themoviedb.org/3/${params.mediaType}/${
      params.id
    }/credits?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
  );
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <>Error fetching data</>
      ) : (
        <>
          {/* Hero section */}
          <figure className="w-full relative rounded-2xl overflow-hidden ">
            <img
              src={
                data?.backdrop_path
                  ? `https://image.tmdb.org/t/p/w1280/${data?.backdrop_path}`
                  : `https://placehold.co/1280x720`
              }
              width="1280"
              height="720"
              alt={data?.title ?? data?.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            <div className="flex gap-4 absolute top-1/2 left-8 transform -translate-y-1/2 items-center">
              <figure className="hidden w-32 md:block overflow-hidden rounded-lg ">
                <img
                  src={
                    data?.poster_path
                      ? `https://image.tmdb.org/t/p/w185/${data?.poster_path}`
                      : `https://placehold.com/185x278`
                  }
                  className="w-full"
                  width="185"
                  height="278"
                  loading="lazy"
                  alt={data?.title ?? data?.name}
                />
              </figure>
              <div className="">
                <h1 className="font-bold text-2xl md:text-4xl text-white">
                  {data?.title ?? data?.name}
                </h1>
                <p className="text-white text-lg italic">"{data?.tagline}"</p>
              </div>
            </div>
          </figure>

          {/* Main information section */}
          <section className="flex flex-col mt-4 md:flex-row gap-2 md:gap-4">
            {/* Left side */}
            <section className="flex flex-col gap-2 md:w-8/12">
              <article className="shadow-lg rounded-2xl p-4 border border-gray-100">
                <TitleCard title="Overview">
                  <p>{data?.overview}</p>
                </TitleCard>
              </article>
              <article className="shadow-lg rounded-2xl p-4 border border-gray-100">
                <TitleCard title="Cast">
                  <div className="overflow-auto">
                    <div className="flex gap-2">
                      {creditsData?.cast?.map((c: any) => (
                        <CreditsCard
                          key={c.id}
                          img={c.profile_path}
                          name={c.name}
                          character={c.character}
                        />
                      ))}
                    </div>
                  </div>
                </TitleCard>
              </article>
            </section>

            {/* right side */}
            <aside className="flex flex-col gap-4 shadow-lg rounded-2xl p-4 md:w-4/12 border border-gray-100">
              <TitleCard title="Vote Average">
                <div className="text-4xl font-bold">
                  {renderRating(data?.vote_average)}
                </div>
              </TitleCard>
              <TitleCard title="Revenue">
                <p>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                  }).format(data?.revenue)}
                </p>
              </TitleCard>
              <TitleCard title="Budget">
                <p>
                  {Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                  }).format(data?.budget)}
                </p>
              </TitleCard>

              <TitleCard title="Genre">
                <div className="flex flex-wrap">
                  {data?.genres?.map((genre: any) => (
                    <button
                      key={genre.id}
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </TitleCard>
            </aside>
          </section>

          <pre>{JSON.stringify(data, null, 2)}</pre>
          <pre>{JSON.stringify(creditsData, null, 2)}</pre>
        </>
      )}
    </>
  );
}
