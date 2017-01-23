import React from 'react';

class Paragraph extends React.Component{

    createMarkup(){
        return {
            __html: this.props.children
                .split(' ')
                .reduce((acc,current)=>{
                    if(!acc.length) {
                        acc.push(current);
                        return acc;
                    }
                    var line = acc[acc.length-1]+' '+current;
                    if(line.length > this.props.lineLength){
                        acc.push(current);
                    }else {
                        acc.pop();
                        acc.push(line);
                    }
                    return acc;
                },[])
                .join("<br />")
        };
    }

    render(){
        return (
            <p className="paragraph" dangerouslySetInnerHTML={this.createMarkup()}></p>
        );
    }

}

export default Paragraph;