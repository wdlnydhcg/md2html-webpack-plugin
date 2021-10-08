/*
 * @Author: MrAlenZhong
 * @Date: 2021-10-08 15:45:26
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2021-10-08 15:45:26
 * @Description: 
 */
function randomNum(){
  return new Date().getTime() + parseInt(Math.random() * 10000)
}

module.exports = {
  randomNum
}