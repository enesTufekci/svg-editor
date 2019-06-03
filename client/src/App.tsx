import React from 'react'
import { Row, Col } from 'antd'

import FileList from './FileList'
import Edit from './Edit'
import Preview from './Preview'

function App() {
  const [selectedFile, setSelectedFile] = React.useState<string>()
  const [content, setContent] = React.useState<string>('')

  const handleFileChange = (file: string) => {
    setSelectedFile(file)
  }

  const handleContentChange = (content: string) => {
    setContent(content)
  }

  return (
    <div className="App">
      <Row gutter={16}>
        <Col span={4}>
          <FileList file={selectedFile} onFileChange={handleFileChange} />
        </Col>
        <Col span={10}>
          <Edit onContentChange={handleContentChange} filename={selectedFile} />
        </Col>
        <Col span={10}>
          <Preview content={content} />
        </Col>
      </Row>
    </div>
  )
}

export default App
