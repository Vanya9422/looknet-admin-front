import defaultPlugins from "./tools/svggo.function.js";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "server",
  ssr: false,

  server: {
    port: process.env.APP_PORT, // default: 3000
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "MP-NY",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  env: {
    GOOGLE_MAP: process.env.GOOGLE_MAP,
    API_URL: process.env.API_URL,
    WS_HOST: process.env.WS_HOST,
    WS_KEY: process.env.WS_KEY,
    WS_PORT: process.env.WS_PORT,
    FORCE_TLS: process.env.FORCE_TLS,
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/сss/fonts.scss",
    "~/assets/сss/libs.scss",
    "~/assets/сss/content.scss",
    "~/assets/сss/keyframes.scss",
    "~/assets/сss/simple.scss",
    "~/assets/сss/modules.scss",
  ],
  svgSprite: {
    // pass costum config
    svgoConfig() {
      return {
        plugins: defaultPlugins(),
      };
    },
  },
  styleResources: {
    scss: [
      "~/assets/сss/core.scss",
      "./assets/сss/variables.scss",
      "./assets/сss/media.scss",
      "./assets/сss/data.scss",
      "./assets/сss/transitions.scss",
    ],
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vue-tippy/vue-tippy.js",
    "~/plugins/vuelidate/vuelidate.js",
    "~/plugins/v-mask/v-mask.js",
    "~/mixins/helpers/prototype/prototypeApi.js",
    "~/mixins/helpers/prototype/prototypePages.js",
    "~/mixins/helpers/prototype/prototypeCollect.js",
    "~/plugins/constants.js",
    "~/plugins/google-maps",
    "~/plugins/lightbox",
    "~/plugins/axios.js",
    "~/plugins/auth.js",
    "~/plugins/infiniteloading",
    "~/plugins/lodash",
    "~/plugins/Datepicker",
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/svg", "@nuxt/typescript-build", "@nuxtjs/moment"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/svg-sprite",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "vue-screen/nuxt",
    "nuxt-google-maps-module",
    "bootstrap-vue/nuxt",
    "@nuxtjs/toast",
  ],
  maps: {
    key: "AIzaSyBsxnXvyCO7GNeyTR_vun1zfJzJC0ktoqY",
    libraries: ["geometry"],
  },

  auth: {
    plugins: [{ src: "~/plugins/echo.js", ssr: false }],
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: process.env.API_URL,
        tokenRequired: true,
        tokenType: "Bearer",
        endpoints: {
          login: {
            url: "/auth/login",
          },
          logout: {
            url: "/auth/logout",
            method: "get",
          },
          user: {
            url: "/user",
            propertyName: false,
          },
        },
      },
    },
    redirect: {
      login: "/",
      logout: "/auth/login",
      home: "/announcement-list",
      callback: "/",
    },
  },

  bootstrapVue: {
    bootstrapCSS: true, // Or `css: false`
    bootstrapVueCSS: true, // Or `bvCSS: false`
    bootstrapVue: {
      componentPlugins: ["ModalPlugin", "CollapsePlugin"],
    },
  },

  VueTippy: {
    directive: "tippy", // => v-tippy
    flipDuration: 0,
    popperOptions: {
      modifiers: {
        preventOverflow: {
          enabled: false,
        },
      },
    },
  },

  screen: {
    sm: 0,
    lm: 421,
    st: 581,
    lt: 821,
    sd: 1121,
    ld: 1281,
    hd: 1441,
  },

  axios: {
    baseURL: process.env.API_URL,
    changeOrigin: true,
    credentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
    transpile: [
      "swiper",
      // 'dom7',
    ],
  },
};
