import React from "react"

import { ReactComponent as Cloud } from '../../icons/cloud.svg';

import style from "./page-header.module.scss"

export const PageHeader = () => (
  <nav className={style.pageHeader}>
    <ol>
        <li><span>Carbon</span><span>Alt</span></li>
        <li>facts</li> 
        <li>links</li>
        <li>about us</li>
    </ol>
  </nav>
)

// facts nuvola
// links at 
// about us team