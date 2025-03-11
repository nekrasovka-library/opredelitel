module.exports = {
  apps: [
    {
      name: "opredelitel",
      script: "./src/server.js",
      cwd: "./backend",
      env_production: {
        NODE_ENV: "production",
        PORT: 3012,
        REACT_APP_API_URL: "https://opredelitel.ru",
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
      "post-deploy": `
        cd frontend && npm install && npm run build && cd .. &&
        cd backend && npm install && pm2 reload ecosystem.config.js --env production
      `,
      env: { PORT: 3012 },
    },
  },
};
