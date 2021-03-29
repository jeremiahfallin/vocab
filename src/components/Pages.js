import AddWord from "./AddWord";
import Vocabulary from "./Vocabulary";
import WordTest from "./WordTest";
import useStoreWords from "../hooks/useStoreWords";

export default function Pages({ page }) {
  const [state, dispatch] = useStoreWords({ storageKey: "vocabulary" });
  if (page === "vocab") {
    return <Vocabulary {...{ state, dispatch }} />;
  }
  if (page === "test") {
    return <WordTest {...{ state }} />;
  }
  if (page === "add") {
    return <AddWord {...{ state, dispatch }} />;
  }
}
