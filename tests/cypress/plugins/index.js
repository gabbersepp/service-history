const wp = require('@cypress/webpack-preprocessor')
const CDP = require('chrome-remote-interface');
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

let port = 0;
let client = null;

module.exports = (on, config) => {
  const options = {
    webpackOptions: require('../webpack.config'),
  }
  on('file:preprocessor', wp(options))
  addMatchImageSnapshotPlugin(on, config);
  on('before:browser:launch', (browser, args) => {
    port = ensureRdpPort(args);
    args.push('--window-size=1920,1080')
  })
  on("task", {
    activatePrintMediaQuery: async () => {
      client = await CDP({ port });
      return client.send('Emulation.setEmulatedMedia', { media: "print" })
    },
    resetCRI: async () => {
      if (client) {
        await client.close();
      }

      return Promise.resolve(true);
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
