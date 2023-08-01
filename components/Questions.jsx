import React from "react"
import ChoiceButton from "./ChoiceButton";


export default function Questions(props) {
    const [myData, setMyData] = React.useState([]);
    const [showAnswer, setShowAnswer] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setMyData(data.results));

    }, []);

    React.useEffect(() => {
        setQuestions(getQuestionsChoices());
    }, [myData])
  
    function checkAnswer() {
        setShowAnswer(prevShowAns => !prevShowAns);
    }

    function answerClick(question, i) {
        setQuestions(prevQeustions => prevQeustions.map((prevQuestion) => {

            if (question == prevQuestion.question && 
                !prevQuestion.selected.every(elem => elem === false)) {

                prevQuestion.selected = prevQuestion.selected.map(elem => false)
            }

            return prevQuestion.question === question ?
                {...prevQuestion, 
                    selected: 
                        prevQuestion.selected.map((isSelected, idx) => i === idx ? !isSelected : isSelected)
                } :
                prevQuestion
        }));
    }

    function getQuestionsChoices() {
        const copyData = myData.slice();

        const questionsChoices = copyData.map(questionChoices => {
            const ans = [...questionChoices.incorrect_answers];
            const correct_ans = questionChoices.correct_answer;
            const len = ans.length + 1;
            const randIndex = Math.floor(Math.random() * len);
            ans.splice(randIndex, 0, correct_ans);

            return { 
                question: questionChoices.question,
                answers: ans,
                selected: Array(ans.length).fill(false)
            }
        })

        return questionsChoices;
    }

    const questionElements = questions.map((quiz, index) => {
        const choiceElements = quiz.answers.map((choice, i) => {
            const correct_ans = myData[index].correct_answer;
            return (
                <ChoiceButton
                    key={i}
                    choice={choice}
                    handleClick={() => answerClick(quiz.question, i)}
                    selected={quiz.selected[i]}
                    showAnswer={showAnswer}
                    correct_answer={correct_ans === quiz.answers[i]} 
                />
            )
        });

        return (
            <div className="question-answer">
                <h3>{quiz.question}</h3>
                <ul className="answer-choices">
                    {choiceElements}
                </ul>
                <hr />
            </div>
        )
    });

    return (
        <>
            <div className="question--main">
                {questionElements}

                {!showAnswer ?
                    <button
                        className="check-ans--btn"
                        onClick={checkAnswer}
                    >
                        Check Answer
                    </button>
                        :
                    <div className="show-scores">
                    <h3>You scored 3/5 correct answers</h3>
                    <button
                        className="play-again--btn"
                        onClick={() => props.playAgain()}
                        >
                        Play Again
                    </button>
                    </div>
                }
            </div>
        </>
    )
}