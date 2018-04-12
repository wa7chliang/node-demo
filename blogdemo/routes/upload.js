var multer  = require('multer')
var express = require('express');
var router = express.Router();
var userModel = require('../lib/mysqlc')
var fs = require('fs')

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo1478521468943
        var ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
        cb(null, 'upload' + Date.now() + ext);
    }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

// 单图上传
router.post('/', upload.single('avatar'), function(req, res, next){
	let avatarname = req.session.user.avator
	var fileAddress = './public/images/' + avatarname
	let obj = {
		username: req.session.user.username,
		avatar: req.file.filename
	}
	userModel.modifieDataByAvatar(obj)
		.then(result => {
			if(result.affectedRows !== 0) {
				if(avatarname !== 'upload_7eb0f17c485156efad980e49259fd408.jpg') {
					fs.unlink(fileAddress)
				}
				req.session.user.avator = req.file.filename
				res.json({
					state: 1,
					msg: '修改成功'
				})
				return
			} else {
				throw new Error('修改失败')
			}
		}).catch(e => {
			res.json({
				state: 0,
				msg: e.message
			})
		})
});

module.exports = router;
