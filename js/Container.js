import React from 'react';
import Spinner from './Spinner';
import TextBox from './TextBox';
import LineLengthInput from  './LineLengthInput';
import InfoBox from './InfoBox';
import TextObj from './TextObj';

class Container extends React.Component{

    constructor(){
        super();
        this.state = {
            textObj: null,
            loading: false,
            fullText: false
        };
        this.loadText = this.loadText.bind(this);
        this.updateLineLength = this.updateLineLength.bind(this);
    }

    loadText(){
        this.setState({loading: true, text:null});
        var rand = Math.floor(Math.random()*10+1);
        var url = "http://localhost:8081/proxy/api/"+rand+"/plaintext/long";

        var t0 = window.performance.now();
        fetch(url, {"mode" : 'no-cors'})
            .then((response)=>{
                return response.text();
            }).then((text)=>{
                var t1 = window.performance.now();
                var loadingTime = t1-t0;
                var textObj = new TextObj(text, loadingTime);
                this.setState({loading: false, textObj:textObj});
            });
    }


    updateLineLength(length){
        var textObj = this.state.textObj;
        if(!length){
            textObj.lineLength = null;
        }else if(length>=textObj.maxWordLength){
            textObj.lineLength = length;
        }
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
            var textWindow = (<TextBox lineLength={textObj.lineLength} fullText={this.state.fullText}>{textObj.text}</TextBox>);
            var lineLengthInput = (<LineLengthInput updateFunction={this.updateLineLength} label="Line Length:" min={textObj.maxWordLength} />);
            var information = (<InfoBox
                                    paragraphs={textObj.paragraphs}
                                    sentencesInParagraphs={textObj.sentencesInParagraphs}
                                    wordCount={textObj.wordCount}
                                    loadingTime={textObj.loadingTime}
                                    processingTime = {textObj.processingTime}
                                    size = {textObj.size}
                                />);
        }


        return (
            <div>
                {textWindow}
                {information}
                <button onClick={this.loadText}>Analyze Output</button>
                {lineLengthInput}
            </div>
        );
    }

}

export default Container;