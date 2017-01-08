const path = require('path')
const express = require('express')
const app = express()
const multer = require('multer')

const port = process.env.PORT || 3000
const uploadDir = process.env.UPLOAD_DIR || (() => { throw new Error('Must define an upload directory') })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const uploading = multer({
  'dest': uploadDir,
  'limits': { 'fileSize': 2e7 },
})

app.post('/', uploading.array('ebooks'), (req, res) => {
  console.log(`${new Date()} Uploaded ${req.files.length} files: ${(req.files || []).map(f => f.originalname).join(', ')}`);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log(`ePub uploader listening on port ${port}`)
});
