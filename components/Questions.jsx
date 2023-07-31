import React from "react"
import ChoiceButton from "./ChoiceButton";
import Answers from "./Answers";


export default function Questions(props) {
    const [myData, setMyData] = React.useState([]);
    const [showAnswer, setShowAnswer] = React.useState(false);

    const [selection, setSelection] = React.useState(getSelection());

    React.useEffect(() => {
        console.log("Effect runs");
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setMyData(data.results));
    }, []);

    function getSelection() {
        const selectArr = myData.map(data => {
           return Array(data.incorrect_answers.length + 1).fill(false);
        });
        return selectArr;
    }
    
    function checkAnswer() {
        setShowAnswer(true);
    }


    function answerClick(e, index, i) {
        e.preventDefault();
        console.log(i, "is clicked");
        setSelection(prevSelection => prevSelection.map((ansList, selectIndex) => {
            return ansList.map((choice, ansIndex) => {
                if (index === selectIndex && i === ansIndex) {
                    return !choice;
                }
                return choice;
            })
        }));
    }
    
    function getChoices() {
        const cpyData = myData.slice();
        const choices = cpyData.map(singleObj => [...singleObj.incorrect_answers]);

        return choices;
    }

    console.log(getChoices());

    const questions = myData.map((quiz, index) => {
        const choiceElements = quiz.incorrect_answers.map((choice, i) => (
            <ChoiceButton
                key={i}
                choice={choice}
                handleClick={(e) => answerClick(e, index, i)}
                selected={"none"} />
        ));
        choiceElements.push(<ChoiceButton choice={quiz.correct_answer} />);

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
                {questions}
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