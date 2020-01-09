// 创建用户集合
const mongoose = require('mongoose')
// 创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // 保证邮箱不重复
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1  禁用状态
    state: {
        type: Number,
        default: 0
    }
})

// Users.create({
//     username: 'admin',
//     email: '949145821@qq.com',
//     password: '123456',
//     role: 'admin',
//     state: 0
// }).then(() => {
//     console.log('用户创建成功')
// }).catch(() => {
//     console.log('用户创建失败')
// })

// 创建集合
module.exports = mongoose.model('User', userSchema)



