const Joi = require('joi')

// 定义验证规则
const schema = {
    username: Joi.string().min(2).max(5).Error('username err')
}



async function run() {
    try {
        // 验证
        await Joi.validate({username:'a'}, schema)
    }catch (e) {
        console.log(e)
        return
    }
    console.log('验证通过')
}

run()