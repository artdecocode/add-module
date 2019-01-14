/* yarn example/ */
import addModule from '../src'

(async () => {
  const res = await addModule({
    text: 'example',
  })
  console.log(res)
})()