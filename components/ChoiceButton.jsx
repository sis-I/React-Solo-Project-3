import React from "react";

function ChoiceButton(props) {
    
    let  buttonStyle = {};
    if (props.selected && !props.showAnswer) {
        buttonStyle = {
            backgroundColor: "#D6DBF5",
            border: "none"
        }
    } else if (props.selected && props.showAnswer && !props.correct_answer) {
        buttonStyle = {
            backgroundColor: '#F8BCBC',
            border: "none",
        }
    } else if (props.showAnswer && props.correct_answer) {
        buttonStyle = {
            backgroundColor: "#94D7A2",
            border: "none",
            fontWeight: "bold"
        }
    }

    const choiceMarkup = {__html: props.choice}
    return (
        <button className="choice--btn"
            onClick={props.handleClick}
            style={buttonStyle}
            dangerouslySetInnerHTML={choiceMarkup}
        >           
        </button>
    )
}

export default ChoiceButton;
