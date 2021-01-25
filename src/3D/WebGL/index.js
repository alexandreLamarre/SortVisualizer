import React from 'react';
import init from './Init';

export default class WebGL extends React.Component {

    componentDidMount(){


    }

    drawData(data, indices){
      init("webgl", data, indices);
    }

    render(){
        return <canvas id="webgl" width = {this.props.cWidth}
        height = {this.props.cHeight} style={{ border: '1px solid black'}}></canvas>
    }
}
