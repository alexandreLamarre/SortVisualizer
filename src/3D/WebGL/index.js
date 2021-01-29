import React from 'react';
import init from './Init';

export default class WebGL extends React.Component {

    componentDidMount(){


    }

    drawData(){
      init("mycanvas");
    }

    render(){
        return <canvas id="mycanvas" width = {this.props.cWidth}
        height = {this.props.cHeight} style={{ border: '1px solid white'}}></canvas>
    }
}
