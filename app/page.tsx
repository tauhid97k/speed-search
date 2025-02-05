import SearchInput from "./search-input";

const HomePage = () => {
  return (
    <main className="h-screen py-4 grainy grid place-items-center">
      <div className="flex flex-col gap-6 items-center duration-500 animate animate-in fade-in slide-in-from-bottom-2.5">
        <h1 className="text-5xl font-bold text-zinc-700">SpeedSearch⚡</h1>
        <p className="text-center max-w-prose text-lg text-zinc-600 leading-snug">
          A high-performance API built with Hono, Next.js, Redis and Cloudflare.
          <br />
          Start typing a country name below to see the results
        </p>
        <SearchInput />
      </div>
    </main>
  );
};

export default HomePage;
