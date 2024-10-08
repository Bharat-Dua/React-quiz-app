import useQuizContext from "../hooks/useQuizContext";

function FinishScreenQuiz() {
  const { points, maxPoints, highScore, dispatch } = useQuizContext();
  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) {
    emoji = "🥇";
  } else if (percentage >= 80) {
    emoji = "🎉";
  } else if (percentage >= 50) {
    emoji = "🙃";
  } else if (percentage > 0) {
    emoji = "🤨";
  } else if (percentage === 0) {
    emoji = "🤦‍♂️";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">
        High Score: <strong>{highScore}</strong> points
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreenQuiz;
