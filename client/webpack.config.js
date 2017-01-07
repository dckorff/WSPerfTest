var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = '../public';
var APP_DIR = './src';

var config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
    	
      {
        test: [/\.jsx/, /\.js/],
	      //exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['es2015', 'react']
	      }
      },
      {
      	test: [/\.jsx/, /\.js/],
      	loader: "eslint", 
      	exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;