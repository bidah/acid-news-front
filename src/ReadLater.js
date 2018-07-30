
import React, { Component } from 'react';
import './ReadLater.css';
import Loading from './Loading';
import { Link } from 'react-router-dom'
import burgerIcon from './images/bar-menu.svg';

export default class ReadLater extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading: true,
      readList: [] 
    }
  }

  async componentDidMount(){

    var items = [];
    let readList = localStorage.getItem(
      window.navigator.userAgent.split(' ').join('')
    )

    JSON.parse(readList).forEach((item) => {
      items.push(
        fetch('http://hn.algolia.com/api/v1/items/' + item).then(res => res.json())
      )
    })

    await Promise.all(items)
      .then(readList => this.setState({readList}))
      .finally(() => this.setState({loading: false}))
  }

  render() {
    return (
      <div className="read-later">
        <header className="App-header">
          <h1 className="App-title">Read Later List</h1>
          <Link to="/menu">
            <img src={burgerIcon} alt="menu"/>
          </Link>
        </header>
        {
          this.state.loading 
          ? <Loading/>
          : (
              <ul>
                {
                  this.state.readList.map((item, index) => {
                    return (
                      <li key={index}>{item.title}</li>
                    )
                  })
                }
              </ul>
          )
        }
      </div>
    )
  }
}
