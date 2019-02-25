import React from 'react'
import TitleFavoriteBlock from './TitleFavoriteBlock'
import ListOfItems from './ListOfItems'
import AddItem from './AddItem'

export default class EditPlaybook extends React.Component {
   constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <TitleFavoriteBlock title={this.props.title} submitAction={this.props.updatePlaybook} favorite={this.props.favorite} required={this.props.required} 
              deleteAction={this.props.deletePlaybook} 
              />
              <div className="row">
                <ListOfItems items={this.props.items} deleteAction={this.props.deleteItem} playbookKey={this.props.playbookKey} 
                            />
                <AddItem title={this.props.title} submitAction={this.props.addItem} taskItem = {this.props.taskItem}
                          />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
