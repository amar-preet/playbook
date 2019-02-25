import React from 'react'
import TitleFavoriteBlock from '../editplaybook/TitleFavoriteBlock'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <TitleFavoriteBlock createFlag={ true } submitAction={ this.props.createPlaybook }/>
        </div>
      </div>
    )
  }
}