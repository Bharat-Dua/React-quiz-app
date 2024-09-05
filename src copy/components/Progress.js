import useQuizContext from "../hooks/useQuizContext";

function Progress() {
  const { currentQuestionIndex, numQuestions, points, maxPoints, answer } =
    useQuizContext();

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currentQuestionIndex + Number(answer !== null)}
      />
      <p>
        Question <strong>{currentQuestionIndex + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
