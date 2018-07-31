import React, { Component } from 'react';
import './Item.css';
// import Portal from './Portal';
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
    this.getPoints(this.props.title, this.props.id)
  }

  getPoints(title, id) {
    fetch(process.env.REACT_APP_API_URL + '/item/points/' + id)
      .then(res => res.json())
      .then(resJson => this.setState({points: resJson.res}))
      .catch(e => {console.log('getPoints error: ', e)})
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
          id={this.props.id}
          url={this.props.url}
          askItem={!Boolean(this.props.url)}
        />
      )
    } 

    return (
      <div>
        <a 
          onClick = {this.toggleModal}
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
