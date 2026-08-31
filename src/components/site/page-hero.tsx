import { Reveal } from "./reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden pt-32">
      <img
        src={image}
        alt={alt}
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="veil absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[86rem] px-5 pb-16 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-ivory/70">{eyebrow}</p>
          <h1 className="mt-5 text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">{title}</h1>
          {intro ? <p className="mt-6 max-w-xl text-base text-ivory/80">{intro}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
