import React from 'react'
import { Redirect } from 'react-router-dom'
import { IRouterSet, withAuthorize } from '../widgets/RouterView'
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
                component: withAuthorize(
                    () => localStorage.getItem('token') as any,
                    NoAuth
                )(() => <h2>这里是Link子路由</h2>)
            },
            welcome: {
                name: 'Welcome',
                component: () => (
                    <>
                        <button onClick={() => localStorage.setItem('token', 'xxxx')}>点我增加token</button>
                        <h2>欢迎使用LeoRazzle - Leogemini基于Razzle搭建的脚手架工具</h2>
                    </>
                )
            }
        }
    }
}

function NoAuth() {
    // 你也可以直接重定向到某个页面
    // <Redirect to="/home/welcome"></Redirect>
    return <h1>你没有权限访问这个页面，这个是自定义无权限组件</h1>
}

export default routers
