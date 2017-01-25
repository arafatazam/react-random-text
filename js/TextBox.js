import React from 'react';
import Paragraph from './Paragraph';

class TextBox extends React.Component{

    render(){

        var paragraphs = this.props.children.trim().split('\n\n');

        if(!this.props.fullText){
            if(paragraphs.length>3){
                paragraphs = paragraphs.slice(-1);
            }else{
                return (
                    <div className="panel panel-info text-box">
                        <div className="panel-heading">
                            Text Window
                        </div>
                        <div className="panel-body">
                            <p className="text-info">Less than 3 Paragraphs loaded</p>
                        </div>
                    </div>
                );
            }
        }

        return (
                <div className="panel panel-info text-box">
                    <div className="panel-heading">
                        Text Window
                    </div>
                    <div className="panel-body">
                        {paragraphs.map(
                            (paragraph, index)=>{
                                return (<Paragraph key={index} lineLength={this.props.lineLength}>{paragraph}</Paragraph>);
                            }
                        )}
                    </div>
                </div>
        );
    }

}

export default TextBox;