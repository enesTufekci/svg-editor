require('dotenv').config()

const Express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const app = Express()

const ICONS_DIR = process.env.DIR_PATH

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/files', (req, res) => {
  const folder = path.join(ICONS_DIR)
  try {
    const files = fs.readdirSync(folder)
    return res.json(files)
  } catch (error) {
    return res.statusCode(500)
  }
})

app.get('/files/:fileName', (req, res) => {
  const fileName = req.params.fileName
  const filePath = path.join(ICONS_DIR, fileName)
  const content = fs.readFileSync(filePath)
  res.send(content)
})

app.post('/files/:fileName', (req, res) => {
  const currentFilename = req.params.fileName
  const { content, filename } = req.body
  const currentFilePath = path.join(ICONS_DIR, currentFilename)
  if (filename !== currentFilename) {
    const filePath = path.join(ICONS_DIR, filename)
    fs.writeFile(filePath, content, err => {
      if (err) {
        return res.statusCode(500)
      }
      fs.unlink(currentFilePath, err => {
        if (!err) {
          return res.json({ status: 'ok' })
        }
        return res.statusCode(500)
      })
    })
  } else {
    fs.writeFile(currentFilePath, content, err => {
      if (!err) {
        return res.json({ status: 'ok' })
      }
      return res.statusCode(500)
    })
  }
})

app.listen(8091, () => {
  console.log('xxx')
})
