import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersAPISlics'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login,{isLoading}]=useLoginMutation()

  const {userInfo} = useSelector((state)=>state.auth)

  useEffect(() => {
    if(userInfo){
      navigate('/')
    }
  }, [navigate,userInfo])
  

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({email,password}).unwrap(); 
      dispatch(setCredentials({...res}));
      toast.success('Login successfully')
      navigate('/')
      console.log('response',res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      
    }
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" type="submit" variant="primary">
          Sign In
        </Button>
        <Row className="py-3">
          <Col>
            New Customer?
            <Link to="/register"> Register here?</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}