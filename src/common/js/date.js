let appendNum = (str) => {
    return ('00' + str).substring(str.length)
}
module.exports = function DateFormat (date, fmt) {
    if (/(y+)/.test(fmt)) {
       fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
    }
    let map = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let i in map) {
        if (new RegExp(`(${i})`).test(fmt)) {
            let str = map[i] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : appendNum(str))
        }
    }
    return fmt
}
