import React from 'react';
import AccountInfo from './steps/AccountInfo'
import PersonalInfo from './steps/PersonalInfo'
import Wizard from './Wizard';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Wizard',
  component: Wizard,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Wizard {...args} />;

export const FirstStory = Template.bind({});

const stepMap = {
  accountInfo: {
    Component: AccountInfo,
    nextStep: 'confirmation',
    stepName: 'accountInfo',
    onSubmit({ form, ...props }) {
      // POST form data
    },
  },
  confirmation: {
    Component() {
      return (
        <>
          Confirmed!
        </>
      )
    },
    previousStep: 'accountInfo',
    nextStep: 'personalInfo',
    stepName: 'confirmation',
  },
  personalInfo: {
    Component: PersonalInfo,
    previousStep: 'confirmation',
    stepName: 'personalInfo',
    nextButtonText: 'Done',
  }
}

const sectionMap = [
  { header: 'Account Info', steps: ['accountInfo'] },
  { header: 'Confirmation', steps: ['confirmation'] },
  { header: 'Personal Info', steps: ['personalInfo'] },
]

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
  stepMap,
  sectionMap,
  initialStepName: 'accountInfo',
};
