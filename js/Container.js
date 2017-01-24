import React from 'react';
import Spinner from './Spinner';
import Paragraph from './Paragraph';
import LineLengthInput from  './LineLengthInput';

class Container extends React.Component{

    constructor(){
        super();
        this.state = {
            textObj: null,
            loading: false
        };
        this.loadText = this.loadText.bind(this);
        this.updateLineLength = this.updateLineLength.bind(this);
    }

    analyzedText(text){
        text = text.trim();
        var textObj = {};
        textObj.paragraphs = text.split('\n\n');
        textObj.maxWordLength = text.split(' ').reduce((max, word)=>{return Math.max(max,word.length);},0);
        return textObj;
    }


    loadText(){
        this.setState({loading: true, text:null});
        var rand = Math.floor(Math.random()*10+1);
        var url = "http://localhost:8081/proxy/api/"+rand+"/plaintext/long";
        fetch(url, {"mode" : 'no-cors'})
            .then((response)=>{
                return response.text();
            }).then((text)=>{
                var textObj = this.analyzedText(text);
                this.setState({loading: false, textObj:textObj});
            });
    }


    updateLineLength(length){
        var textObj = this.state.textObj;
        textObj.lineLength = length;
        this.setState({textObj: textObj});
    }

    render(){
        if(this.state.loading){
            return (
                <Spinner></Spinner>
            );
        }
        var textObj = this.state.textObj;
        if(textObj){
            var paragraphElements = textObj.paragraphs.map((para, index)=>{return (<Paragraph lineLength={textObj.lineLength} key={index}>{para}</Paragraph>);});
            var lineLengthInput = (<LineLengthInput updateFunction={this.updateLineLength} label="Line Length:" min={textObj.maxWordLength} />);
        }
        return (
            <div>
                <div>{paragraphElements}</div>
                <button onClick={this.loadText}>Analyze Output</button>
                {lineLengthInput}
            </div>
        );
    }

}

export default Container;