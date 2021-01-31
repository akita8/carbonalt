import React from "react"
import PropTypes from "prop-types"

import style from "./page-footer.module.scss"

export const PageFooter = () => (
  <footer className={style.pageFooter}>
    <div>© {new Date().getFullYear()} Carbon<span>Alt</span></div> 
    <div> All data is provided for educational purposes, we do not take responsibility for how it is used.</div>
  </footer>
)

PageFooter.propTypes = {
  siteTitle: PropTypes.string,
}