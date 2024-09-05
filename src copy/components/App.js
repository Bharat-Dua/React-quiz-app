import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreenQuiz from "./FinishScreenQuiz";
import Timer from "./Timer";
import Footer from "./Footer";
import useQuizContext from "../hooks/useQuizContext";

function App() {
  const { status, answer } = useQuizContext();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "loaded" && <StartScreen />}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              {answer !== null && <NextButton />}
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreenQuiz />}
      </Main>
    </div>
  );
}

export default App;
