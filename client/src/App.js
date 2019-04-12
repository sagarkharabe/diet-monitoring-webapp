import React, { Component } from 'react';
import AppNavbar from "./components/AppNavbar"
import AppFooter from "./components/AppFooter"
import Login from "./users/Login"
import Common from "./common"
import Register from "./users/Register"
import { BrowserRouter as Router , Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <AppNavbar />
        <div className = "container">
        <Route path="/" exact component={Common}/>
        
        <Route path="/login"  component={Login}/>
        <Route path="/register"  component={Register}/>
        </div>
        <AppFooter />
      </div>
      </Router>
    );
  }
}

export default App;
