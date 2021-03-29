import { useState } from "react";
import styled from "styled-components";

const WordGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const AnswerDefinition = styled.div`
  opacity: var(--submitted);
`;

const randomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

const createTest = (definitions) => {
  const answerIndex = randomIndex(definitions);
  const answerMeaningsIndex = randomIndex(definitions[answerIndex].meanings);
  const answerDefinitionsIndex = randomIndex(
    definitions[answerIndex].meanings[answerMeaningsIndex].definitions
  );
  const word = definitions[answerIndex].word;
  const definition =
    definitions[answerIndex].meanings[answerMeaningsIndex].definitions[
      answerDefinitionsIndex
    ].definition;
  const sentence = definitions[answerIndex].meanings[
    answerMeaningsIndex
  ].definitions[answerDefinitionsIndex].example
    .split(word)
    .join("_____");
  const words = [word];
  while (words.length < 4) {
    const newWord = definitions[randomIndex(definitions)].word;
    if (!words.includes(newWord)) {
      words.push(newWord);
    }
  }
  return {
    sentence,
    definition,
    words: shuffle(words),
    word,
  };
};

export default function WordTest({ state }) {
  const [submitted, setSubmitted] = useState(false);
  const [test, setTest] = useState(createTest(state.definitions));
  const [guess, setGuess] = useState(null);
  const submitGuess = () => {
    setSubmitted(true);
    if (guess === test.word) {
      console.log("Correct");
    }
  };

  return (
    <>
      <WordGrid>
        <div>{test.sentence}</div>
        <AnswerDefinition style={{ "--submitted": submitted ? 1 : 0 }}>
          {test.definition}
        </AnswerDefinition>
        {test.words.map((word) => {
          return (
            <div key={word}>
              {submitted && (
                <span>{`${word === test.word ? "✅" : "❌"}`}</span>
              )}
              <input
                type="radio"
                id="word"
                name="answers"
                value="word"
                onChange={(e) => setGuess(e.target.value)}
              />
              <label htmlFor="word">{word}</label>
            </div>
          );
        })}
        <button type="button" onClick={(e) => submitGuess()}>
          Submit
        </button>
        <button
          type="button"
          onClick={(e) => {
            setTest(createTest(state.definitions));
            setSubmitted(false);
          }}
        >
          Next
        </button>
      </WordGrid>
    </>
  );
}
