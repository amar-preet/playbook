import React, { Component } from "react";
import Header from './Header';
import Footer from './Footer';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }
  updateUser(name) {
     localStorage.removeItem('user')
    this.setState({ username: name });
  }

  render() {
    var childrenWithProps = React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        props: this.props,
        username: this.state.username, 
        updateUser: this.updateUser
      }));
      
    return (
      <div>
        <Header name={this.props.username}/>
        {childrenWithProps}
        <Footer />
      </div>
    );
  }
}
