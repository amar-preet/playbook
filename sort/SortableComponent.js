import React, { Component } from 'react';
import { render } from 'react-dom';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value }) => <div>{value}</div>);

const SortableList = SortableContainer(({ items }) => {
  return (

    <div>
      {items.map((value, index) => (
        <SortableItem key={value.key} index={index} value={value} />
      ))}
    </div>
  );
});

export default class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
    this.onSortEnd = this.onSortEnd.bind(this);
  };

  onSortEnd({ oldIndex, newIndex }) {
    var rowsArray = this.props.items;

    Array.prototype.move = function (oldIndex, newIndex) {
      this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
    };
    rowsArray.move(oldIndex, newIndex)

    this.setState({
      rows: arrayMove(rowsArray, oldIndex, newIndex),
    });

    var currentPath = window.location.pathname;

    //update items position
    /*if (currentPath.includes('/dashboard')) {
      for (var i = 0; i < rowsArray.length; i++) {
        var element = rowsArray[i];
        axios.put('http://localhost:3200/playbooks/' + element.key, {
          priority: i,
          title: element.props.data.title.trim(),
          favorite: element.props.data.favorite
        })
          .then(function (response) {
            if (response.data.success) {
              console.log('SUCESS')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {*/

      for (var i = 0; i < rowsArray.length; i++) {
        var element = rowsArray[i];
        axios.put('http://localhost:3200/playbookitems/' + element.props.playbookKey + '/' + element.props.data._id, {
          taskPriority: i,
          name: element.props.data.name,
          description: element.props.data.description,
          fullDescription: element.props.data.fullDescription,
          createdBy: element.props.data.createdBy,
          whoOwns: element.props.data.whoOwns
        })
          .then(function (response) {
            var items = response.data.message;            
            if (items) {
              console.log(items)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      //}
    }

    
  };

  render() {
    /*
    By default, react-sortable-hoc is triggered immediately on mousedown. If you'd like to prevent this behaviour, there are a number of strategies readily available. 
    You can use the distance prop to set a minimum distance (in pixels) to be dragged before sorting is enabled. 
    https://github.com/clauderic/react-sortable-hoc
    */
    return <SortableList items={this.props.items} onSortEnd={this.onSortEnd} distance={5} />

  }
}