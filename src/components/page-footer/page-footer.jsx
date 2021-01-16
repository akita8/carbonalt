import React from "react"
import PropTypes from "prop-types"

import style from "./page-footer.module.scss"

export const PageFooter = () => (
  <footer className={style.pageFooter}>
    © {new Date().getFullYear()} Carbon<span>Alt</span>
  </footer>
)

PageFooter.propTypes = {
  siteTitle: PropTypes.string,
}