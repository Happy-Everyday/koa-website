const consoleText = (title, content) => {
    let _title = title || 'title'
    let _content = content || 'content'
    console.log(`.......................`)
    console.log(`${_title}: ${JSON.stringify(_content)}`)
    console.log(``)
}

const formatCookie = function (cookie) {
	let cookieArr = cookie? cookie.split('; '): []
	let cookieObj = {}
	cookieArr.forEach(item => {
		let itemArr = item.split('=')
		cookieObj[itemArr[0]] = itemArr[1]
	});
	return cookieObj
}

module.exports = {
    consoleText: consoleText,
    formatCookie: formatCookie 
}