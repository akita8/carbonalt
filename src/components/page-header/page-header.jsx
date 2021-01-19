import React from "react"

import { Icon } from '../icon'

import style from "./page-header.module.scss"

// TODO add drawer for mobile navigation

export const PageHeader = () => (
  <nav className={style.pageHeader}>
    <ol>
        <li><a href="/"><span>Carbon</span><span>Alt</span></a></li>
        <li><a href="/facts"><Icon name="cloud" className={style.icon}/>facts</a></li>
        <li><a href="/links"><Icon name="at" className={style.icon}/>links</a></li>
        <li><a href="/about"><Icon name="team" className={style.icon}/>about us</a></li>
    </ol>
  </nav>
)