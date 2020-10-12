import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom'
import React from 'react'
import RouterView from './widgets/RouterView'
import { hydrate } from 'react-dom'
import './assets/style.css'

hydrate(
    <BrowserRouter>
        <RouterView />
    </BrowserRouter>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept()
}
