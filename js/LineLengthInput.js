import React from 'react';

class LineLengthInput extends React.Component{

    constructor(){
        super();
        this.state = {error: null};
        this.inputDone = this.inputDone.bind(this);
    }

    inputDone(){
        if(this.timer){
            clearInterval(this.timer);
        }
        this.timer = setInterval(()=>{
            clearInterval(this.timer);
            this.props.updateFunction(this.refs.input.value);
        },900);
    }

    render(){
        return (
            <div className="line-length-input">
                <label>{this.props.label}</label>
                <p><input ref="input" onKeyDown={this.inputDone} type="number" min={this.props.min}/></p>
            </div>
        );
    }

}

export default LineLengthInput;