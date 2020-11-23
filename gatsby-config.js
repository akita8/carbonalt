module.exports = {
  siteMetadata: {
    title: `Carbonalt`,
    description: `A carbon emission calculator.`,
    author: `Carbonalt Team`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `carbonalt`,
        short_name: `ca`,
        start_url: `/`,
        icon: "src/images/icon.png"
      },
    },
  ],
}
