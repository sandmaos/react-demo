import React, { useState } from 'react';
import validator from "validator";

const MyForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    preferredName: '',
    ssn: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = (type, value) => {
    switch (type) {
      case 'required':
        return !validator.isEmpty(value);;

      case 'noNumbers':
        return !/\d/.test(value);

      case 'validDate':
        const currentDate = new Date();
        const inputDate = new Date(value);
        return inputDate <= currentDate;

      case 'validPhone':
        return /^\d{10}$/.test(value);

      case 'validSSN':
        return /^\d{9}$/.test(value);

      case 'validEmail':
        return validator.isEmail(value);
        // return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      default:
        return true;
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Validation
    let isValid = true;

    if (name === 'firstName' || name === 'middleName' || name === 'lastName') {
      isValid = validateForm('noNumbers', value);
    }

    if (name === 'phone') {
      isValid = validateForm('validPhone', value);
    }

    if (name === 'email') {
      isValid = validateForm('validEmail', value);
    }

    if (name === 'dob') {
      isValid = validateForm('validDate', value);
    }

    if (name === 'ssn') {
      isValid = validateForm('validSSN', value);
    }

       setErrors({
      ...errors,
      [name]: isValid ? '' : `${name} is invalid`,
    });

  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: true,
    });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({
      ...errors,
      firstName: validateForm('required', formData.firstName) ? '' : 'Field is required',
      lastName: validateForm('required', formData.lastName) ? '' : 'Field is required',
      phone: validateForm('required', formData.phone) ? '' : 'Field is required',
      gender: validateForm('required', formData.gender) ? '' : 'Field is required',
      email: validateForm('required', formData.email) ? '' : 'Field is required',
      dob: validateForm('required', formData.dob) ? '' : 'Field is required',
      ssn: validateForm('required', formData.ssn) ? '' : 'Field is required',
    });

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        *First Name:
        <input type="text" name="firstName" value={formData.firstName} onBlur={handleBlur} onChange={handleChange} />
      </label>
      <span>{errors.firstName}</span>

      <label>
        Middle Name:
        <input type="text" name="middleName" value={formData.middleName} onBlur={handleBlur} onChange={handleChange} />
      </label>
      <span>{errors.middleName}</span>

      <label>
      *Last Name:
        <input type="text" name="lastName" value={formData.lastName} onBlur={handleBlur} onChange={handleChange} />
      </label>
      <span>{errors.lastName}</span>

      <label>
        PreferredName Name:
        <input type="text" name="preferredName" value={formData.preferredName} onChange={handleChange} />
      </label>
      <span>{errors.preferredName}</span>

      <label>
      *Phone:
        <input type="text" name="phone" value={formData.phone} onBlur={handleBlur} onChange={handleChange} />
      </label>
      <span>{errors.phone}</span>

      <label>
      *Email:
        <input type="text" name="email" value={formData.email} onBlur={handleBlur} onChange={handleChange} />
      </label>
      <span>{errors.email}</span>

      <label>
      *SSN:
        <input type="text" name="ssn" value={formData.ssn} onBlur={handleBlur} onChange={handleChange} />
      </label>
      <span>{errors.ssn}</span>

      <label>
      *Date of Birth:
        <input type="date" name="dob" value={formData.dob} onBlur={handleBlur} onChange={handleChange} />
      </label>
      <span>{errors.dob}</span>

      <label>
      *Gender:
        <select name='gender' value={formData.gender} onChange={handleChange}>
          <option value=""> Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <span>{errors.gender}</span>

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
