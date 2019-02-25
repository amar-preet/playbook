import React from 'react'
import PlaybookBlock from './PlaybookBlock'
import SortableComponenet from '../../../sort/SortableComponent';
import { Link } from 'react-router';

export default class Playbooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playbooks: [],
                    username: '' }
    };

    componentDidMount(){
        this.setState({
            username: localStorage.getItem('user')
        })  
    }

    render() {        
        var rowsArray = [];
        for (var i = 0; i < this.props.data.length; i++) {
            rowsArray.push(<PlaybookBlock key={this.props.data[i]._id} data={this.props.data[i]} index={i} />);
        }
        return (
            <div>
                <div className="row"  >
                    <div className="col-sm-12">
                        <h1 className="panel-title"><span className="fa fa-list" aria-hidden="true"> All Playbooks</span></h1>
                        <br/>
                    </div>
                </div>
                <div >                    
                    {rowsArray}
                </div>
            </div>
        )
    }
}
