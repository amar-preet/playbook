import React from 'react'
import EditPlaybook from '../components/editplaybook/EditPlaybook'

export default class EditPlaybookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playbook: {},
      taskItem: {}
    };
    this.addItem = this.addItem.bind(this);
    this.updatePlaybook = this.updatePlaybook.bind(this);
    this.deletePlaybook = this.deletePlaybook.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  // function to add item to a playbook, gets passed down to additem component
  addItem(taskObject) {
    // hackish approach to use the outer scoped this within the axios callback

    var itemThis = this;
    axios.post('http://localhost:3200/playbookitems', {
      name: taskObject.taskName.trim(),
      pbid: this.props.params.playbookid,
      taskPriority: 0,
      description: taskObject.descriptionName,
      fullDescription: taskObject.fullDescriptionName,
      createdBy: taskObject.createdByName,
      whoOwns: taskObject.whoOwnsName
    })
      .then(function (response) {
        var items = response.data.message;
        if (items) {
          var updatedPlaybook = itemThis.state.playbook;
          updatedPlaybook.items = items;
          itemThis.setState({
            playbook: updatedPlaybook
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // function to update playbook, gets passed down to titlefavoriteblock component
  updatePlaybook(data) {
    var tmpThis = this;
    axios.put('http://localhost:3200/playbooks/' + this.props.params.playbookid, {
      title: data.title.trim(),
      favorite: data.favorite,
      priority: data.priority,
      status: data.status
    })
      .then(function (response) {
        if (response.data.success) {
          tmpThis.setState({
            playbook: response.data.message
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deletePlaybook(data) {
    axios.delete('http://localhost:3200/playbooks/' + this.props.params.playbookid)
      .then(function (response) {
        window.location.href = 'http://localhost:8080/dashboard';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteItem(playbookitemid) {
    var itemThis = this;
    axios.delete('http://localhost:3200/playbookitems/' + this.props.params.playbookid + '/' + playbookitemid)
      .then(function (response) {
        var items = response.data.message;
        if (items) {
          var updatedPlaybook = itemThis.state.playbook;
          updatedPlaybook.items = items;
          itemThis.setState({
            playbook: updatedPlaybook
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updatePlaybookItem(data) {
    axios.put('http://localhost:3200/playbookitems/' + data.playbookid + '/' + data._id, {
      taskPriority: i,
      name: data.name + '_updated name',
      description: data.description,
      fullDescription: data.fullDescription,
      createdBy: data.createdBy,
      whoOwns: data.whoOwns
    })
      .then(function (response) {
        var items = response.data.message;
        if (items) {

          this.setState({
            rows: response.data.taskPriority
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    axios.get('http://localhost:3200/playbooks/' + this.props.params.playbookid)
      .then(res => {
        this.setState({
          playbook: res.data.message
        });
      });
  }

  render() {
    return (
      <div>
        <EditPlaybook title={this.state.playbook.title} favorite={this.state.playbook.favorite} items={this.state.playbook.items}
          addItem={this.addItem} updatePlaybook={this.updatePlaybook} deletePlaybook={this.deletePlaybook} deleteItem={this.deleteItem}
          playbookKey={this.props.params.playbookid} priority={0} taskItem={this.state.taskItem} />
      </div>
    )
  }
}
