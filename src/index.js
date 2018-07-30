import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'

class Layout extends Component {
  render(){
    return (
        <BrowserRouter>
          <Route path={"/"} component={App}/>
        </BrowserRouter>
    )
  }
}

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
