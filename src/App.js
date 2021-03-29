import { useState } from "react";
import Layout from "./components/Layout";
import Pages from "./components/Pages";

function App() {
  const [page, setPage] = useState("vocab");
  return (
    <Layout {...{ setPage }}>
      <Pages {...{ page }} />
    </Layout>
  );
}

export default App;
