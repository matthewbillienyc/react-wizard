import React, { Fragment, useState, useRef } from 'react'
import { Button } from 'antd'

const Wizard = ({ stepMap, initialStepName }) => {
  const [currentStepName, setCurrentStepName] = useState(initialStepName)
  const formEl = useRef()
  const { nextStep, previousStep, Component, componentProps, onSubmit: stepSubmit } = stepMap[currentStepName]
  
  const [wizardState, setWizardState] = useState(Object.keys(stepMap).reduce((acc, currentKey) => {
    return acc[currentKey] = {}
  }, {}))

  console.log(wizardState)

  const onSubmit = () => {
    const nextStepName = typeof nextStep === 'function'
      ? nextStep()
      : nextStep

    if (stepSubmit) stepSubmit({ form: formEl, setWizardState, stepName: currentStepName })
    setCurrentStepName(nextStepName)
  }

  return (
    <Fragment>
      <Component form={formEl} onSubmit={onSubmit} {...(componentProps || {})} />
      <Button onClick={() => setCurrentStepName(previousStep)}>Previous</Button>
      <Button onClick={onSubmit}>Submit</Button>
    </Fragment>
  )
}

export default Wizard
