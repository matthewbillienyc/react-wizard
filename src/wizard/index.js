import React, { Fragment, useState, useRef } from 'react'
import { Button } from 'antd'

const Wizard = ({ stepMap, initialStepName }) => {
  const [currentStepName, setCurrentStepName] = useState(initialStepName)
  const formEl = useRef()
  const { nextStep, previousStep, Component, componentProps, onSubmit } = stepMap[currentStepName]
  
  const [wizardState, setWizardState] = useState(Object.keys(stepMap).reduce((acc, currentKey) => {
    return acc[currentKey] = {}
  }, {}))

  console.log(wizardState)

  const handleNextStep = () => {
    const nextStepName = typeof nextStep === 'function'
      ? nextStep()
      : nextStep

    if (onSubmit) {
      // TODO: validate form / errors / disabled next
      // Call step submit
      onSubmit({ form: formEl, setWizardState, stepName: currentStepName })
    }
    setCurrentStepName(nextStepName)
  }

  // TODO: add step tracker / progress bar
  return (
    <Fragment>
      <Component form={formEl} {...(componentProps || {})} />
      <Button onClick={() => setCurrentStepName(previousStep)}>Previous</Button>
      <Button onClick={handleNextStep}>Next</Button>
    </Fragment>
  )
}

export default Wizard
