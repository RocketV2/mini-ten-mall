const md5 = require("md5")

// 生成sign，md5加密

// 第一步 参数按字母a-z属性排列
function sortParams(unordered){
    let ordered = {};
    Object.keys(unordered).sort().forEach(key => {
        ordered[key] = unordered[key]
    })
    return ordered;
}

// 连接字符串 首尾加上client_secret
function concatStr(objStr){
    // 多多进宝 应用的secret
    const client_secret = "71f381c2d6599a0212e9224a70bd5efdc0c723c5";
    let str = client_secret;
    for(key in objStr){
        str += (key+objStr[key])
    }
    str = str + client_secret; // 尾部添加secret
    return str;
}

// md5加密 生成sign
function createSign(params){
    let sign = md5( concatStr( sortParams(params) ) )
    return sign.toLocaleUpperCase()
}

module.exports = {
    createSign,
}
