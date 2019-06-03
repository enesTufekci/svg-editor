import * as React from 'react'

import { Input, Row, Col } from 'antd'

const Preview: React.FC<{ content: string }> = ({ content }) => {
  const [width, setWidth] = React.useState(128)
  const [height, setHeight] = React.useState(128)
  const [backgroundColor, setBackgroundColor] = React.useState('white')
  const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setWidth(Number(value))
  }
  const handleChangeHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setHeight(Number(value))
  }
  const handleChangeBackground = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    setBackgroundColor(value)
  }
  return (
    <div
      id="preview-wrapper"
      style={{ marginTop: '16px', textAlign: 'center' }}
    >
      <h2>Preview</h2>
      <Row gutter={16}>
        <Col span={8}>
          <label>Width</label>
          <Input
            placeholder="width"
            value={width}
            onChange={handleChangeWidth}
          />
        </Col>
        <Col span={8}>
          <label>Height</label>
          <Input
            placeholder="height"
            value={height}
            onChange={handleChangeHeight}
          />
        </Col>
        <Col span={8}>
          <label>Background Color</label>
          <Input
            type="color"
            placeholder="Background Color"
            value={backgroundColor}
            onChange={handleChangeBackground}
          />
        </Col>
      </Row>
      <div
        style={{
          width,
          height,
          backgroundColor,
          margin: '100px auto',
          border: '1px solid rgba(0,0,0,0.2)'
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default Preview
