import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  constructor(props){
    super(props)

    this.state = {
      message: 'Loading...'
    }
  }

  componentDidMount(){

    setInterval(() => {
      Boolean(this.props.loadingArticleMessage)
      ? this.setState({message: 'Mejorando formato lectura...'})
      : '' 
    }, 2000)
  }

  render() {
    return (
      <p className="loading">{this.state.message}</p>

    )
  }
}
