import React from 'react'
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

export default class TitleFavoriteBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      isRequired: false,
      workingTitle: '',
      showModal: false
    };

    this.didSwitchParentObject = true; // used for initial, post ajax loading of form values
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onRequired = this.onRequired.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  componentDidUpdate() {
    // need to make sure not to handle setting the state from props if creating
    if (this.didSwitchParentObject && !this.props.createFlag) {
      this.didSwitchParentObject = false;
      this.setState({
        isChecked: this.props.favorite,
        isRequired: this.props.required,
        workingTitle: this.props.title
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var title = this.refs.title.value;
    if (!title || title.length <= 0) {
      alert('TITLE CANNOT BE EMPTY');
      return;
    }
    var data = {
      title: title,
      favorite: document.getElementById('cbox1').checked,
      required: document.getElementById('reqCbox').checked,
      priority: 0,
      status: 'Initial Review'
    }
    this.props.submitAction(data);
  }

  handleDelete(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this playbook: ' + this.props.title)) {
      this.props.deleteAction();
    }
  }

  onCheck() {
    this.setState({
      isChecked: !this.state.isChecked
    });
  }

  onRequired() {
    this.setState({
      isRequired: !this.state.isRequired
    });
  }

  onTitleChange() {
    this.setState({
      workingTitle: this.refs.title.value
    });
  }

  handleEmail() {

    axios.get('http://localhost:3200/send', {
      params: {
        to: document.getElementById('emailTo').value,
        from: '', //need to get it from user logged in or hard code it for prototype
        subject: document.getElementById('emailSubject').value,
        text: document.getElementById('emailBody').value
      }
    })
      .then(res => {

        var data = {
          title: document.getElementById('titleInput').value,
          favorite: document.getElementById('cbox1').checked,
          priority: 0,
          status: 'Out for Review'
        }
        this.props.submitAction(data);
        this.setState({ showModal: false });

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  open() {
    this.setState({ showModal: true });
  }
  close() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card-box">
            <h4 className="m-t-0 header-title"><b><span style={{ display: this.props.favorite ? 'inline' : 'none' }}></span>{this.props.title}</b></h4>
            <p className="text-muted m-b-30 font-13">
              Playbook Details
                  </p>
            <form name="playbookForm" className="form-horizontal" role="form">
              <div className="form-group">
                <label className="col-md-1 control-label">Title</label>
                <div className="col-md-11">
                  <input ref="title" id="titleInput" type="text" className="form-control" value={this.state.workingTitle} onChange={this.onTitleChange} />
                </div>
              </div>
              <div className="form-group" style={{ display: 'none' }}>
                <label className="col-md-1 control-label"></label>
                <div className="col-md-11">
                  <input ref="required" type="checkbox" id="reqCbox" value="required_checkbox" checked={this.state.isRequired} onChange={this.onRequired} /> Required?
                          </div>
              </div>
              <div className="form-group" >
                <label className="col-md-1 control-label"></label>
                <div className="col-md-11">
                  <input ref="favorite" type="checkbox" id="cbox1" value="first_checkbox" checked={this.state.isChecked} onChange={this.onCheck} /> Mark as a favorite
                          </div>
              </div>
              <div className="form-group row">
                <label className="col-md-1 control-label"></label>
                <div className="control-button">
                  <label className="col-md-1 control-label"></label>
                  <div className="col-md-11">
                    <button className="btn btn-secondary" type="submit" onClick={this.handleSubmit}>Save</button>
                  </div>
                </div>
                <div className="control-button" style={{ display: this.props.deleteAction ? 'block' : 'none' }}>
                  <label className="col-md-1 control-label"></label>
                  <div className="col-md-11">
                    <button className="btn btn-secondary" type="submit" onClick={this.handleDelete}>Delete</button>
                  </div>
                </div>
                <div style={{ float: 'right' }} className="control-button">
                  <label className="col-md-1 control-label"></label>
                  <div className="col-md-11">
                    <button className="btn btn-secondary" style={{ display: this.props.deleteAction ? 'block' : 'none' }} type="button" onClick={this.open}><p className="fa fa-envelope-o"></p> Send for Approval</button>
                    {this.state.showModal ? <Modal handleHideModal={this.handleHideModal} /> : null}
                    <div>
                      <Modal show={this.state.showModal} onHide={this.close} aria-labelledby="ModalHeader">
                        <Modal.Header closeButton>
                          <Modal.Title>Send for Approval</Modal.Title>
                        </Modal.Header>

                        <Modal.Body >
                          To  <input ref="title" id="emailTo" type="text" className="form-control" /><br/>
                          Subject <input ref="subject" id="emailSubject" type="text" className="form-control" /><br/>
                          Email Body <textarea name="body"  id="emailBody" cols="40" rows="5" className="form-control" ></textarea>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button onClick={this.close}>Close</Button>
                          <Button type="submit" onClick={this.handleEmail} bsStyle="primary">Send Email</Button>
                          
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
