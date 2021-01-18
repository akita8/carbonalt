import React from "react"

import { ReactComponent as Cloud } from '../../icons/cloud.svg';
import { ReactComponent as Team } from '../../icons/team.svg';
import { ReactComponent as At } from '../../icons/at.svg';

import style from "./page-header.module.scss"

export const PageHeader = () => (
  <nav className={style.pageHeader}>
    <ol>
        <li><span>Carbon</span><span>Alt</span></li>
        <li><Cloud className={style.icon}/>facts</li> 
        <li> <At className={style.icon}/>links</li>
        <li><Team className={style.icon}/>about us</li>
    </ol>
  </nav>
)

// facts nuvola
// links at 
// about us team