export default [
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "https://musical-space-doodle-7gpqg6w4xj5hr75j-3000.app.github.dev",
        "https://musical-space-doodle-7gpqg6w4xj5hr75j-3001.app.github.dev",
        "https://musical-space-doodle-7gpqg6w4xj5hr75j-3002.app.github.dev"
      ],
      headers: "*",
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
