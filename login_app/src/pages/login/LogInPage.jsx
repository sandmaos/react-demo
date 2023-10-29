import React, { Component } from 'react';
import LogInForm from './LogInForm';
import { connect } from "react-redux";
import * as authActions from "../../actions/auth";
import { bindActionCreators } from 'redux';

class LogInPage extends Component {
  render() {
    return (
      <div className='row'>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <LogInForm />
          {/* <LogInForm authActions={ this.props.authActions} /> */}
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LogInPage);
