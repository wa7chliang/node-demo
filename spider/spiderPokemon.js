const axios = require('axios')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

// 爬虫的URL信息
var opt = {
  hostname: 'http://www.pokemon.name',
  path: '/wiki/%E4%B8%BB%E9%A2%98:%E5%AE%9D%E5%8F%AF%E6%A2%A6',
  port: 443
}

var pokemonList = []
goSearch(opt)

function goSearch (obj) {
  axios.get(obj.hostname + obj.path)
    .then(res => {
      if (res.status == 200) {
        let html = res.data
        var $ = cheerio.load(html)
        $(".c-gen-1 tr td ul li").each(function () {
          var pokemon = {
            no: $(this).text().split('.')[0].trim(),
            pkName: $("a", this).text(),
            url: opt.hostname + $("a", this).attr('href')
          }
          pokemonList.unshift(pokemon)
        })
        saveDate('data/pokemonList.json', pokemonList)
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