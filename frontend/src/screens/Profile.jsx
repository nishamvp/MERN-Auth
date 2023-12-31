import React, { useEffect, useState } from 'react'
import { Button, Form, } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Loader } from '../components/Loader'
import { setCredentials } from '../slices/authSlice'
import { useUpdateMutation } from '../slices/usersApiSlice'

export const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [updateUser, { isLoading }] = useUpdateMutation()
  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.setName, userInfo.setEmail])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password are not same')
    } else {
      try {
        const res= await updateUser({ id: userInfo._id, name, email, password}).unwrap();
        dispatch(setCredentials({...res}))
        toast.success('User Updated Successfully..')
        navigate('/')
      } catch (error) {
        toast.error(res?.data?.message||error)
      }
    }
  }
  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {isLoading && <Loader/>}
        <Button className="mt-3" type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </FormContainer>
  )
}
