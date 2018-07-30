import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Menu from './Menu';
import ReadLater from './ReadLater';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'

class Layout extends Component {
  render(){
    return (
        <BrowserRouter>
          <div>
            <Route exact path={"/"} component={App}/>
            <Route path={"/menu"} component={Menu}/>
            <Route path={"/read-later"} component={ReadLater}/>
          </div>
        </BrowserRouter>
    )
  }
}

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
