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
                    <li>
                        <Link to="/home/params">Params</Link>
                    </li>
                </ul>
                <img src={logo} className={style.logo} alt="logo" />
                <RouterView path="/home" />
            </div>
        </div>
    )
}

export default Home
