
import React, { Component } from 'react';
import './ReadLater.css';
import Loading from './Loading';
import { Link } from 'react-router-dom'
import burgerIcon from './images/bar-menu.svg';
import deleteBtn from './images/delete-item.svg';
import LinkNavigator from './LinkNavigator';

export default class ReadLater extends Component {
  constructor(props){
    super(props)

    this.state = {
      loading: true,
      readList: [],
      modal: false,
      id: null,
      url: null
    }
  }

  deleteItem = (event, id) => {
    
    var event = event;
    //remove element immediatily while doing async
    event.target.parentElement.classList.add('hide')

    let readList = JSON.parse(this.readList).filter(i => i != id)

    window.localStorage.setItem(
      window.navigator.userAgent.split(' ').join(''),
      JSON.stringify(readList)
    )

    this.getList();
    console.log('deleteItem --> deleted');
  }

  async componentDidMount(){
    this.getList();
  }

  getList = async () => {

    var items = [];
    this.readList = localStorage.getItem(
      window.navigator.userAgent.split(' ').join('')
    )

    JSON.parse(this.readList).forEach((item) => {
      items.push(
        fetch(process.env.REACT_APP_ALGOLIA_API_URL + item)
          .then(res => res.json())
          .catch(e => {
            if(e.message == 'Failed to fetch')
              return fetch(process.env.REACT_APP_ALGOLIA_API_URL + item)
                .then(res => res.json())
          })
      )
    })

    return await Promise.all(items)
      .then(readList => this.setState({readList}))
      .then(() => this.setState({loading: false}))
  }

  toggleModal = async (item) => {

    await this.setState({id: item.id, url: item.url})
    this.setState({modal: !this.state.modal})
  }

  render() {

    let modal;
    if(this.state.modal) {
      modal = (
        <LinkNavigator
          toggleModal={this.toggleModal}
          id={this.state.id}
          url={this.state.url}
          askItem={!Boolean(this.state.url)}
        />
      )
    } 

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
                  (
                    Boolean(this.state.readList.length)
                    ? ''
                    : <span className="empty-reading-list">Empty reading list</span>
                  )
                }
                {
                  this.state.readList.map((item, index) => {
                    return (
                      <li 
                        onClick = {() => this.toggleModal(item) }
                        key={index}>
                        {item.title}
                        <img 
                          onClick={(e) => this.deleteItem(e, item.id)}
                          src={deleteBtn} alt="delete item"/>
                      </li>
                    )
                  })
                }
              </ul>
          )
        }
        { modal }
      </div>
    )
  }
}
