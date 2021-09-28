import React from 'react';
import { Input, Form } from 'antd'

import Wizard from './index';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Wizard',
  component: Wizard,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Wizard {...args} />;

export const FirstStory = Template.bind({});

const stepMap = {
  emailForm: {
    Component: ({
      form,
      stepState: {
        email = '',
        password = '',
      } = {},
    }) => {
      return (
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
    },
    nextStep: 'emailConfirmation',
    stepName: 'emailForm',
    onSubmit({ form, ...props }) {
    },
  },
  emailConfirmation: {
    Component() {
      return (
        <>
          Confirmed!
        </>
      )
    },
    previousStep: 'emailForm',
    nextStep: 'personalInfo',
    stepName: 'emailConfirmation',
  },
  personalInfo: {
    Component({
      form,
      stepState: {
        firstName = '',
        lastName = '',
        phoneNumber = '',
      } = {},
    }) {
      return (
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
    },
    previousStep: 'emailConfirmation',
    stepName: 'personalInfo',
    nextButtonText: 'Done',
  }
}

const sectionMap = [
  { header: 'Account Info', steps: ['emailForm', 'emailConfirmation'] },
  { header: 'Personal Info', steps: ['personalInfo'] },
]

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
  stepMap,
  sectionMap,
  initialStepName: 'emailForm',
};
