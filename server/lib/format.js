const formatCookie = function (cookie) {
	let cookieArr = cookie.split('; ')
	let cookieObj = {}
	cookieArr.forEach(item => {
		let itemArr = item.split('=')
		cookieObj[itemArr[0]] = itemArr[1]
	});
	return cookieObj
}

module.exports = {
	formatCookie: formatCookie
}