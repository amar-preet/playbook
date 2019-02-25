import React from 'react'

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      taskName: {}
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.showItem = this.showItem.bind(this);
    
  }

  handleDelete(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this item: ' + this.props.itemname)) {
      this.props.deleteAction(this.props.id);
    }
  }
  showItem(event) {     
    var task = this.props.taskObject
      this.setState({
        taskName: this.props.taskObject
      })
    //ideally should be passed from parent
    document.getElementById('elementID').value = task._id
    document.getElementById('workingItemName').value = task.name
    document.getElementById('workingDescriptionName').value = task.description
    document.getElementById('workingFullDescriptionName').value = task.fullDescription
    document.getElementById('workingCreatedBy').value = task.createdBy
    document.getElementById('whoownsName').value = task.whoOwns
    event.preventDefault();
  }

  render() {
    return (
      <ol className="dd-list">
          <li className="dd-item dd3-item" data-id="23">
              <div className="dd-handle dd3-handle" title="Delete this Playbook Item" onClick={ this.handleDelete }></div>
              <div className="dd3-content" onClick={this.showItem}>
                { this.props.itemname } 
                {/*<div style={{float:'right', paddingTop: '11px'}}>                    
                     <p className="text-muted text-nowrap" style={{fontFamily:"Calibiri", fontStyle:'italic', fontSize: 11}}>
                          {this.props.taskObject.description}                        
                       </p>                      
                 </div>*/}
              </div>             
          </li>
      </ol>
    )
  }
}
