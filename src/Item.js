import React, { Component } from 'react';
import './Item.css';

export default class Item extends Component {
  constructor(props){
    super(props)

    this.state = {
      points: null,
    }
  }

  componentDidMount(){
    this.getPoints(this.props.id)
  }

  getPoints(id) {
    fetch('http://localhost:3001/item/points/' + id)
      .then(res => res.json())
      .then(resJson => this.setState({points: resJson.res}))
  }

  render(){
    return (
      <a 
        href = {this.props.url} 
        target = "blanc"
        key = {this.props.index}
      >
        <li>
          <p>{this.state.points}</p>
          <p>
            {this.props.title}
          </p>
        </li>
      </a>
    )
  }

}
