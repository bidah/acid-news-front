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

  storyId = (items) => {

    if(items.story_id != null)
      return items.story_id

    //some objs don't include story_id prop, so we are grabbing it from the tags array.
    let reducer = (acc, curr) => {
      return curr.includes('story') ? acc.concat(curr.replace('story_', '')) : ''
    }

    return items._tags.reduce(reducer, '')
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
                    key={index}
                    id={this.storyId(item)}
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
