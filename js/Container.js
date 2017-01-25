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

    getTextObj(rawText, loadingTime){
        var t0 = window.performance.now();
        var text = rawText.trim();
        var textObj = {loadingTime: loadingTime};
        textObj.wordcount = text.match(/(\s|$|^)\w/g).length;
        textObj.maxWordLength = text.split(' ')
                                    .reduce((max, word)=>{
                                        return Math.max(max,word.length);
                                    },0);
        textObj.paragraphs = text.split('\n\n')
                                .map((para)=>{
                                    var paraObj = {text:para};
                                    paraObj.sentences = para.match(/\w[.?!](\s|$)/g).length;
                                    return paraObj;
                                });
        var t1 = window.performance.now();
        textObj.processingTime = t1-t0;
        return textObj;
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
                var textObj = this.getTextObj(text, loadingTime);
                console.log(textObj);
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
            var paragraphElements = textObj.paragraphs.map((paraObj, index)=>{return (<Paragraph key={index} lineLength={textObj.lineLength}>{paraObj.text}</Paragraph>);});
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