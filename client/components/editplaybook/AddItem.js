import React from 'react'

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
   
        this.state = {
        workingItemName: '',
        workingDescriptionName: '',
        workingFullDescriptionName: '',
        workingCreatedBy: '',
        workingWhoOwns: '',
        taskObj:{}
      };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onItemNameChange = this.onItemNameChange.bind(this);
    this.onDescriptionNameChange = this.onDescriptionNameChange.bind(this);
    this.onFullDescriptionNameChange = this.onFullDescriptionNameChange.bind(this);
    this.onCreatedByChange = this.onCreatedByChange.bind(this);
    this.onWhoOwnsChange = this.onWhoOwnsChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var taskId = document.getElementById('elementID').value
    var itemname = this.refs.itemname.value;
    var description = this.refs.descriptionname.value;
    var fullDescription = this.refs.fulldescriptionname.value;
    var createdBy = this.refs.createdby.value;
    var whoOwns = this.refs.whoowns.value;

    if (!itemname || itemname.length <= 0) {
      alert('ITEM NAME CANNOT BE EMPTY');
      return;
    }

    var taskObject = {
      id: taskId,
      taskName: itemname,
      descriptionName: description,
      fullDescriptionName: fullDescription,
      createdbyName: createdBy,
      whoownsName: whoOwns
    }
    this.props.submitAction(taskObject);
    this.setState({
      workingItemName: '',
      workingDescriptionName: '',
      workingFullDescriptionName: '',
      workingCreatedBy: '',
      workingWhoOwns: ''

    });
    document.getElementById('elementID').value  = ''
  }
  
  onItemNameChange() {
    this.setState({      
      workingItemName: this.refs.itemname.value
    });
  }
  onDescriptionNameChange() {
    this.setState({
      workingDescriptionName: this.refs.descriptionname.value
    });
  }
  onFullDescriptionNameChange() {
    this.setState({
      workingFullDescriptionName: this.refs.fulldescriptionname.value
    });
  }
  onCreatedByChange() {
    this.setState({
      workingCreatedBy: this.refs.createdby.value
    });
  }
  onWhoOwnsChange() {
    this.setState({
      workingWhoOwns: this.refs.whoowns.value
    });
  }
   handleDelete(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this item: ' + this.props.itemname)) {
      this.props.deleteAction(this.props.id);
    }
  }
  render() {
    return (
     
      <div className="col-md-6">
        <div className="card-box">
          <h4 className="m-t-0 header-title"><b>Add Task</b></h4>
          <p className="text-muted m-b-30 font-13">
            Task Details
            </p>
           <input id="elementID" name="prodId" type="hidden" value=""/>
          <form className="form-horizontal" role="form" name="ItemForm">
            <div className="form-group">
              <label className="col-md-4 control-label">Task Name</label>
              <div className="col-md-8">
                <input ref="itemname" id="workingItemName" type="text" className="form-control" onChange={this.onItemNameChange}
                  value={this.state.workingItemName} /><br />

              </div>
              <label className="col-md-4 control-label">Description</label>
              <div className="col-md-8">
                <input ref="descriptionname" type="text" id="workingDescriptionName" className="form-control" onChange={this.onDescriptionNameChange}
                  value={this.state.workingDescriptionName} /><br />

              </div>
              <label className="col-md-4 control-label">Full Description</label>
              <div className="col-md-8">
                <input ref="fulldescriptionname" type="text" id="workingFullDescriptionName" className="form-control" onChange={this.onFullDescriptionNameChange}
                  value={this.state.workingFullDescriptionName} /><br />

              </div>
              <label className="col-md-4 control-label">Created By</label>
              <div className="col-md-8">
                <input ref="createdby" type="text" id="workingCreatedBy" className="form-control" onChange={this.onCreatedByChange}
                  value={this.state.workingCreatedBy} /><br />

              </div>
              <label className="col-md-4 control-label">Who Owns</label>
              <div className="col-sm-8">
                <input ref="whoowns" type="text" id="whoownsName" className="form-control" onChange={this.onWhoOwnsChange}
                  value={this.state.workingWhoOwns} /><br />
              </div>

              <div className="col-sm-8">
                <label className="col-md-4 control-label"></label>
                <div className="control-button">

                  <div className="col-md-4">
                    <button className="btn btn-secondary" type="submit" onClick={this.handleSubmit}>Add Task</button>
                  </div>
                </div>
                <div className="control-button" >
                  <label className="col-md-1 control-label"></label>
                  <div className="col-md-4">
                    <button className="btn btn-secondary" type="submit" onClick={this.props.deleteAction}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
