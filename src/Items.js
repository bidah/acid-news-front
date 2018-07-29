import React, { Component } from 'react';
import './Items.css';
import Item from './Item';

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
