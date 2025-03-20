module.exports = {
  apps: [
    {
      name: "opredelitel",
      script: "./src/server.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
  deploy: {
    prod: {
      user: "superuser",
      host: "10.10.0.37",
      ref: "origin/master",
      repo: "git@github.com:nekrasovka-library/opredelitel.git",
      path: "/var/www/opredelitel",
      "post-deploy":
        "cd /var/www/opredelitel/current/frontend && npm install && npm run build && cd ../backend && npm install && pm2 reload /var/www/opredelitel/current/backend/ecosystem.config.js --env production",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  },
};
