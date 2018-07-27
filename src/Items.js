import React, { Component } from 'react';

export default class Items extends Component {

  constructor(props){

    super(props)

    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    this.getNews()
  }

  getNews() {
    fetch('http://localhost:3001/getData')
      .then(res => res.json())
      .then(resJson => this.setState({items: resJson.res}))
  }

  render() {
    return (
      <ul>
        { this.state.items.map((item, index) => <li key={index}>{item.title}</li>) }
      </ul>
    )
  }
}
