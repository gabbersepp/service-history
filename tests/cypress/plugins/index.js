const wp = require('@cypress/webpack-preprocessor')
const CDP = require('chrome-remote-interface');

let port = 0;

module.exports = (on) => {
  const options = {
    webpackOptions: require('../webpack.config'),
  }
  on('file:preprocessor', wp(options))
  on('before:browser:launch', (browser, args) => {
    port = ensureRdpPort(args);
  })
  on("task", {
    activatePrintMediaQuery: async () => {
      const client = await CDP({ port });
      return client.send('Emulation.setEmulatedMedia', { media: "print" })
    }
  })
}

function ensureRdpPort(args) {
  const existing = args.find(arg => arg.slice(0, 23) === '--remote-debugging-port')

  if (existing) {
    return Number(existing.split('=')[1])
  }

  const port = 40000 + Math.round(Math.random() * 25000)
  args.push(`--remote-debugging-port=${port}`)
  return port
}
