import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames";

import style from "./card.module.scss"

export const Card = ({children, className}) => (
  <section className={classnames(style.card, className)}>
    {children}
  </section>
)

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
