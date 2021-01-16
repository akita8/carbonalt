import React from "react"
import PropTypes from "prop-types"

import style from "./page-header.module.scss"

export const PageHeader = ({siteTitle=``}) => (
  <header className={style.pageHeader}>
    Carbon<span>Alt</span>
  </header>
)

PageHeader.propTypes = {
  siteTitle: PropTypes.string,
}