import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import addModule from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof addModule, 'function')
  },
  async 'calls package without error'() {
    await addModule()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await addModule({
      text: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T