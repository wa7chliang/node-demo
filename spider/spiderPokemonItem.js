const axios = require('axios')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const dataList = require('./data.js')

// 爬虫的URL信息
var opt = {
  hostname: 'http://www.pokemon.name',
  path: '/wiki/%E4%B8%BB%E9%A2%98:%E5%AE%9D%E5%8F%AF%E6%A2%A6',
  port: 443
}

var count = 0; // 控制并发进程
var pListNum = 0; // 爬虫的num
var success = 0;
var pokemonList = []

for (var i = 0; i < 3; i++) {
  goSearch() 
}

function goSearch () {
  if (count < 3) {
    findUrl()
  }
}

function findUrl () {
  count++
  pListNum++
  if (pListNum > 151) {
    return
  }
  axios.get(dataList[pListNum - 1].url)
  .then(res => {
    if (res.status == 200) {
      let html = res.data
      var $ = cheerio.load(html)
      var tr1 = $('.colortable.colortable-child.colortable-rowsep-0.colortable-colsep-1.colorize.c-default-default.colortable-unified table tr')
      var pokemon = {
        no: $('.colortable.colortable-child.colortable-rowsep-1.colortable-colsep-1.colorize.c-default-default').find('.infobox-data').find('b').text(),
        name: $('#mw-content-text p b').text(),
        imgUrl: $('.infobox-image img').attr('src'),
        attr: tr1.eq(1).find('.cl-badge').length == 1 ? [tr1.eq(1).find('.cl-badge').text()]: [tr1.eq(1).find('.cl-badge').eq(0).text(), tr1.eq(1).find('.cl-badge').eq(1).text()],
        character: tr1.eq(2).find('td').eq(1).text(),
        hideCharacter: tr1.eq(3).find('td').eq(1).text(),
        height: tr1.eq(5).find('td').eq(1).text(),
        weight: tr1.eq(6).find('td').eq(1).text(),
        raceValue: {
          hp: tr1.eq(8).find('.c-stat-hp').text(),
          atk: tr1.eq(9).find('.c-stat-at').text(),
          def: tr1.eq(10).find('.c-stat-df').text(),
          sAtk: tr1.eq(11).find('.c-stat-sa').text(),
          sDef: tr1.eq(12).find('.c-stat-sd').text(),
          speed: tr1.eq(13).find('.c-stat-sp').text()
        },
        week: tr1.find('table').find('tr').eq(1).text().split('\n').filter(d => d)
      }
      // week 数组排列为：
      // 一般 格斗 飞行 毒 地面 岩石 虫 幽灵 钢 火 水 草 电 超能 冰 龙 恶 妖精
      pokemonList.push(pokemon)
      success++
      console.log(success)
      if (success > 150) {
        saveDate('data/pmList.json', pokemonList)
      } else {
        count--
        goSearch()
      }
    }
  })
}

function saveDate(path, data) {
  // 使用fs.writeFile保存在本地
  fs.writeFile(path, JSON.stringify(data, null, 4), function (err) {
    if(err) return console.log(err)
    console.log('Data saved')
  })
}