import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormC from '../components/Form_layout'
import { useDispatch, useSelector } from 'react-redux'
import Alertmsg from '../components/Alert'
import Buffer from '../components/buffer'
//import { clearSigninError } from '../actions/userActions';
import  {Sign_In, google_Sign_In}  from '../actions/userActions'
import { GoogleLogin } from '@react-oauth/google'

const SignInView = ({ location, history }) => {
  const [email, setUsername] = useState('')
  const [password, setPass] = useState('')

  const dispatch = useDispatch()
  const userSignin = useSelector(state => state.userSignin)
  const { error, userDetails, loading } = userSignin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  // useEffect(() => {
  //   return () => {
  //     // Clear the error message when the component unmounts
  //     dispatch(clearSigninError());
  //   };
  // }, [dispatch]);

  useEffect(() => {
    if (userDetails) {
      history.push(redirect)
    }

  }, [userDetails, redirect, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(Sign_In(email,password))
  }


  // const refreshPage = () => {
  //   window.location.reload();
  //   //dispatch(clearSigninError());
  // };

  const refreshPage = () => {
    window.location.reload();
  };

  const googleLoginSuccess = (response) => {
    console.log('Google login success:', response);
    dispatch(google_Sign_In(response));
  };

  const googleLoginFailure = (response) => {
    console.log('Google login error:', response);
  };

  return (
    <FormC>
      <h1>Sign in to the account</h1>
      {error && <Alertmsg variant='danger'>{error}</Alertmsg>}
      {loading && <Buffer />}
      <br></br>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your username'
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>
      
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter the password'
            value={password}
            onChange={(e) => setPass(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br></br>
        <Button type='submit' variant='primary'>
          Log In
        </Button>
        <br></br> <br></br>
        <Row className='my=6'>
        <Col>
          <GoogleLogin
            onSuccess={googleLoginSuccess}
            onError={googleLoginFailure}
          />
        </Col>
      </Row>
        <br></br>
        <Button type='button' variant='secondary' onClick={refreshPage}>
          Clear
        </Button>
      </Form>
      <br></br>
      <Row className='my=6'>
        <Col>
          Don't have a account?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Sign Up
          </Link>
        </Col>
      </Row>
    </FormC>
  )
}

export default SignInView
