import React, { useEffect, useState } from "react";
import data from "../data.json";

let maxOptions = 0;
data.questions.forEach((question) => {
  if (Object.values(question.options).length > maxOptions) {
    maxOptions = Object.values(question.options).length;
  }
});

export default () => {
  const [answers, setAnswers] = useState(
    Array(maxOptions * data.questions.length).fill(false)
  );
  const [selected, setSelected] = useState(
    Array(maxOptions * data.questions.length).fill("notSelected")
  );
  const [submitted, setSubmitted] = useState(false);
  const [max, setMax] = useState(-1);
  const [visible, setVisible] = useState("notVisible");

  useEffect(() => {
    if (max !== -1) {
      setVisible("isVisible");
    }
  }, [max]);

  function printQuestions() {
    return data.questions.map((question, i) => (
      <div key={i} className="question">
        <div className="prompt">
          <strong>
            {i + 1}. {question.prompt}
          </strong>
        </div>
        {Object.values(question.options).map((option, j) => (
          <div
            key={maxOptions * i + j}
            id="options"
            className={selected[maxOptions * i + j]}
            onClick={() => {
              if (submitted === false) {
                const answersArray = [...answers];
                answersArray.forEach((_, index) => {
                  if (index >= maxOptions * i && index < maxOptions * (i + 1)) {
                    if (index === maxOptions * i + j) {
                      answersArray[maxOptions * i + j] =
                        !answersArray[maxOptions * i + j];
                    } else if (index !== maxOptions * i + j) {
                      answersArray[index] = false;
                    }
                  }
                });
                setAnswers(answersArray);

                const selectedArray = [...selected];
                selectedArray.forEach((_, index) => {
                  if (index >= maxOptions * i && index < maxOptions * (i + 1)) {
                    if (index === maxOptions * i + j) {
                      if (selectedArray[maxOptions * i + j] === "notSelected") {
                        selectedArray[maxOptions * i + j] = "selected";
                      } else if (
                        selectedArray[maxOptions * i + j] === "selected"
                      ) {
                        selectedArray[maxOptions * i + j] = "notSelected";
                      }
                    } else {
                      selectedArray[index] = "notSelected";
                    }
                  }
                });
                setSelected(selectedArray);
              }
            }}
          >
            <input
              type="checkbox"
              className="checkbox"
              checked={answers[maxOptions * i + j]}
              onChange={() => {
                if (submitted === false) {
                  const answersArray = [...answers];
                  answersArray.forEach((_, index) => {
                    if (
                      index >= maxOptions * i &&
                      index < maxOptions * (i + 1)
                    ) {
                      if (index === maxOptions * i + j) {
                        answersArray[maxOptions * i + j] =
                          !answersArray[maxOptions * i + j];
                      } else if (index !== maxOptions * i + j) {
                        answersArray[index] = false;
                      }
                    }
                  });
                  setAnswers(answersArray);

                  const selectedArray = [...selected];
                  selectedArray.forEach((_, index) => {
                    if (
                      index >= maxOptions * i &&
                      index < maxOptions * (i + 1)
                    ) {
                      if (index === maxOptions * i + j) {
                        if (
                          selectedArray[maxOptions * i + j] === "notSelected"
                        ) {
                          selectedArray[maxOptions * i + j] = "selected";
                        } else if (
                          selectedArray[maxOptions * i + j] === "selected"
                        ) {
                          selectedArray[maxOptions * i + j] = "notSelected";
                        }
                      } else {
                        selectedArray[index] = "notSelected";
                      }
                    }
                  });
                  setSelected(selectedArray);
                }
              }}
            ></input>
            <div>{option}</div>
          </div>
        ))}
      </div>
    ));
  }

  function showResults(event) {
    event.preventDefault();
    let count = 0;
    answers.forEach((answer) => {
      if (answer) {
        count++;
      }
    });

    if (count === data.questions.length) {
      setSubmitted(true);

      let amountsArray = Array(maxOptions).fill(0);
      answers.forEach((answer, index) => {
        if (answer) {
          amountsArray[index % maxOptions]++;
        }
      });
      let indexOfMax = amountsArray.findIndex(
        (amount) => amount === Math.max(...amountsArray)
      );
      setMax(indexOfMax);
    }
  }

  function resetQuiz() {
    let resetAnswers = Array(maxOptions * data.questions.length).fill(false);
    setAnswers(resetAnswers);

    let resetSelected = Array(maxOptions * data.questions.length).fill(
      "notSelected"
    );
    setSelected(resetSelected);

    setSubmitted(false);
    setMax(-1);
    setVisible("notVisible");
  }

  return (
    <div className="entirePage">
      <form onSubmit={showResults}>
        {printQuestions()}
        <button type="submit" className={visible} id="submit">
          Show me my results!
        </button>
      </form>
      <button className={visible} onClick={resetQuiz} id="reset">
        Retake Quiz
      </button>
      <div className={visible} id="results">
        <br></br>
        <div className="congrats">
          <strong>Congratulations!</strong>
        </div>
        {data.results[max]}
      </div>
    </div>
  );
};
