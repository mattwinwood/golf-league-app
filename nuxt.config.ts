// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({

                                  typescript: {
                                    strict: false,
                                  },
                                  app: {
                                    head: {
                                      title: "Golf League App",
                                    },
                                  },
                                  css: [
                                    // Provide the Tailwind CSS directives to our app
                                    "@/assets/css/index.css",
                                  ],
                                  modules: ["@nuxtjs/tailwindcss"],
                                });
