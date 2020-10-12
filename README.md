# LeoRazzle - 基于Razzle的React脚手架开发工具

**警告：这个脚手架基于Razzle的基础上进行搭建**  

![repo-banner](https://user-images.githubusercontent.com/4060187/28923990-050a32d4-782e-11e7-9da7-574ce5a8b455.png)

## 说明

本项目基于Razzle进行了如下修改：

- **[重要] 添加了对于scss的支持**

- **[重要] 添加RouterView路由组件**

- **[重要] 添加了Typescript支持，将所有js以及jsx文件修改为ts、tsx**

- **[重要] 删除了App.tsx，并将/src/utils/ServerRenderer/index.tsx以及client.tsx下对App.tsx的引用全部修改为RouterView**

- **[重要] 将原本razzle项目下的/src/server.js重写成/src/utils/ServerRenderer/index.tsx，并修改了index.ts里的server.js文件的指向**

- 重新构建了项目目录

    - assets: 存放项目资源文件
    
    - pages: 存放页面
    
    - routers: 存放路由定义文件
    
    - utils: 存放自封装的工具集
    
    - widgets: 存放组件
    
- 添加了prettier规范代码
    
查看详细的razzle中间件配置、文档或其他说明
[点击这里](https://razzlejs.org/getting-started).

## 快速开始

```bash
git clone https://github.com/Next5Studio/LeoRazzle.git [你的项目名字]
cd [你的项目名字]
yarn
```

## RouterView

为了解决路由嵌套的问题，我们参照Vue的路由模式封装了RouterView组件，RouterView会根据路由表中的路由配置来自动分配子路由，如果你的页面需要使用嵌套路由，你只需要以下几个步骤：

- 修改路由表定义
```typescript
// src/routers/index.tsx

import React from 'react'
import { IRouterSet } from '../widgets/RouterView'
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
```

- 在需要使用嵌套路由的地方加入RouterView
```typescript
// src/pages/Home/index.tsx

import React from 'react'
import RouterView from '../../widgets/RouterView'
import logo from '../../assets/react.svg'
import style from './style.module.scss'
import { Link } from 'react-router-dom'

function Home(props: any) {
    return (
        <div className={style.container}>
            <div className={style.wrap}>
                <ul className={style.navbar}>
                    <li>
                        <Link to="/home/welcome">Welcome</Link>
                    </li>
                    <li>
                        <Link to="/home/link">Link</Link>
                    </li>
                    <li>
                        <Link to="/home/contact">Contact</Link>
                    </li>
                </ul>
                <img src={logo} className={style.logo} alt="logo" />
                <RouterView path="/home" />
            </div>
        </div>
    )
}

export default Home
```

就是这么简单，RouterView会根据你指定的path属性去读取路由表中的对象，需要注意的是，路由表对象的接口定义如下：
```typescript
// src/widgets/RouterView/index.tsx

export interface IRouterSet {
    [path: string]: {
        name: string
        component: any
        exact?: boolean
        children?: IRouterSet
    }
}
```

也就是说，假设你的第一层路由有两个：`/home` 跟 `/shop`，其中 `/home` 下有两个二层的子路由： `/about` 跟 `/contact` 那么你的路由表应该这么定义
```typescript
const routers: IRouterSet = {
    home: {
        ...
        ...
        children: {
            about: { ... },
            contact: { ... }
        }
    },
    shop: {
        ...
    }
}
```
是的没错，IRouterSet对象中的keys就是路由匹配的路径，当浏览器地址栏改变时RouterView会自动匹配路由跟它前面层级的路由路径，比如 `/home/about` 就会匹配到路由表中的 `/home` 下面的 `/about`，并渲染其中的component

### TODO
后续可能我会陆续添加以下功能（取决于我有没有那么多时间23333）:
- [x] 基于react的高阶组件定义一个withAuthorization
- [ ] 添加路由参数

Ps.其他功能我还在想...

有啥想法可以提iss，我会再看的
