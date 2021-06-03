import WebServer from './web.server'
import "@babel/polyfill"
describe('Started', () => {
  let webServer = null

  beforeAll(() => { webServer = new WebServer() })

  test('should start and trigger a callback', async () => {
    let promise = webServer.start()
    await expect(promise).resolves.toBeUndefined()
  },100000)
  test('should stop and trigger a callback',
    async () => {
      let promise = webServer.stop()
      await expect(promise).resolves.toBeUndefined()
    },10000)
})
