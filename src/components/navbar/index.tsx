import { Link } from "wouter-preact";
export default function Navbar() {
  return (
    <nav className="font-semibold mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-1">
      <div className="rounded-full bg-blue-300 flex  px-4 sm:px-6 lg:px-8 items-center gap-4 h-12">
        <Link to="/preact-movie-app/">Home</Link>
        <Link to="/preact-movie-app/about">About</Link>
        <Link to="/preact-movie-app/search">Search</Link>
      </div>
    </nav>
  );
}
