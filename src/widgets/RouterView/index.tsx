import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
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
    return (
        <Switch>
            {
                // Object.keys(routers).map(path => {
                //     return <Route key={path} exact path={`/${path}`} component={routers[path].component} />
                // })
                mapPathRoutes(path || '/')
            }
        </Switch>
    )
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