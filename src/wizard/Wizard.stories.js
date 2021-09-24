import React, { Fragment } from 'react';
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
    Component: ({ form }) => {
      return (
        <Fragment>
          <Form ref={form}>
            <Form.Item name='email'><Input/></Form.Item>
            <Form.Item name='password'><Input/></Form.Item>
          </Form>
        </Fragment>
      )
    },
    nextStep: 'emailConfirmation',
    stepName: 'emailForm',
    onSubmit({ form, setWizardState, stepName, ...props }) {
      setWizardState(previousState => ({ ...previousState, [stepName]: form.current.getFieldsValue() }))
    }
  },
  emailConfirmation: {
    Component() {
      return (
        <Fragment>
          Confirmed!
        </Fragment>
      )
    },
    nextStep: 'emailForm',
    stepName: 'emailConfirmation',
  }
}

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
  stepMap,
  initialStepName: 'emailForm',
};
