import React, { Component } from 'react';

export default class Items extends Component {

  constructor(props){

    super(props)

    this.state = {
      items: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.getNews()
  }

  getNews() {
    fetch('http://localhost:3001/getData')
      .then(res => res.json())
      .then(resJson => this.setState({items: resJson.res}))
      .finally(() => this.setState({loading: false}))
  }

  render() {
    return (
      this.state.loading 
      ? <p>loading</p>
      : (<ul>
          { 
            this.state.items
              .map((item, index) => <li key={index}>{item.title}</li>) 
          }
        </ul>)
    )
  }
}
