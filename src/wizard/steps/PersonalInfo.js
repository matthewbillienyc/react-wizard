import React from 'react'
import { Input, Form } from 'antd'

const PersonalInfo = ({
  form,
  stepState: {
    firstName = '',
    lastName = '',
    phoneNumber = '',
  } = {},
}) => (
  <>
    <Form ref={form}>
      <Form.Item
        name='firstName'
        value={firstName}
        rules={[{
          required: true,
          message: 'First Name required'
        }]}>
          <Input placeholder='First Name'/>
        </Form.Item>
        <Form.Item
        name='lastName'
        value={lastName}
        rules={[{
          required: true,
          message: 'Last Name required'
        }]}>
          <Input placeholder='Last Name'/>
        </Form.Item>
        <Form.Item
        name='phoneNumber'
        value={phoneNumber}
        rules={[{
          required: true,
          message: 'Phone number required'
        }]}>
          <Input placeholder='Phone Number'/>
        </Form.Item>
    </Form>
  </>
)

export default PersonalInfo
