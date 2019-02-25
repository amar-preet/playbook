import React from 'react'
import PlaybookBlock from './PlaybookBlock'
import SortableComponenet from '../../../sort/SortableComponent';

export default class PendingApproval extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    var rowsArray = [];
    for (var i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].status === 'Out for Review') {
        var key = this.props.data[i]._id ;
        rowsArray.push(<PlaybookBlock key={key} data={this.props.data[i]} />);
      }
    }

    return (
       <div>
            <div className="row">
                <div className="col-sm-12">
                    <h1 className="panel-title"><span className="fa fa-exclamation-triangle" aria-hidden="true"> Pending Approval</span></h1>
                    <br/>
                </div>
            </div>
            <div>
                {rowsArray}
            </div>
        </div>
    )
  }
}
