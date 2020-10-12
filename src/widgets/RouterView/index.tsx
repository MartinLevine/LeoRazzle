import React from 'react'
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
            {
                // Object.keys(routers).map(path => {
                //     return <Route key={path} exact path={`/${path}`} component={routers[path].component} />
                // })
                routerArr
            }
            <Redirect key={path} from={path} to={routerArr[0].props.path} />
        </Switch>
    )
}

export function withAuthorize(checkFun: () => boolean, Component?: any) {
    return function (WrappedComponent: any) {
        return class extends React.Component<any, any> {
            constructor(props: any) {
                super(props)
            }
            render() {
                return checkFun() ? <WrappedComponent {...this.props} /> : Component || <h1>你没有权限</h1>
            }
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
