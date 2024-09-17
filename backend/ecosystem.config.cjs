module.exports = {
  apps: [
    {
      name: "UFH",
      script: "./build/app.js", // Path to your compiled JS file
      watch: true, // Watches for changes in files and restarts the app
      instances: 1, // Number of instances you want to run
      autorestart: true, // Automatically restarts your app if it crashes
      max_memory_restart: "1G", // Restart if it exceeds 1GB memory
      interpreter: 'node',
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      exec_mode: "fork",
      node_args: "--use_strict",
    }
  ]
};

