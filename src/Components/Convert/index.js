import { useState } from 'react'
import { Divider, Upload, Image, Space, Select, Button } from 'antd'
import * as imageConversion from 'image-conversion';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Dragger } = Upload
const { Option } = Select

const Convert = () => {

    const [ uri, setUri ] = useState('')
    const [ filename, setFilename ] = useState('')
    const [ currentFormat, setCurrentFormat ] = useState('')
    const [ newFormat, setNewFormat ] = useState('')

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          resolve(event.target.result)
        }
        reader.readAsDataURL(file)
        setCurrentFormat(file.type)
        setFilename(file.name)
    })

    const onChange = (file) => {
        if(!file) {
            setUri('')
            return
        }
        fileToDataUri(file).then(uri => setUri(uri))
    }

    const convert = () => {
        imageConversion.dataURLtoFile(uri, newFormat).then(file => {
            imageConversion.downloadFile(file, `${filename.split('.')[0]}.converted.${newFormat}`)
        })
    }

    return (
        <>
            <Dragger accept=".jpg,.jpeg,.png,.gif" action={onChange} multiple={false} showUploadList={false}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag a file to upload and convert</p>
            </Dragger>
            
            <Divider />
            { uri ? 
                <Space direction='vertical' size='middle' style={{ width: '100%', textAlign: 'center' }}>
                    <Image width="25%" src={uri} alt="img"/>
                    <Space direction='horizontal'>
                        <div>Convert to: </div>
                        <Select placeholder="Choose a format" value={newFormat} onChange={setNewFormat} style={{ width: 120 }}>
                            <Option value="jpeg" disabled={currentFormat.split('/')[1] == 'jpeg' || currentFormat.split('/')[1] == 'jpg'}>JPEG</Option>
                            <Option value="png" disabled={currentFormat.split('/')[1] == "png"}>PNG</Option>
                            <Option value="gif" disabled={currentFormat.split('/')[1] == "gif"}>GIF</Option>
                        </Select>
                        <Button type='primary' onClick={convert}>Go</Button>
                    </Space>
                </Space>
                :
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 100 }}>Waiting for file to be uploaded</p>
                </div>
            }
        </>
    )
}

export default Convert
