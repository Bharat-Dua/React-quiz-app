import useQuizContext from "../hooks/useQuizContext";

function NextButton() {
  const { dispatch, answer, numQuestions, currentQuestionIndex } =
    useQuizContext();
  if (answer === null) return null;

  if (currentQuestionIndex < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (currentQuestionIndex === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        finish
      </button>
    );
}

export default NextButton;
