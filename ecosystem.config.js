module.exports = {
  apps: [
    {
      name: "opredelitel",
      script: "/backend/src/server.js",
      env_production: {
        NODE_ENV: "production",
        NODE_PATH: "production",
        REACT_APP_URL: "https://opredelitel.ru",
      },
    },
  ],
  deploy: {
    prod: {
      user: "superuser",
      host: "10.10.1.65",
      ref: "origin/PRO-43",
      repo: "git@github.com:nekrasovka-library/opredelitel.git",
      path: "/var/www/opredelitel",
      "post-deploy":
        "npm i && npm run build && npm run production && pm2 reload ecosystem.config.js --env production",
      env: {
        PORT: 3012,
      },
    },
  },
};
