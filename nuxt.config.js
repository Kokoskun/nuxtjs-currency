
export default {
  mode: 'universal',
  env: {
    isApi: false
  },
  server: {
    port: 8080
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  pwa: {
    meta: {
      name: process.env.npm_package_title,
      author: process.env.npm_package_author,
      lang: 'en',
      theme_color: '#072f4f'
    },
    manifest: {
      short_name: process.env.npm_package_name,
      name: process.env.npm_package_title,
      lang: 'en',
      description: process.env.npm_package_description
    }
  },
  loading: '~/components/Loading.vue',
  css: [],
  plugins: [],
  buildModules: [],
  modules: [
  ['@nuxtjs/google-fonts', {
    families: {
      'Chakra+Petch': {
        wght: [300, 500, 600]
      }
    }
  }],
  'bootstrap-vue/nuxt',
  '@nuxtjs/axios',
  '@nuxtjs/pwa',
  '@nuxtjs/toast'
  ],
  axios: {
    baseURL: 'http://localhost:8000'
  },
  toast: {
    position: 'top-center'
  },
  build: {
    extend (config, ctx) {
    }
  }
};