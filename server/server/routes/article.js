var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose')
var Article = require('../models/article')
var Users = require('../models/user')
const formidable = require('formidable')
const path = require('path')

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


router.post('/upload', async (req, res, next) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm()
    // 配置上传文件的存放位置\
    form.uploadDir = path.join(__dirname, '../', 'public', 'uploads')
    // 保留上传文件的后缀
    form.keepExtensions = true
    // 解析表单
    form.parse(req, (err, fields, files) => {
        // err错误信息
        // field 存储普通请求参数
        // files存储上传的文件信息
    })
})

// 添加文章
router.post('/addarticle',async (req, res, next) => {
    const {
        title,
        author,
        publishDate,
        cover,
        content,
        md
    } = req.body
    let article = await Article.find()
    Article.create(req.body)
    res.json({
        status: "200",
        msg: '添加文章成功',
        result: article
    })
})

//获取文章列表 分页
router.get('/articles', async (req, res, next) => {
    const pagenum = parseInt(req.param('pagenum'))
    const pagesize = parseInt(req.param('pagesize'))
    // 查询用户数据的总数
    let count = await Article.countDocuments({})
    // 总页数
    let total = parseInt(Math.ceil(count / pagesize))
    // 页码对应的数据查询开始位置
    let start = (pagenum - 1) * pagesize
    // 查询数据库
    let article = await Article.find().limit(pagesize).skip(start)
    if (article) {
        res.json({
            status: '200',
            msg: '查询成功',
            result:{
                article,
                total: count
            }
        })
    } else {
        res.json({
            status: '400',
            msg: '查询失败'
        })
    }
})

// 根据id查询文章
router.get('/article', async (req, res, next) => {
    const _id = req.query._id
    const article = await Article.findOne({_id: _id})
    if (article) {
        res.json({
            status: '200',
            msg: '查询用户成功',
            result:{
                article,
            }
        })
    } else {
        res.json({
            status: '400',
            msg: '查询用户失败'
        })
    }
})

// 根据id修改文章
router.post('/editarticle', async (req, res, next) => {
    const {title, content, _id, md, userid} = req.body
    let aduser = await Users.findOne({_id: userid})
    if (aduser.role !== 'admin') {
        return res.json({
            status: '1',
            msg: '用户权限不够'
        })
    } else if (aduser.role === 'admin') {
        let articles = await Article.updateOne({_id: _id}, {
            title: title,
            content: content,
            md: md
        })
        if (articles) {
            res.json({
                status: '200',
                msg: '修改文章成功',
                result:{
                    articles,
                }
            })
        } else {
            res.json({
                status: '400',
                msg: '修改文章失败'
            })
        }
    }
})

//根据id删除文章
router.get('/delete', async (req, res, next) => {
    const id = req.param('id')
    const userid = req.param('userid')
    let aduser = await Users.findOne({_id: userid})
    if (aduser.role !== 'admin') {
        return res.json({
            status: '1',
            msg: '用户权限不够'
        })
    } else if (aduser.role === 'admin') {
        let article = await Article.findOneAndDelete({_id: id})
        if (article) {
            res.json({
                status: '200',
                msg: '删除用户成功',
                result:''
            })
        } else {
            res.json({
                status: '400',
                msg: '删除用户失败'
            })
        }
    }
})

module.exports = router;