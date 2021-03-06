import React, { useState, useRef } from 'react'
import { Button, Steps, notification } from 'antd'
import 'antd/dist/antd.css'

const { Step } = Steps

const Wizard = ({ stepMap, sectionMap, initialStepName, initialWizardState = {} }) => {
  const [currentStepName, setCurrentStepName] = useState(initialStepName)
  const formEl = useRef()
  const {
    nextStep,
    previousStep,
    Component,
    componentProps = {},
    onSubmit,
    nextButtonText = 'Next'
  } = stepMap[currentStepName]

  const [wizardState, setWizardState] = useState(Object.keys(stepMap).reduce((acc, currentKey) => {
    return acc[currentKey] = { ...initialWizardState[currentKey] }
  }, {}))

  const handleNextStep = async () => {
    const nextStepName = typeof nextStep === 'function'
      ? nextStep({ form: formEl, wizardState, currentStepName })
      : nextStep

    if (onSubmit && formEl.current) {
      try {
        await formEl.current.validateFields()
        onSubmit({ form: formEl, wizardState, stepName: currentStepName })
        setWizardState(previousState => ({ ...previousState, [currentStepName]: formEl.current.getFieldsValue() }))
        setCurrentStepName(nextStepName)
      } catch (error) {
        notification.info({
          message: 'There was an error',
          description: 'Please fix the errors in red.',
          placement: 'topRight',
        })
      }
    } else if (nextStepName) {
      setCurrentStepName(nextStepName)
    }
  }

  const handlePreviousStep = () => {
    const previousStepName = typeof previousStep === 'function'
      ? previousStep({ form: formEl, wizardState, currentStepName })
      : previousStep

    setCurrentStepName(previousStepName)
  }

  const ProgressTracker = () => {
    const currentStep = sectionMap.indexOf(sectionMap.find(({ steps }) => steps.includes(currentStepName)))
    return (
      <>
        <Steps current={currentStep}>
          {sectionMap.map(({ header }) => <Step key={header} title={header} />)}
        </Steps>
      </>
    )
  }

  return (
    <>
      <ProgressTracker/>
      <Component form={formEl} stepState={wizardState[currentStepName] || {}} {...componentProps}/>
      {previousStep && <Button onClick={handlePreviousStep}>Previous</Button>}
      <Button onClick={handleNextStep}>{nextButtonText}</Button>
    </>
  )
}

export default Wizard
