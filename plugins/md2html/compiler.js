/*
 * @Author: MrAlenZhong
 * @Date: 2021-09-04 19:49:37
 * @LastEditors: MrAlenZhong
 * @LastEditTime: 2021-10-08 15:44:13
 * @Description: 
 */
const { randomNum } = require('./utils')
const reg_mark = /^(.+?)\s/
const reg_sharp = /^\#/
const reg_crossbar = /^\-/
const reg_number = /^\d/
function createTree(mdArr){
  let _htmlPool = {}
  let _lastMark = ''
  let _key = 0
  mdArr.forEach((mdFragment) => {
    const matched = mdFragment.match(reg_mark)
    if(matched){
      const mark = matched[1]
      const input = matched['input']
      if(reg_sharp.test(mark)){
        const tag = `h${mark.length}`
        const tagContent = input.replace(reg_mark,'')

        if(_lastMark === mark){
          _htmlPool[`${tag}-${_key}`].tags = [..._htmlPool[tag].tags,`<${tag}>${tagContent}</${tag}>`]
        }else{
          _lastMark = mark
          _key = randomNum()
          _htmlPool[`${tag}-${_key}`] = {
            type:'single',
            tags:[`<${tag}>${tagContent}</${tag}>`]
          }
        }

      }
      if(reg_crossbar.test(mark)){
        const tag = `li`
        const tagContent = input.replace(reg_mark,'')

        if(reg_crossbar.test(_lastMark)){
          _htmlPool[`ul-${_key}`].tags = [..._htmlPool[`ul-${_key}`].tags,`<${tag}>${tagContent}</${tag}>`]
        }else{
          _lastMark = mark
          _key = randomNum()
          _htmlPool[`ul-${_key}`] = {
            type:'wrap',
            tags:[`<${tag}>${tagContent}</${tag}>`]
          }
        }

      }
      if(reg_number.test(mark)){
        const tag = `li`
        const tagContent = input.replace(reg_mark,'')

        if(reg_number.test(_lastMark)){
          _htmlPool[`ol-${_key}`].tags = [..._htmlPool[`ol-${_key}`].tags,`<${tag}>${tagContent}</${tag}>`]
        }else{
          _lastMark = mark
          _key = randomNum()
          _htmlPool[`ol-${_key}`] = {
            type:'wrap',
            tags:[`<${tag}>${tagContent}</${tag}>`]
          }
        }

      }
    }
  })
  return _htmlPool
}

function compileHTML(_mdArr){
  const _htmlPool = createTree(_mdArr)
  let _htmlStr = ''
  let item
  for(let k in _htmlPool){
    item = _htmlPool[k]
    if(item.type === 'single'){
      item.tags.forEach((tag) => {
        _htmlStr += tag
      })
    }else if(item.type === 'wrap'){
      let _list = `<${k.split('-')[0]}>`
      item.tags.forEach((tag) => {
        _list += tag
      })
      _list += `</${k.split('-')[0]}>`
      _htmlStr += _list
    }
  }
  return _htmlStr
}

module.exports = {
  compileHTML
}