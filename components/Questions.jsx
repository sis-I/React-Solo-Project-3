import React from "react"
import ChoiceButton from "./ChoiceButton";


export default function Questions(props) {
    const [myData, setMyData] = React.useState([]);
    const [selected, setSelected] = React.useState(Array(4).fill(false));

    React.useEffect(() => {
        console.log("Effect runs");
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setMyData(data.results));

    }, []);

    function answerClick(e, i) {
        e.preventDefault();
        console.log(i, "is clicked");
        setSelected(prevSelected => prevSelected.map((select, index) => {
            if (i === index) {
              return !select;
            }
            return select;
        }))
    }

    const questions = myData.map(quiz => {
        const choiceElements = quiz.incorrect_answers.map((choice, index) => (
            <ChoiceButton
                key={index} 
                choice={choice} 
                handleClick={(e)=> answerClick(e, index)} 
                selected={selected[index]} />
        ));
        choiceElements.push(<ChoiceButton choice={quiz.correct_answer} />);
        
        return (
            <div className="question-answer">
                <h3>{ quiz.question }</h3>
                <ul className="question-choices">
                    { choiceElements }
                </ul>
                <hr />
            </div>
        )
    });

    return (
        <div className="question--main">
            {questions}
            <button 
                className="check-ans--btn" 
                onClick={props.checkAnswer}
            >
                Check Answer
            </button>
        </div>
    )
}