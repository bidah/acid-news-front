import React, { Component } from 'react';
import './Items.css';
import Item from './Item';
import Loading from './Loading';

export default class Items extends Component {

  constructor(props){

    super(props)

    this.state = {
      items: [],
      loading: true,
      article: '',
    }
  }

  componentDidMount() {
    this.getNews()

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

  getNews() {
    fetch('http://localhost:3001/getData')
      .then(res => res.json())
      .then(resJson => this.setState({items: resJson.res}))
      .finally(() => this.setState({loading: false}))
  }

  render() {
    return (
      this.state.loading 
      ? <Loading/>
      : (<ul className="items-wrapper">
          { 
            this.state.items
              .map((item, index) => {
                return (
                  <Item
                    id={item.story_id}
                    url={item.story_url} 
                    title={item.title} 
                    index={index}/>
                );
              }) 
          }
        </ul>)
    )
  }
}
