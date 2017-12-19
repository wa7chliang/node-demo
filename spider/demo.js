var https = require('https')
var fs = require('fs')
var path = require('path')
var cheerio = require('cheerio')

var opt = {
  hostname: 'm.ac.qq.com',
  path: '/rank/index?type=pgv',
  port: 443
}

var movies = []
var teps = 1
var times = ''
var paths = '/rank/index?t=' + times + '&type=pgv&page=' + teps + '&pageSize=10&style=items'

goSearch()


function goSearch() {
  https.get(opt, function (res) {
    var html = '';
  
    res.setEncoding('utf-8')
    res.on('data', function (chunk) {
      html += chunk
    })
    res.on('end', function () {
      var $ = cheerio.load(html)
      $('.comic-item').each(function () {
        var movie = {
          title: $('.comic-title', this).text(),
          update: $('.comic-update', this).text(),
          tag: $('.comic-tag', this).text(),
          desc: $('.comic-desc', this).text(),        
          link: $('.comic-link', this).attr('href'),
          picUrl: $('.cover-image', this).attr('src')
        }
        movies.push(movie)
        // 下载图片
        downloadImg('img/', movie.picUrl)
      })
      if(teps == 10) {
        saveDate('data/data.json', movies)
      } else {
        teps++
        times = new Date().getTime()
        paths = '/rank/index?t=' + times + '&type=pgv&page=' + teps + '&pageSize=10&style=items'
        opt.path = paths;
        goSearch()
      }
      
    })
  }).on('error', function (err) {
    console.log(err)
  })
}

// 保存数据在本地
function saveDate(path, movies) {
  fs.writeFile(path, JSON.stringify(movies, null, 4), function (err) {
    if(err) return console.log(err)
    console.log('Data saved')
  })
}

// 下载图片
function downloadImg(imgDir, url) {
  https.get(url, function (res) {
    var data = ''
    var num = 0
    res.setEncoding('binary')
    res.on('data', function (chunk) {
      data += chunk
    })
    
    res.on('end', function () {
      fs.writeFile(imgDir + url.slice(url.lastIndexOf('_') + 1, url.lastIndexOf('.')) + '.png', data, 'binary', function (err) {
        if(err) return console.log(err)
        console.log('Image downloaded: ', path.basename(url))
      })
    })
  }).on('error', function (err) {
    console.log(err)
  })
}