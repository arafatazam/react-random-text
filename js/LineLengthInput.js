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
            var updatedValue = this.refs.input.value;
            if(updatedValue<this.props.min){
                this.setState({error: " Please give a value equal to or grater than: " + this.props.min});
                updatedValue=null;
            }else{
                this.setState({error: null});
            }
            this.props.updateFunction(updatedValue);
        },900);
    }

    render(){
        return (
            <div className="line-length-input">
                <label>{this.props.label}</label>
                <p><input ref="input" onKeyDown={this.inputDone} type="number" min={this.props.min}/><span className="error">{this.state.error}</span></p>

            </div>
        );
    }

}

export default LineLengthInput;