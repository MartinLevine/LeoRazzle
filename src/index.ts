import express from 'express'

let app = require('./utils/ServerRenderer/').default

if (module.hot) {
    module.hot.accept('./utils/ServerRenderer/', function () {
        console.log('🔁  HMR Reloading `./utils/ServerRenderer/`...')
        try {
            app = require('./utils/ServerRenderer/').default
        } catch (error) {
            console.error(error)
        }
    })
    console.info('✅  Server-side HMR Enabled!')
}

const port = process.env.PORT || 3000

export default express()
    .use((req, res) => app.handle(req, res))
    .listen(port, () => {
        console.log(`> App started http://localhost:${port}`)
    })
