import React from 'react'
import { Divider, Button, Space } from 'antd'
import 'antd/dist/antd.css'
import '../../App.css';

const Compress = (props) => {
    return (
        <>
            <div className="header-container">
                <h1 className="header">Welcome to my Converter!</h1>
            </div>
            <Divider />
            <div className="content-container">
                <div className="content">
                    This simple converter allows you to easily convert your image format to jpeg, png, and gif. You can also compress your image to a desired size!
                </div>
                <Space>
                    <Button type="primary" size="large" onClick={() => props.setSelected(2)}>Convert</Button>
                    <Button type="primary" size="large" onClick={() => props.setSelected(3)}>Compress</Button>
                </Space>
            </div>
        </>
    )
}

export default Compress
