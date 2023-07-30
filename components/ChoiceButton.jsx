import React from "react";

function ChoiceButton(props) {
    
    let  buttonStyle = {};
    if (props.selected) {
        buttonStyle = {
            backgroundColor: "#D6DBF5",
            border: "none"
        }
    }

    return (
        <button className="choice--btn"
            onClick={props.handleClick}
            style={buttonStyle}
        >
            {props.choice}
            
        </button>
    )
}

export default ChoiceButton;
