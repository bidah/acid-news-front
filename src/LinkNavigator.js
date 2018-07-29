import React, { Component } from 'react';
import './LinkNavigator.css';

export default class Item extends Component {
  constructor(props){
    super(props)


    this.state = {
      article: ''
    }
    
  }

  componentDidMount() {
    var url = new URL('https://api.diffbot.com/v3/article')

    var params = {
      token: '03de456dbbf7ca6158fc550a73134783',
      url: 'https://medium.com/@readability/the-readability-bookmarking-service-will-shut-down-on-september-30-2016-1641cc18e02b'
    }

    url.search = new URLSearchParams(params)

fetch(url)
      .then(res => res.json())
      .then(resJson =>{
        this.setState({article: resJson.objects[0]})
      })
  }

  render() {
    return (
      <div className="link-navigator">
        <header>
          <p> X </p>
        </header>
        <section>
          <h1>{this.state.article.title}</h1>
          <p>{this.state.article.text}</p>
        </section>
      </div>
    )
  }
}
