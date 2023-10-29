import React, { useState } from "react";
import api from "../../api"
import { connect } from "react-redux";
import * as authActions from "../../actions/auth";
import { bindActionCreators } from 'redux';

function LogInForm(props) {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { username, password } = formData;
        props.authActions.asyncSetUserObj({
            username: username,
            password: password
        }).then((res) => {
            console.log(res);
        }).catch(err => {
            console.log(4020, err);
        })


        // api.login({
        //     username,
        //     password
        // }).then(res=>{
        //     if(res.data.valid){
        //         console.log("yes");
        //     }
        //     else{
        //         console.log("no");
        //     }    
        // }).catch(err=>{
        //     console.log(4020,err);
        // })

    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1> Login </h1>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        className="form-control "
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        type="text"
                    />

                    <label className="control-label">Pasword</label>
                    <input
                        className="form-control "
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        type="password"
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-primary btm-lg'>Submit</button>
                </div>

            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LogInForm);
