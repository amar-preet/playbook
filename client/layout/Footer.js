import React, { Component } from "react";
import { Link } from 'react-router';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <footer className="footer text-right">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        2016 © Slalom
                    </div>
                </div>
            </div>
        </footer>
      </div>
    );
  }
}