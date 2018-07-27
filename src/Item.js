import React, { Component } from 'react';

export default class Item extends Component {

  render() {
    return (
      <ul>
        { this.props.items.map((item, index) => <li key={index}>{item.title}</li>) }
      </ul>
    )
  }
}
