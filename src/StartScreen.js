function StartScreen({ numQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to the react quiz!</h2>
      <h3>{numQuestions} questions to test your react mastery!</h3>
      <button className="btn btn-ui">let's start</button>
    </div>
  );
}

export default StartScreen;
