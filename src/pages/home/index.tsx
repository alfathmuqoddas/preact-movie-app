import SearchBar from "../../components/searchBar";
import { sampleText } from "../../store/useCountStore";

export default function Homepage() {
  return (
    <article
      className={`${
        sampleText.value
          ? "p-4"
          : "h-[70vh] flex flex-col items-center justify-center"
      }`}
    >
      <SearchBar />
    </article>
  );
}
