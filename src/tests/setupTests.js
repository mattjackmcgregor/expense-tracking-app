import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const dotenv = require('dotenv')

dotenv.config({ path: '.env.test'})

Enzyme.configure({
  adapter: new Adapter()
})