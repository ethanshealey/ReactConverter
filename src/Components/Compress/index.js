import { useState } from 'react'
import { Divider, Upload, Image, Space, Select, Button } from 'antd'
import * as imageConversion from 'image-conversion';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Dragger } = Upload
const { Option } = Select

const Home = () => {
    const [ uri, setUri ] = useState('')
    const [ filename, setFilename ] = useState('')
    const [ currentFormat, setCurrentFormat ] = useState('')
    const [ fileSize, setFileSize ] = useState(0)
    const [ compressionLevel, setCompressionLevel ] = useState('low')

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          resolve(event.target.result)
        }
        reader.readAsDataURL(file)
        setCurrentFormat(file.type.split('/')[1])
        setFilename(file.name)
        setFileSize(file.size / 1000)
    })

    const onChange = (file) => {
        if(!file) {
            setUri('')
            return
        }
        fileToDataUri(file).then(uri => setUri(uri))
    }

    const compress = () => {
        imageConversion.dataURLtoFile(uri, currentFormat).then(file => {
            let size = 0
            compressionLevel === 'low' ? size = fileSize / 1.5 : compressionLevel === 'medium' ? size = fileSize / 2 : compressionLevel === 'high' ? size = fileSize / 3 : compressionLevel === 'extreme' ? size = fileSize / 5 : size = fileSize
            console.log(size)
            imageConversion.compressAccurately(file, size).then(compressedFile => {
                imageConversion.downloadFile(compressedFile, `${filename.split('.')[0]}.compressed.${currentFormat}`)
            })
        })
    }

    return (
        <>
            <Dragger accept=".jpg,.jpeg,.png,.gif" action={onChange} multiple={false} showUploadList={false}>
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag a file to upload and compress</p>
            </Dragger>
            
            <Divider />
            { uri ? 
                <Space direction='vertical' size='middle' style={{ width: '100%', textAlign: 'center' }}>
                    <Image width="300px" src={uri} alt="img"/>
                    <div>Original filesize: {fileSize} KB</div>
                    <Space direction='horizontal'>
                        <div>Compression level: </div>
                        <Select value={compressionLevel} onChange={setCompressionLevel} style={{ width: 120 }}>
                            <Option value="low">Low</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="high">High</Option>
                            <Option value="extreme">Extreme</Option>
                        </Select>
                    </Space>
                    <Button type='primary' onClick={compress}>Compress and Download</Button>
                </Space>
                :
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: 100 }}>Waiting for file to be uploaded</p>
                </div>
            }
        </>
    )
}

export default Home
