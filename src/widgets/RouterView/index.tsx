import React, { useEffect, useState } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import routers from '../../routers'

function mapPathRoutes(path: string) {
    // Root path route
    if (path === '/') {
        return Object.keys(routers).map(path => (
            <Route key={path} exact={routers[path].exact} path={`/${path}`} component={routers[path].component} />
        ))
    }
    const paths = path.substring(1).split('/')
    let route = routers[paths[0]]
    paths.slice(1).forEach(pathPtr => {
        if (route.children) {
            route = route.children[pathPtr]
        }
    })
    return Object.keys(route.children!).map(routePath => (
        <Route
            key={routePath}
            exact={route.children![routePath].exact}
            path={`${path}/${routePath}`}
            component={route.children![routePath].component}
        />
    ))
}

interface IRouterViewProps {
    history?: History
    location?: Location
    match?: any
    path?: string
}

function RouterView(props: IRouterViewProps) {
    const { history, location, match, path } = props
    const routerArr = mapPathRoutes(path || '/')
    return (
        <Switch>
            {routerArr}
            <Redirect key={path} from={path} to={routerArr[0].props.path} />
        </Switch>
    )
}

export function withAuthorize(checkFun: () => boolean, Component?: any) {
    return function (WrappedComponent: any) {
        return class extends React.Component<any, any> {
            constructor(props: any) {
                super(props)
                this.state = {
                    isAuth: false
                }
            }

            componentDidMount() {
                this.setState({
                    isAuth: checkFun()
                })
            }

            render() {
                return this.state.isAuth ? <WrappedComponent {...this.props} /> : Component || <h1>你没有权限</h1>
            }
        }
    }
}

export function withParameters(template: string, WrappedComponent: any) {
    return class extends React.Component<any, any> {
        constructor(props: any) {
            super(props)
            this.state = {
                params: {}
            }
        }

        componentDidMount() {
            // 处理成 http://localhost:3000/home/123123/post/456/emm/789/123/45 形式
            const regex = new RegExp(template.replace(/(\/|\?|&)\{\w+\}/g, '/(.*)'))
            const source = window.location.href.replace(/(\?|&)\w+=/g, '/')

            const values = regex.exec(source)
            const keys = template.match(/\{(?<key>\w+)\}/g)!

            const params: any = {}
            if (values && keys) {
                for (let i = 0, j = keys.length - 1; i <= j; i++, j--) {
                    params[keys[i].substring(1, keys[i].length - 1)] = values[i + 1]
                    params[keys[j].substring(1, keys[j].length - 1)] = values[j + 1]
                }
            }

            this.setState({
                params
            })
        }

        render() {
            return <WrappedComponent {...this.props} params={this.state.params} />
        }
    }
}

export interface IRouterSet {
    [path: string]: {
        name: string
        component: any
        exact?: boolean
        children?: IRouterSet
    }
}

export default withRouter<any, any>(RouterView as any)
