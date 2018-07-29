import React, { Component } from 'react';
import './Item.css';
import Portal from './Portal';
import LinkNavigator from './LinkNavigator';

export default class Item extends Component {
  constructor(props){
    super(props)

    this.state = {
      points: null,
      modal: false,
    }
  }

  componentDidMount(){
    this.getPoints(this.props.id)
  }

  getPoints(id) {
    fetch('http://localhost:3001/item/points/' + id)
      .then(res => res.json())
      .then(resJson => this.setState({points: resJson.res}))
  }

  toggleModal = (e) => {
    this.setState({modal: !this.state.modal})
  }

  render(){

    let modal;
    if(this.state.modal) {
      modal = (
        <LinkNavigator
          toggleModal={this.toggleModal}
          url={this.props.url}/>
      )
    } 

    return (
      <div>
        <a 
          onClick = {this.toggleModal}
          target = "blanc"
          key = {this.props.index}
        >
          <li>
            <p>{this.state.points}</p>
            <p>
              {this.props.title}
            </p>
          </li>
        </a>
        { modal }
      </div>
    )
  }

}
