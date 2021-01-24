import React from "react"

import { Layout } from "../components/layout"
import { Icon } from "../components/icon"
import SEO from "../components/seo"

import style from "../styles/about.module.scss"

// TODO move to config
const CONTRIBUTORS = [
  {
    icon: 'lidia',
    title: 'Lidia Benedini - Team Leader and Researcher',
    description: 'Master Student in Sustainable Energy at DTU and participant at the Climate KIC Master program',
    linkedinLink: 'https://www.linkedin.com/in/lidia-benedini-051159107/'
  },
  {
    icon: 'marco',
    title: 'Marco Bianchi - Software Developer',
    description: 'Software Developer at Deus Technology',
    linkedinLink: 'https://www.linkedin.com/in/marco-bianchi-547a90158/'
  },
  {
    icon: 'niko',
    title: 'Nikolaos Nakis - Data Scientist',
    description: 'PhD student at DTU at Compute Department',
    linkedinLink: 'https://www.linkedin.com/in/nikolaos-nakis-67a07a147/'
  },
]

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <article className={style.about}>
      <h1>About Us</h1>
      {
        CONTRIBUTORS.map((c, i) => (
          <section key={i}>
            <div className={style.portrait}>
              <Icon className={style.icon} name={c.icon}/>
            </div>
            <div className={style.profile}>
              <span>
                <p>{c.title}</p>
                <p>{c.description}</p>
              </span>
              <span>
                <a target="_blank" rel="noreferrer" href={c.linkedinLink}>
                <Icon className={style.socialIcon} name="linkedin"/>
                </a>
              </span>
            </div>
          </section>
        ))
      }
    </article>  
    
  </Layout>
)

export default AboutPage
