import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreenQuiz from "./FinishScreenQuiz";

const initialState = {
  questions: [],
  //'loading','error','ready','active','finished'
  status: "loading",
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "loaded" };
    case "dataError":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.currentQuestionIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "loaded",
        highScore: state.highScore,
      };
    default:
      throw new Error("action unknown");
  }
}
function App() {
  const [
    { questions, status, currentQuestionIndex, answer, points, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  useEffect(() => {
    async function fetchData() {
      try {
        const respone = await fetch("http://localhost:9000/questions");
        const data = await respone.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error("Error while fetching", error);
        dispatch({ type: "dataError" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "loaded" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              index={currentQuestionIndex}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              question={questions[currentQuestionIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            {/* <NextButton dispatch={dispatch} answer={answer} /> */}
            {answer !== null && (
              <NextButton
                dispatch={dispatch}
                index={currentQuestionIndex}
                numQuestions={numQuestions}
              />
            )}
          </>
        )}
        {status === "finish" && (
          <FinishScreenQuiz
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
