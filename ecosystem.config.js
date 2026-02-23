module.exports = {
  apps: [{
    name: 'dsa-forge',
    script: '.next/standalone/server.js',
    cwd: '/home/z/my-project',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0'
    }
  }]
}
