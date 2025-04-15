module.exports = {
  apps: [{
    name: "hexagonal",
    script: "./dist/main.js",
    instances: 1,
    cron_restart: "0 0 * * *",
    watch: false,
    autorestart: true,
    max_memory_restart: "1G",
    env_development: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
};