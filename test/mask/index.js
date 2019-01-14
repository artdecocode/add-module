import { makeTestSuite } from 'zoroaster'
import Context from '../context'
import addModule from '../../src'

const ts = makeTestSuite('test/result', {
  async getResults(input) {
    const res = await addModule({
      text: input,
    })
    return res
  },
  context: Context,
})

// export default ts
