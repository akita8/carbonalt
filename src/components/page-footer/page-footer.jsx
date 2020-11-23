import React from "react"
import PropTypes from "prop-types"

import style from "./page-footer.module.scss"

export const PageFooter = () => (
  <footer className={style.pageFooter}>
    © {new Date().getFullYear()} Carbonalt
  </footer>
)

PageFooter.propTypes = {
  siteTitle: PropTypes.string,
}