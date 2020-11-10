import React from 'react'
import { withParameters } from '../../widgets/RouterView/'

function Params(props: any) {
    return (
        <div>
            <h2>
                这是Params子路由,当前路由参数：
                {/* 然后在组件中使用props.params.xxx接收路由参数 */}
                {`{ pid: ${props.params.pid}, cid: ${props.params.cid}, uid: ${props.params.uid} }`}
            </h2>
            <h2>
                访问<a href="/home/params/123?cid=456&uid=789">{`/home/params/{pid}?{cid}&{uid}`}</a>查看路由传参结果
            </h2>
        </div>
    )
}

export default withParameters('/home/params/{pid}?{cid}&{uid}', Params)
