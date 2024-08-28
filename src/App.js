import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "loaded" };
    case "dataError":
      return { ...state, status: "error" };
    default:
      throw new Error("action unknown");
  }
}
function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
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
        {status === "loaded" && <StartScreen numQuestions={numQuestions} />}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}

export default App;
