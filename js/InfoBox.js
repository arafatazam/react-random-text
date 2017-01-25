import React from 'react';

class InfoBox extends React.Component{

    render(){
        return (

                <div className="panel panel-success">
                    <div className="panel-heading">
                        Analysis
                    </div>
                    <div className="panel-body">
                        <dt>Number of Paragraphs:</dt><dd>{this.props.paragraphs}</dd>
                        <dt>Sentences in the paragraphs:</dt>
                        <dd>
                            {this.props.sentencesInParagraphs.reduce((str, number)=>{
                                if(str.length>0){
                                    str+=', ';
                                }
                                str+=number;
                                return str;
                            },'')}
                        </dd>
                        <dt>Word count:</dt><dd>{this.props.wordCount}</dd>
                        <dt>Size:</dt><dd>{this.props.size} Bytes</dd>
                        <dt>Loading time:</dt><dd>{this.props.loadingTime} milliseconds</dd>
                        <dt>Processing time:</dt><dd>{this.props.processingTime} milliseconds</dd>
                    </div>
                </div>
        );
    }

}

export default InfoBox;