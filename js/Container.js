import React from 'react';
import Spinner from './Spinner';
import TextBox from './TextBox';
import LineLengthInput from  './LineLengthInput';
import InfoBox from './InfoBox';
import TextObj from './TextObj';
import StorageObj from './StorageObj';


class Container extends React.Component{

    constructor(){
        super();
        this.storage = new StorageObj();

        this.state = {
            textObj: this.storage.get(),
            loading: false,
            fullText: false
        };

        this.loadText = this.loadText.bind(this);
        this.updateLineLength = this.updateLineLength.bind(this);
        this.showFullText = this.showFullText.bind(this);
        this.removeCurrent = this.removeCurrent.bind(this);
        this.historyNext = this.historyNext.bind(this);
        this.historyPrev = this.historyPrev.bind(this);
    }

    historyNext(){
        this.setState({textObj: this.storage.getNext()});
    }

    historyPrev(){
        this.setState({textObj: this.storage.getPrev()});
    }

    //Not in use
    deleteStorage(){
        this.storage.destroy();
        this.setState({textObj:null});
    }

    removeCurrent(){
        var active = this.storage.remove();
        this.setState({textObj:active});
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
                this.storage.put(textObj);
                this.setState({loading: false, textObj:textObj, fullText: false});
            });
    }

    showFullText(){
        this.setState({fullText: !this.state.fullText});
    }

    updateLineLength(length){
        var textObj = this.state.textObj;
        console.log(!length);
        if(!length){
            delete textObj.lineLength;
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
            var fullTextBtn = <button className="btn btn-primary" onClick={this.showFullText}>Full Text</button>;
            var historyNext = <button className="btn btn-default" onClick={this.historyNext}>Next</button>;
            var historyPrev = <button className="btn btn-default" onClick={this.historyPrev}>Prev</button>;
            var removeCurrentBtn = <button className="btn btn-danger" onClick={this.removeCurrent}>Remove</button>;
        }


        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                Controls
                            </div>
                            <div className="panel-body">
                                <button className="btn btn-success" onClick={this.loadText}>Analyze Output</button>
                                {fullTextBtn}
                                {removeCurrentBtn}
                                {historyPrev}
                                {historyNext}
                                {lineLengthInput}
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        {information}
                    </div>
                </div>
                {textWindow}
            </div>
        );
    }

}

export default Container;