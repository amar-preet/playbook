import React from 'react'
import Item from './Item'
import SortableComponent from '../../../sort/SortableComponent';

export default class ListOfItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskItems : {}
    }
  }
  render() {
    var rows = [];
    if (this.props.items) {
      for (var i = 0; i < this.props.items.length; i++) {
       
        rows.push(<Item key={this.props.items[i]._id} id={this.props.items[i]._id} data={this.props.items[i]} 
                        itemname={this.props.items[i].name} taskObject = {this.props.items[i]} deleteAction={ this.props.deleteAction } index={i} 
                        playbookKey = {this.props.playbookKey} />);
      }
    }
    return (
      <div className="col-md-6">
        <div className="card-box">
          <h4 className="m-t-0 header-title"><b>Tasks</b></h4>
          <p className="text-muted m-b-30 font-13">
            Playbook Tasks
			      </p>
          <div className="custom-dd-empty dd" id="nestable_list_3">
            <SortableComponent items={rows} >{{ rows }} </SortableComponent>
          </div>
        </div>
      </div>
    )
  }
}
