import React from 'react'
import Main from '../client/containers/main';
import { browserHistory } from 'react-router';
import CreatePlaybookContainer from '../client/containers/CreatePlaybookContainer';
import { Redirect } from 'react-dom'


//need to pass user name and password
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ username: event.target.value });
    }

    /*This is just a prototype. Need to implement Authentication  */
    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('user', this.state.username)
        browserHistory.push({
            pathname: '/dashboard'
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="module login-module">
                    <div></div>
                    <div className="form">
                        <h2>Login to your Playbook</h2>
                        <form onSubmit={this.handleSubmit}>

                            <input type="text" placeholder="Username"
                                value={this.state.username} onChange={this.handleChange} />
                            <input type="password" placeholder="Password" />
                            <button>Login</button>
                        </form>
                        <div >
                            <a>Register</a>
                            <a> Forgot password?</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}