import React from 'react';
import Paragraph from './Paragraph';

class TextBox extends React.Component{

    render(){

        var paragraphs = this.props.children.trim().split('\n\n');

        if(!this.props.fullText){
            if(paragraphs.length>3){
                paragraphs = paragraphs.slice(-1);
            }else{
                return <div className="text-box"><p className="message">Less than 3 Paragraphs loaded</p></div>
            }
        }

        return (<div className="text-box">
            {paragraphs.map(
                (paragraph, index)=>{
                    return (<Paragraph key={index} lineLength={this.props.lineLength}>{paragraph}</Paragraph>);
                }
            )}
        </div>)
    }

}

export default TextBox;