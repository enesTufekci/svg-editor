import * as React from 'react'
import { Row, Col, Button, message } from 'antd'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

import './edit.css'

const Edit: React.FC<{
  filename?: string
  onContentChange: (content: string) => void
}> = ({ filename, onContentChange }) => {
  const [content, setContent] = React.useState('')
  React.useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const res = await fetch(`/files/${filename}`)
        const content = await res.text()
        setContent(content)
        onContentChange(content)
      } catch (error) {
        console.log(error)
      }
    }
    if (filename) {
      fetchFileContent()
    }
  }, [filename])

  const handleContentChange = (content: string) => {
    setContent(content)
    onContentChange(content)
  }

  const handleFileSave = async () => {
    try {
      const res = await fetch(`/files/${filename}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          content,
          filename
        })
      })
      if (res.ok) {
        message.success('File saved')
      }
    } catch (error) {
      message.error('Something went wrong')
    }
  }

  return (
    <div>
      <Row gutter={16} style={{ marginTop: '16px' }}>
        <Col span={20}>
          <h2>Edit</h2>
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Button onClick={handleFileSave} disabled={!filename}>
            Save
          </Button>
        </Col>
      </Row>
      <Editor
        value={content}
        onValueChange={handleContentChange}
        highlight={(code: string) => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12
        }}
      />
    </div>
  )
}

export default Edit
