import React, { Component } from 'react';
import './Item.css';

export default class Item extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <a 
        href = {this.props.url} 
        target = "blanc"
        key = {this.props.index}
      >
        <li>{this.props.title}</li>
      </a>
    )
  }

}
