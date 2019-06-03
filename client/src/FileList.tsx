import * as React from 'react'
import { Menu } from 'antd'

const FileList: React.FC<{
  file?: string
  onFileChange: (filename: string) => void
}> = ({ onFileChange, file = 'no-file' }) => {
  const [files, setFiles] = React.useState<string[]>([])

  React.useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch('/files')
        const data = await res.json()
        setFiles(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFiles()
  }, [])

  const handleSelectFile = (filename: string) => () => {
    onFileChange(filename)
  }
  return (
    <Menu
      selectedKeys={[file]}
      style={{ height: '100vh', maxHeight: '100vh', overflow: 'scroll' }}
    >
      {files.map(file => (
        <Menu.Item onClick={handleSelectFile(file)} key={file}>
          {file}
        </Menu.Item>
      ))}
    </Menu>
  )
}

export default FileList
