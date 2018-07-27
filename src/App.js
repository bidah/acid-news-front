import React, { Component } from 'react';
import logo from './logo.svg';
import Item from './Item';
import './App.css';

class App extends Component {

  constructor(props){

    super(props)

    this.state = {
      newsFeed: [],
    }
  }

  componentDidMount() {
    this.getNews()
  }

  getNews() {
    fetch('http://localhost:3001/getData')
      .then(res => res.json())
      .then(resJson => this.setState({newsFeed: resJson.res}))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Item items={this.state.newsFeed}/>
      </div>
    );
  }
}

export default App;
