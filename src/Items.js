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

  componentDidMount = () => {
    this.getNews()
  }

  getNews = () => {
  console.log('env api var in getNews: ', process.env.REACT_APP_API_URL)
    debugger;
    fetch(process.env.REACT_APP_API_URL + '/getData')
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
                    url={item.url} 
                    title={item.title} 
                    index={index}/>
                );
              }) 
          }
        </ul>)
    )
  }
}
