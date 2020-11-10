import React from 'react'
import { Redirect } from 'react-router-dom'
import { IRouterSet, withAuthorize, withParameters } from '../widgets/RouterView'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Params from '../pages/Params'

const routers: IRouterSet = {
    home: {
        name: 'Home',
        component: Home,
        children: {
            contact: {
                name: 'Contact',
                component: CheckAuth(Contact)
            },
            link: {
                name: 'Link',
                component: () => <h2>这里是Link子路由</h2>
            },
            welcome: {
                name: 'Welcome',
                component: () => (
                    <>
                        <button
                            onClick={() => {
                                localStorage.setItem('token', 'xxxx')
                                alert('token增加成功，现在你可以访问Contact子路由了！')
                            }}>
                            点我增加token
                        </button>
                        <h2>欢迎使用LeoRazzle - Leogemini基于Razzle搭建的脚手架工具</h2>
                    </>
                )
            },
            params: {
                name: 'Params',
                component: Params
            }
        }
    }
}

function CheckAuth(component: any) {
    return withAuthorize(
        () => window.localStorage.getItem('token') as any,
        // 你也可以直接重定向到某个页面
        // <Redirect to="/home/welcome"></Redirect>
        <h1>你没有权限访问这个页面，这个是自定义无权限组件</h1>
    )(component)
}

export default routers
