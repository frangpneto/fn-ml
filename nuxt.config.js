const pkg = require("./package");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/vuetify" },
    { src: "~/plugins/currency", ssr: true },
    { src: "~/plugins/moment", ssr: true },
    { src: '~/plugins/vue-google-adsense', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa"],

  /*
   ** Manifest
   */

  manifest: {
    name: "Dashboard ML",
    display: "standalone",
    lang: "pt-BR",
    background_color: "#fff",
    description: "Gerencie suas vendas do Mercado Livre.",
    icons: [
      {
        src: "images/32bits-16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        src: "images/32bits-24.png",
        sizes: "24x24",
        type: "image/png"
      },
      {
        src: "images/32bits-32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "images/32bits-48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "images/32bits-128.png",
        sizes: "128x128",
        type: "image/png"
      },
      {
        src: "images/32bits-256.png",
        sizes: "256x256",
        type: "image/png"
      }
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
