import React from 'react';
import { Link } from 'react-router';

export default class PlaybookBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this task: ' + this.props.itemname)) {
      this.props.deleteAction(this.props.id);
    }
  }

  render() {
    var url = "/playbook/" + this.props.data._id;
    var status = this.props.data.status;
    var colorClass = 'text-muted text-nowrap';
    if (this.props.data.status === 'Initial Review' ) {
       colorClass = 'label label-purple'
    }
    else{
      colorClass = 'label label-pink'
    }
    
    return (     
    
        <div className="col-md-4" >
          <div className="card-box" >
            <h4 className="{{p.titlecolor}}"><Link params={this.props.data._id} to={url}>{this.props.data.title}</Link></h4>
            <div >
              <p className="text-muted text-nowrap">{this.props.data.items.length} Tasks</p>
              <p style={{float:'right', color:'lightblue'}} className = {colorClass}>{this.props.data.status}</p>
            </div>  
          </div>
        </div> 
    )
  }
}
