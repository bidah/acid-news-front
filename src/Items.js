import React, { Component } from 'react';
import './Items.css';

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
      ? <p className="loading">loading...</p>
      : (<ul className="items-wrapper">
          { 
            this.state.items
              .map((item, index) => {
                return (
                  <a href={item.story_url} target="blanc">
                    <li key={index}>{item.title}</li>
                  </a>
                );
              }) 
          }
        </ul>)
    )
  }
}
