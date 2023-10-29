import React from 'react';
import SignUpForm from "./SignUpForm";
import { connect } from "react-redux";
import * as flashActions from "../../actions/flash"
import { bindActionCreators } from 'redux';

const SignUpPage=(props)=> {
  // console.log(props);
  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <SignUpForm flashActions={props}/>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    flashActions: bindActionCreators(flashActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SignUpPage);
