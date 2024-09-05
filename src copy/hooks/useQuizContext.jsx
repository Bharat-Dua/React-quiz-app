import { useContext } from "react";
import { Quizcontext } from "../context/QuizContext";

function useQuizContext() {
  const context = useContext(Quizcontext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
}
export default useQuizContext;
