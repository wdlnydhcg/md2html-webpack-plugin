/*
 * @Author: MrAlenZhong
 * @Date: 2021-10-04 14:50:10
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2021-10-04 19:15:43
 * @Description: 
 */
const Md2HtmlPlugin = require('./plugins/md2html')
const {resolve} = require('path')
module.exports = {
  mode:'development',
  entry:resolve(__dirname,'src/app.js'),
  output:{
    path:resolve(__dirname,'dist'),
    filename:'app.js'
  },
  plugins:[
    new Md2HtmlPlugin({
      template:resolve(__dirname,'test.md'),
      filename:'test.html'
    })
  ]
}