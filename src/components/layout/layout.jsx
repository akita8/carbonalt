import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { PageHeader } from "../page-header"
import { PageFooter } from "../page-footer"

import style from "./layout.module.scss"

export const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={style.layout}>
      <PageHeader siteTitle={data.site.siteMetadata?.title} />
      <main>
        <div className={style.page}>
          {children}
        </div>
      </main>
      <PageFooter />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
