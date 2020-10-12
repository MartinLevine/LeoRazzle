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
