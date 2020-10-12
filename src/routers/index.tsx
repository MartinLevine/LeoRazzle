import React from 'react'
import { IRouterSet } from '../widgets/RouterView'
import Home from '../pages/Home'
import Contact from '../pages/Contact'

const routers: IRouterSet = {
    home: {
        name: 'Home',
        component: Home,
        children: {
            contact: {
                name: 'Contact',
                component: Contact
            },
            link: {
                name: 'Link',
                component: () => <h2>这里是Link子路由</h2>
            },
            welcome: {
                name: 'Welcome',
                component: () => <h2>欢迎使用LeoRazzle - Leogemini基于Razzle搭建的脚手架工具</h2>
            }
        }
    }
}

export default routers
