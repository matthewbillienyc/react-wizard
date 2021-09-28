import React from 'react'
import { Form, Input } from 'antd'

const AccountInfo = ({
  form,
  stepState: {
    email = '',
    password = '',
  } = {},
}) => (
  <>
    <Form ref={form}>
      <Form.Item
        name='email'
        value={email}
        rules={[{
          type: 'email',
          required: true,
          message: 'Please enter a valid email.',
        }]}
      >
        <Input type='email' placeholder='email'/>
      </Form.Item>
      <Form.Item
        name='password'
        value={password}
        rules={[{
          required: true,
          message: 'Must enter a password',
        }]}
      >
        <Input type='password' placeholder='password'/>
      </Form.Item>
    </Form>
  </>
)
export default AccountInfo
