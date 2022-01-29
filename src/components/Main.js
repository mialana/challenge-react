import React, { useEffect, useState } from "react";
import data from "../data.json";

export default () => {
  const [answers, setAnswers] = useState(
    Array(
      Object.values(data.questions[0].options).length * data.questions.length
    ).fill(false)
  );
  const [selected, setSelected] = useState(
    Array(
      Object.values(data.questions[0].options).length * data.questions.length
    ).fill("notSelected")
  );
  const [numOptions, setNumOptions] = useState(
    Object.values(data.questions[0].options).length
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
      <div key={i}>
        <div className="prompt">{question.prompt}</div>
        {Object.values(question.options).map((option, j) => (
          <div key={numOptions * i + j}>
            <input
              type="checkbox"
              onChange={() => {
                if (submitted === false) {
                  const answersArray = [...answers];
                  answersArray.map((_, index) => {
                    if (
                      index >= numOptions * i &&
                      index <= numOptions * (i + 1)
                    ) {
                      if (index === numOptions * i + j) {
                        answersArray[numOptions * i + j] =
                          !answersArray[numOptions * i + j];
                      } else if (index !== numOptions * i + j) {
                        answersArray[index] = false;
                      }
                    }
                  });
                  setAnswers(answersArray);
                  console.log(answersArray);

                  const selectedArray = [...selected];
                  if (selectedArray) {
                    selectedArray.map((_, index) => {
                      if (
                        index >= numOptions * i &&
                        index <= numOptions * (i + 1)
                      ) {
                        if (index === numOptions * i + j) {
                          if (
                            selectedArray[numOptions * i + j] === "notSelected"
                          ) {
                            selectedArray[numOptions * i + j] = "selected";
                          } else if (
                            selectedArray[numOptions * i + j] === "selected"
                          ) {
                            selectedArray[numOptions * i + j] = "notSelected";
                          }
                        } else {
                          selectedArray[index] = "notSelected";
                        }
                      }
                    });
                  }

                  setSelected(selectedArray);
                  console.log(selectedArray);
                }
              }}
              checked={answers[numOptions * i + j]}
            ></input>
            <div
              className={selected[numOptions * i + j]}
              onClick={() => {
                if (submitted === false) {
                  const answersArray = [...answers];
                  answersArray.map((_, index) => {
                    if (
                      index >= numOptions * i &&
                      index <= numOptions * (i + 1)
                    ) {
                      if (index === numOptions * i + j) {
                        answersArray[numOptions * i + j] =
                          !answersArray[numOptions * i + j];
                      } else if (index !== numOptions * i + j) {
                        answersArray[index] = false;
                      }
                    }
                  });
                  setAnswers(answersArray);
                  console.log(answersArray);

                  const selectedArray = [...selected];
                  if (selectedArray) {
                    selectedArray.map((_, index) => {
                      if (
                        index >= numOptions * i &&
                        index <= numOptions * (i + 1)
                      ) {
                        if (index === numOptions * i + j) {
                          if (
                            selectedArray[numOptions * i + j] === "notSelected"
                          ) {
                            selectedArray[numOptions * i + j] = "selected";
                          } else if (
                            selectedArray[numOptions * i + j] === "selected"
                          ) {
                            selectedArray[numOptions * i + j] = "notSelected";
                          }
                        } else {
                          selectedArray[index] = "notSelected";
                        }
                      }
                    });
                  }

                  setSelected(selectedArray);
                  console.log(selectedArray);
                }
              }}
            >
              {option}
            </div>
          </div>
        ))}
      </div>
    ));
  }

  function showResults(event) {
    event.preventDefault();
    console.log("submitted");
    setSubmitted(true);
    console.log(answers);

    let amountsArray = Array(numOptions).fill(0);
    answers.map((answer, index) => {
      if (answer) {
        amountsArray[index % numOptions]++;
      }
    });
    console.log(amountsArray);
    let indexOfMax = amountsArray.findIndex(
      (amount) => amount === Math.max(...amountsArray)
    );
    console.log(Math.max(...amountsArray));
    console.log(indexOfMax);
    setMax(indexOfMax);
    console.log(data.results[indexOfMax]);
  }

  return (
    <div>
      <form onSubmit={showResults}>
        {printQuestions()}
        <button type="submit">Show Me My Results!</button>
      </form>
      <div className={visible}>{data.results[max]}</div>
    </div>
  );
};
