import React from "react"
import { Link } from "gatsby"

import { Icon } from '../icon'

import style from "./page-header.module.scss"
  
export const PageHeader = () => (
  <nav className={style.pageHeader}>
    <ol>
        <li>
          <Link to="/">
            <Icon name="logo" className={style.logo}/>
            <div className={style.text}>
              <span>arbon</span><span>Alt</span>
            </div>
          </Link>
        </li>
        <li><Link to="/facts"><Icon name="cloud" className={style.icon}/>facts</Link></li>
        <li><Link to="/links"><Icon name="at" className={style.icon}/>links</Link></li>
        <li><Link to="/about"><Icon name="team" className={style.icon}/>about us</Link></li>
    </ol>
    {/* FIXME it's not semantic, it should be */}
    <div role="button" className={style.navMenu}>
      <Icon name="menu" className={style.menuIcon}/>
    </div>
  </nav>
)
