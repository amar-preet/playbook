import React from 'react';
import Favorites from '../components/main/Favorites';
import Playbooks from '../components/main/Playbooks';
import InitialReview from '../components/main/InitialReview';
import PendingApproval from '../components/main/PendingApproval';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playbooks: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3200/playbooks')

      .then(res => {

        if (res.data.message.length > 0) {

          res.data.message.sort(function (a, b) {
            return a.priority - b.priority;
          });

          this.setState({
            playbooks: res.data.message
          });
        }
      });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <Favorites data={this.state.playbooks} />
          <Playbooks data={this.state.playbooks} />
          <InitialReview data={this.state.playbooks} />
          <PendingApproval data={this.state.playbooks} />
        </div>
      </div>
    )
  }
}
