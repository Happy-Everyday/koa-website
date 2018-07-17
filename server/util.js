const consoleText = (title, content) => {
    let _title = title || 'title'
    let _content = content || 'content'
    console.log(`.......................`)
    console.log(`${_title}: ${JSON.stringify(_content)}`)
    console.log(``)
}

module.exports = {
    consoleText: consoleText 
}