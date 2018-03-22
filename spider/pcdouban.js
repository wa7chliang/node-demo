// 并发控制抓取豆瓣动画信息
const async = require('async')
const axios = require('axios')
var fs = require('fs')

var arr = [{sort: "T",range: "0,10",tags: "动画,大陆",start: 0},
{sort: "T",range: "0,10",tags: "动画,美国",start: 0},
{sort: "T",range: "0,10",tags: "动画,香港",start: 0},
{sort: "T",range: "0,10",tags: "动画,台湾",start: 0},
{sort: "T",range: "0,10",tags: "动画,日本",start: 0}]


var resArr = []
let count = 0

// 使用async.mapLimit控制并发,并发数为3
async.mapLimit(arr, 3, function (obj, callback) {
  axios.get('https://movie.douban.com/j/new_search_subjects', {
		params: obj
	}).then((res) => {
		res.data.tags = obj.tags.substring(3)
		res.data.data.forEach(function(item) {
			item.tags = obj.tags.substring(3)
		})
		callback(null, res.data) //把内容返回
	}).catch((e) => {
		console.log(e)
	})
}, function (err, result) { //result为callback返回的值所组成的数组
  console.log('final:'); 
  saveDate('data/doubanlist.json', result) //利用fs保存到指定目录中
});

function saveDate(path, movies) {
  // 使用fs.writeFile保存在本地
  fs.writeFile(path, JSON.stringify(movies, null, 4), function (err) {
    if(err) return console.log(err)
    console.log('Data saved')
  })
}