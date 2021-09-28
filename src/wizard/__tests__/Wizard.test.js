import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Wizard from '../Wizard'

describe('<Wizard>', () => {
  it('renders a step', () => {
    const stepMap = {
      testStep: {
        Component() {
          return <div>Hi</div>
        },
        stepName: 'testStep',
      },
    }

    const sectionMap = [{ header: 'Test Step', steps: ['testStep']}]

    const wizard = shallow(
      <Wizard
        stepMap={stepMap}
        sectionMap={sectionMap}
        initialStepName='testStep'
      />
    )

    console.log(toJSON(wizard))
  })
})
