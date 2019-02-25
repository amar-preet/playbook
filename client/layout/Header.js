import React from "react";
import { Link } from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var currentPath = window.location.pathname
    return (
      <div>
        <header id="topnav">
          <div className="topbar-main">
            <div className="container">
              <div className="logo">
                <Link to="/dashboard" ><span className='fontStyle'>Slalom Playbook</span></Link>
              </div>
            </div>
          </div>
          <div className="navbar-custom">
            <div className="container">
              <div id="navigation">
                <ul className="navigation-menu">
                  <li className="has-submenu active">
                    {
                      currentPath.includes('/dashboard') || currentPath.includes('/playbook') ?
                        <Link to="/playbook">Create New Playbook</Link>
                        :
                        null
                    }
                  </li>
                </ul>
              </div>
            </div>
            <div className="has-submenu active" style={{ float: 'right', width: '200px', marginTop: '-42px', marginRight: '400px' }} >
              <Link >Hi {localStorage.getItem('user')} </Link>
              <Link to="/">| Logout </Link>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
