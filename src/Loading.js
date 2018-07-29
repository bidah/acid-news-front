import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <p className="loading">loading...</p>

    )
  }
}
