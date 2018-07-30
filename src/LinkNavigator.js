import React, { Component } from 'react';
import './LinkNavigator.css';
import Loading from './Loading';

export default class Item extends Component {
  constructor(props){
    super(props)

    this.state = {
      article: '',
      loading: true,
      readLater: false,
    }

    this.bodyEl = document.querySelector('body');
  }

  componentWillMount = () => {
    this.isReadLater();
  }

  isReadLater = () => {

    let readList = localStorage.getItem(
      window.navigator.userAgent.split(' ').join('')
    )

    Boolean(JSON.parse(readList).includes(this.props.id))
    ? this.setState({readLater: true}) : ''
  }
  componentDidMount = () => {
    this.bodyEl.classList.add('overflow')
    this.getArticle(this.props.url)
  }

  componentWillUnmount = () => {
    this.bodyEl.classList.remove('overflow')
  }

  setReadLater = () => {

    let readList = window.navigator.userAgent.split(' ').join('')
    let arr = JSON.parse(
      window.localStorage.getItem(readList) 
    )

    if(!arr.includes(this.props.id))
      arr.push(this.props.id)
    
    window.localStorage.setItem(readList, JSON.stringify(arr)) 
    this.setState({readLater: true})
  }

  getArticle = (link) => {
    if(this.props.askItem)
      return this.setState({loading: false})

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
      .finally(() => this.setState({loading: false}))
  }

  layoutLink = () => {
    return (
      <section>
        <h1>{this.state.article.title}</h1>
        <p>{this.state.article.text}</p>
      </section>
    )
  }

  layoutAsk = () => {
    return (
      <section>
        <h1>{this.state.article.title}</h1>
      </section>
    )
  }

  render() {
    return (

        <div className="link-navigator">

          <header 
            onClick={this.props.toggleModal}>
            <p> X </p>
          </header>
          {
            this.state.loading 
            ? <Loading loadingArticleMessage/>
            : this.props.askItem ? this.layoutAsk() : this.layoutLink()
          }
          <footer
            onClick={this.setReadLater}>
            <p>{this.state.readLater ? 'Saved!' : 'Read Later'}</p>
          </footer>
        </div>
      )
  }
}
