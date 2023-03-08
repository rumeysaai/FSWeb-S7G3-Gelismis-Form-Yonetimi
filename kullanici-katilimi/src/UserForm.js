import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import axios from 'axios';
import * as Yup from "yup";

const UserForm = () => {

  const[userForm, setUserForm] = useState({
    name:"",
    email:"",
    password:"",
    terms:false,
  });

  const [disabledButton, setDisabledButton] = useState(true);
  
  const [userFormErrors, setUserFormErrors] = useState({
    name:"",
    email:"",
    password:"",
    terms:false,
  })
  
  const formSchema = Yup.object().shape({
    name: Yup.string()
    .required("Name is required."),
    email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required."),
    password : Yup.string()
    .required("Password is required.").min(6, "Passwords must be at least 6 characters long."),
    terms: Yup.boolean().oneOf([true], "Please accept the terms of service"),
    
  })
  
  
  const changeHandler=(e)=> {
    const {name, value}= e.target;

    Yup.reach(formSchema, name)
    .validate(value)
    .then((valid)=>{
      setUserFormErrors({...userFormErrors, [name]: ""});
    })
    .catch((err)=>{
      setUserFormErrors({...userFormErrors, [name]: err.errors[0]})
    });

    setUserForm({...userForm, [name]:value});

  }

  const checkboxChangeHandler = (e) => {
    const {name, checked} = e.target;

    Yup.reach(formSchema, name)
    .validate(checked)
    .then ((valid)=>{
      setUserFormErrors({...userFormErrors, [name]: ""});
    })
    .catch((err)=>{
      setUserFormErrors({...userFormErrors, [name]:err.errors[0]})
    });

    setUserForm({...userForm, [name]:checked});
  }

  const formSubmit = e =>{
    e.preventDefault();
    axios.post("https://reqres.in/api/users", userForm)
    .then((res)=>{
      console.log(res.data);
    })
  }

  useEffect(()=>{
    console.log(userForm);
    formSchema.isValid(userForm)
    .then((valid) =>  setDisabledButton(!valid));
  }, [userForm]);

  useEffect(()=>{
    console.error(userFormErrors);
  }, [userFormErrors]);


  return (
    <div className="login-form p-3 border border-primary-subtle rounded shadow ">
      <h2 className="text mb-3">Form</h2>
      <Form onSubmit={formSubmit}>
        <FormGroup>
          <Label
            for="name"
          >
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            type="text"
            onChange={changeHandler}
            value = {userForm.name}
            invalid = {userFormErrors.name}
          />
          <FormFeedback>{userFormErrors.name}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label
            for="user-email"
          >
            Email
          </Label>
          <Input
            id="user-email"
            name="email"
            placeholder="Email"
            type="email"
            onChange={changeHandler}
            value={userForm.email}
            invalid={userFormErrors.email}
          />
          <FormFeedback>{userFormErrors.email}</FormFeedback>
        </FormGroup>
        {' '}
        <FormGroup>
          <Label
            for="user-pass"
          >
            Password
          </Label>
          <Input
            id="user-pass"
            name="password"
            placeholder="Password"
            type="password"
            onChange={changeHandler}
            value = {userForm.password}
            invalid = {userFormErrors.password}
          />
          <FormFeedback>{userFormErrors.password}</FormFeedback>
        </FormGroup>
        <FormGroup
          check
          inline
        >
          <Input type="checkbox" 
          id="terms" 
          name="terms"
          onChange={checkboxChangeHandler}
          value="approved"
          checked={userForm.terms}
          invalid={userFormErrors.terms}
          />
          <Label check>
            I have read the Terms of Service
          </Label>
        </FormGroup>
        {' '}
        <Button 
        type="submit"
        disabled={disabledButton}
        >
          Submit
        </Button>
      </Form>
      
    </div>

  )
}
export default UserForm;