const marked = require('marked')
const ejs = require('ejs')
const fs = require("fs")

const markdownPath = './posts/2022.md'
const templatePath = './theme/template/main.ejs'
const outputPath = './public/index.html'

const getMarkdownString = function (markdownPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(markdownPath, function (err, data) {
            if (err) {
                console.log('Markdown 读取失败')
                reject(err)
            }
            else {
                console.log("Markdown 读取成功")
                console.log(data.toString())
                resolve(data.toString())
            }
        });
    })

}

const parseMarkdown = function (markdownString) {
    try {
        let markHTML = marked.parse(markdownString)
        console.log('Parse markdown ok')
        console.log(markHTML)
        return Promise.resolve(markHTML)
    } catch (error) {
        console.log('Parse markdown error')
        return Promise.reject(error)
    }

}

const renderTemplate = function (fromTemplatePath, markdownHTML) {

    let renderConfig = {
        markdownHTML: markdownHTML
    }
    return new Promise(function (resolve, reject) {
        ejs.renderFile(fromTemplatePath, renderConfig, {}, function (err, outputHTML) {
            if (err) {
                console.log('Render file with ejs error')
                console.log(err)
                reject(err)
            }
            else {
                console.log('Render file with ejs ok')
                console.log(outputHTML)
                resolve(outputHTML)
            }
        });
    })

}


const writeHTMLFile = function (outputPath, outputHTML) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(outputPath, outputHTML, 'utf-8', (err) => {
            if (err) {
                console.log(err)
                reject(err)

            }
            else {
                console.log('ok')
                resolve(true)
            }
        })
    })

}

const main = async function () {
    getMarkdownString(markdownPath)
        .then(markdownString => {
            return parseMarkdown(markdownString)
        })
        .then(markdownHTML => {
            return renderTemplate(templatePath, markdownHTML)
        })
        .then(outputHTML => {
            return writeHTMLFile(outputPath, outputHTML)
        }).catch(err => {
            console.log(err)
        })
}

main()


