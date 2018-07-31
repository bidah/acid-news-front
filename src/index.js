import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Menu from './Menu';
import ReadLater from './ReadLater';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class Layout extends Component {
  render(){
    return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path={"/"} component={App}/>
              <Route path={"/menu"} component={Menu}/>
              <Route path={"/read-later"} component={ReadLater}/>
              <Route component={App}/>
            </Switch>
          </div>
        </BrowserRouter>
    )
  }
}

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
