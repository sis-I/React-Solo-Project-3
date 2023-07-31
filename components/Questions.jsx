import React from "react"
import ChoiceButton from "./ChoiceButton";
import Answers from "./Answers";


export default function Questions(props) {
    const [myData, setMyData] = React.useState([]);
    const [showAnswer, setShowAnswer] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);

    const [selection, setSelection] = React.useState(getSelection());

    React.useEffect(() => {
        console.log("Effect runs");
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setMyData(data.results));

    }, []);

    React.useEffect(() => {
        console.log("questions effect")
        setQuestions(getQuestionsChoices());
    }, [myData])

    function getSelection() {
        const selectArr = questions.map(data => {
            return Array(data.answers.length).fill(false);
        });
        return selectArr;

    }

    function checkAnswer() {
        setShowAnswer(true);
    }


    function answerClick(e, index, i) {
        e.preventDefault();
        console.log(i, "is clicked");

        setSelection(prevSelection =>  {
            let isSelected = prevSelection[index][i];
            prevSelection[index][i] = !isSelected;
            return prevSelection;
        });
        console.log(selection);

    }

    function getQuestionsChoices() {
        const copyData = myData.slice();
        console.log(myData);

        const questionsChoices = copyData.map(questionChoices => {
            const ans = [...questionChoices.incorrect_answers];
            const correct_ans = questionChoices.correct_answer;
            const len = ans.length + 1;
            const randIndex = Math.floor(Math.random() * len);
            ans.splice(randIndex, 0, correct_ans);
            return { "question": questionChoices.question, answers: ans }
        })

        return questionsChoices;
    }

    const questionElements = questions.map((quiz, index) => {
        const choiceElements = quiz.answers.map((choice, i) => (
            <ChoiceButton
                key={i}
                choice={choice}
                handleClick={(e) => answerClick(e, index, i)}
                selected={null} />
        ));

        return (
            <div className="question-answer">
                <h3>{quiz.question}</h3>
                <ul className="question-choices">
                    {choiceElements}
                </ul>
                <hr />
            </div>
        )
    });

    return (
        <>
            {!showAnswer ?
                <div className="question--main">
                    {questionElements}
                    <button
                        className="check-ans--btn"
                        onClick={checkAnswer}
                    >
                        Check Answer
                    </button>
                </div>
                :
                <Answers />
            }
        </>
    )
}