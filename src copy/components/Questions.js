import useQuizContext from "../hooks/useQuizContext";
import Options from "./Options";

function Questions() {
  // console.log(question);
  const { questions, currentQuestionIndex } = useQuizContext();
  const question = questions.at(currentQuestionIndex);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Questions;
