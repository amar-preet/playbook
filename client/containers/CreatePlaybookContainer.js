import React from 'react'
import CreatePlaybook from '../components/createplaybook/CreatePlaybook'

export default class CreatePlaybookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createPlaybook = this.createPlaybook.bind(this);
  }

  createPlaybook(data) {
    axios.post('http://localhost:3200/playbooks', {
      title: data.title.trim(),
      favorite: data.favorite,
      required: data.required,
      priority: data.priority,
      status: data.status

    })
      .then(function (response) {
        window.location.href = 'http://localhost:8080/dashboard';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="wrapper createPlaybook">
        <CreatePlaybook createPlaybook={ this.createPlaybook }/>
      </div>
    )
  }
}
