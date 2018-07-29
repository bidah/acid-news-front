import React, { Component } from 'react';
import './LinkNavigator.css';

export default class Item extends Component {
  constructor(props){
    super(props)


    this.state = {
      article: ''
    }

    this.bodyEl = document.querySelector('body');
  }

  componentDidMount = () => {
    this.bodyEl.classList.add('overflow')
    this.getArticle(this.props.url)
  }

  componentWillUnmount = () => {
    this.bodyEl.classList.remove('overflow')
  }

  getArticle = (link) => {

    var url = new URL('https://api.diffbot.com/v3/article')

    var params = {
      token: '03de456dbbf7ca6158fc550a73134783',
      url: link
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
        <header onClick={this.props.toggleModal}>
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
