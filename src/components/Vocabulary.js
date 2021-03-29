import { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

const url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/`;

const WordGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
`;

export default function Vocabulary({ state, dispatch }) {
  const [word, setWord] = useState("");
  const [input, setInput] = useState(null);

  useEffect(() => {
    const getWord = async (wordToFetch) => {
      dispatch({ type: "LOADING" });
      const res = await fetch(`${url}${wordToFetch}`);
      let def = await res.json();
      def = def[0];
      if (def) {
        if (state.definitions.filter((e) => e.word === word).length === 0) {
          dispatch({ type: "ADD_WORD", def });
        }
      }
    };

    if (word !== "") {
      getWord(word);
    }
  }, [word, dispatch]);

  return (
    <>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button type="button" onClick={(e) => setWord(input)}>
        Submit
      </button>
      <WordGrid>
        {state &&
          state.definitions &&
          state.definitions.map((def, i) => {
            return (
              <Fragment key={`${def.word}word`}>
                <div>{def.word}</div>
                <div>
                  {def.meanings.map((meaning, i) => {
                    return (
                      <div key={`${def.word}${meaning.partOfSpeech}`}>
                        {meaning.partOfSpeech}:
                        {meaning.definitions.map((definition, i) => {
                          return <div key={i}>{definition.definition}</div>;
                        })}
                      </div>
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
      </WordGrid>
    </>
  );
}
