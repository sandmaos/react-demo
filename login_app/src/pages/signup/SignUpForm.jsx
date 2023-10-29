import React, { useState,useEffect } from 'react';
//npm install --save axios
import api from "../../api";
// import { useNavigate } from 'react-router-dom';


const SignUpForm=(props)=> {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({});
  // const navigate = useNavigate();

  useEffect(() => {
    console.log(2022, errors);
  }, [errors]);

  const onSubmit = (e) => {
    e.preventDefault();
    api.register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      passwordConfirmation: formData.passwordConfirmation
    }).then(res => {
      console.log(3033, res.data);
      setErrors({});
      // props.flashActions.flashActions.addFlashMessage({
      //   id:Math.random().toString().slice(2),
      //   msg:'register suc  cess',
      //   type:'success'
      // })
      // props.flashActions.flashActions.addFlashMessage("as")
      
      // navigate('/');
    }).catch(err => {
      setErrors((err.response && err.response.data) || {});    })
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const checkRepeatUsername=(e)=>{
    e.preventDefault();
    api.findUser({
      username:formData.username
    }).then(res =>{
      if(!res.data.flag){
        setErrors({username:res.data.msg})
      }
      else{
        setErrors({});
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div >
      <form onSubmit={onSubmit}>
        <h1>Join Us!</h1>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            className="form-control "
            name="username"
            value={formData.username}
            onChange={onChange}
            type="text" 
            onBlur={checkRepeatUsername}/>
          {errors.username ? <span style={{ color: 'red' }}> {errors.username}</span> : ''}
        </div>

        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            className="form-control "
            name="email"
            value={formData.email}
            onChange={onChange}
            type="text" />
          {errors.email ? <span style={{ color: 'red' }}> {errors.email}</span> : ''}
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            className="form-control "
            name="password"
            value={formData.password}
            onChange={onChange}
            type="password" />
        </div>

        <div className="form-group">
          <label className="control-label">Password Confirm</label>
          <input
            className="form-control "
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={onChange}
            type="password" />
        </div>
        <div className='form-group'>
          <button className='btn btn-primary btm-lg'>Submit</button>
        </div>
      </form>
    </div>

  );
}


export default SignUpForm;
