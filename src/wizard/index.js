import React, { useState, useRef } from 'react'
import { Button, Steps } from 'antd'
import 'antd/dist/antd.css'

const { Step } = Steps

const Wizard = ({ stepMap, stepList, initialStepName, initialWizardState = {} }) => {
  const [currentStepName, setCurrentStepName] = useState(initialStepName)
  const formEl = useRef()
  const { nextStep, previousStep, Component, componentProps, onSubmit, nextButtonText = 'Next' } = stepMap[currentStepName]
  
  const [wizardState, setWizardState] = useState(Object.keys(stepMap).reduce((acc, currentKey) => {
    return acc[currentKey] = { ...initialWizardState[currentKey] }
  }, {}))

  console.log(wizardState)

  const handleNextStep = async () => {
    const nextStepName = typeof nextStep === 'function'
      ? nextStep()
      : nextStep

    if (onSubmit) {
      try {
        await formEl.current.validateFields()
        onSubmit({ form: formEl, setWizardState, stepName: currentStepName })
        setWizardState(previousState => ({ ...previousState, [currentStepName]: formEl.current.getFieldsValue() }))
        setCurrentStepName(nextStepName)
      } catch (error) {
        // TODO: toast popup if error
      }
    } else if (nextStepName) {
      setCurrentStepName(nextStepName)
    }
  }

  const ProgressTracker = () => {
    const currentStep = stepList.indexOf(stepList.find(name => name === currentStepName))
    return (
      <>
        <Steps current={currentStep}>
          {stepList.map(name => <Step key={name} title={stepMap[name].header} />)}
        </Steps>
      </>
    )
  }

  // TODO: add step tracker / progress bar
  return (
    <>
      <ProgressTracker />
      <Component form={formEl} stepState={wizardState[currentStepName] || {}} {...(componentProps || {})} />
      {previousStep && <Button onClick={() => setCurrentStepName(previousStep)}>Previous</Button>}
      <Button onClick={handleNextStep}>{nextButtonText}</Button>
    </>
  )
}

export default Wizard
