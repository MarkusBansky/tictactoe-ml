const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // Configure the base URL for GitHub Pages deployment
  // This will be set to the repository name when deploying to GitHub Pages
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/tictactoe-ml/' 
    : '/'
})