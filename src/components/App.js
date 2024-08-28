import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

const initialState = {
  questions: [],
  //'loading','error','ready','active','finished'
  status: "loading",
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
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
    default:
      throw new Error("action unknown");
  }
}
function App() {
  const [{ questions, status, currentQuestionIndex, answer }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
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
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "loaded" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <Questions
            question={questions[currentQuestionIndex]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
