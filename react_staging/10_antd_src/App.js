import React from 'react'
import { DatePicker, Button, Space } from 'antd';
import { GooglePlusOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function App() {
  return (
    <div>
      <Button type="primary">Primary Button</Button>
      <Space>
        <GooglePlusOutlined />
        <DatePicker />
        <RangePicker />
      </Space>
    </div>
  )
}
