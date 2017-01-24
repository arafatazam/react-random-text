import React from 'react';
import Spinner from './Spinner';
import Paragraph from './Paragraph';

class Container extends React.Component{

    constructor(){
        super();
        this.state = {
            text: null,
            loading: false
        };
        this.loadText = this.loadText.bind(this);
    }

    loadText(){
        this.setState({loading: true, text:null});
        var rand = Math.floor(Math.random()*10+1);
        var url = "http://localhost:8081/proxy/api/"+rand+"/plaintext/long";
        console.log(url);
        fetch(url, {"mode" : 'no-cors'})
            .then((response)=>{
                return response.text();
            }).then((text)=>{
                this.setState({loading: false, text:text.trim()});
            });
    }

    render(){
        if(this.state.loading){
            return (
                <Spinner></Spinner>
            );
        }
        return (
            <div>
                <div>{this.state.text&&this.state.text.split('\n\n').map((line)=>{return (<Paragraph>{line}</Paragraph>);})}</div>
                <button onClick={this.loadText}>Analyze Output</button>
            </div>
        );
    }

}

export default Container;