module.exports = {
    urlParse: function (str) {
        let reg = /[?&][^?&]+=[^?&]+/g
        let arr = str.match(reg)
        console.log(arr)
        let obj = {}
        if (arr) {
            arr.forEach((item) => {
                item = item.substring(1)
                let tmp = item.split('=')
                obj[tmp[0]] = tmp[1]
            })
        }
        return obj
    }
}
