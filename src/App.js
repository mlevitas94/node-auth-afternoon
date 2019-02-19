import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import Container from './Components/Container/Container'

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
    // this.updateUser.bind(this)
  }
  updateUser= (user)=> {
    // this should update the user property on state
    this.setState({
      user:user
    })
  }
  render() {
    return (
      <div className="App">
        <Header user={this.state.user} updateUser={this.updateUser}/>
        <Container user={this.state.user}/>
      </div>
    );
  }
}

export default App;
