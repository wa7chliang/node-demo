var multer  = require('multer')
var express = require('express');
var router = express.Router();

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
router.post('/', upload.single('logo'), function(req, res, next){
    var file = req.file;
});

module.exports = router;
