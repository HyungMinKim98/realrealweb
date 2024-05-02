import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';


const { TextArea } = Input;
const { Title } = Typography;


const PrivateOptions = [
    {value: 0, label: "Private" },
    {value: 1, label: "Public" }
]

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"}
]

function DiaryUploadPage(props) {
    const user = useSelector(state => state.user);
    const [DiaryTitle, setDiaryTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film % Animation")
   

    const onTitleChange = (e) => {
        setDiaryTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChage = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/diary/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)

                   



                } else{
                    alert('다이어리 업로드를 실패했습니다!')
                }
            }) 
                           


    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            title: DiaryTitle,
            description: Description,
            privacy: Private,
            category: Category,

        }

        Axios.post('/api/diary/uploadDiary', variables)
            .then(response => {
                if(response.data.success) {

                    message.success('성공적으로 업로드를 했습니다!')

                    setTimeout(()=>{
                        props.history.push('/')

                    }, 3000);

                    
                    
                } else {
                    alert('다이어리 업로드에 실패했습니다!')
                }
            })
    }


    return(
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Diary</Title>
            </div>
                
            <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/*dropzone */}

                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={1000000000}
                    >

                    {({ getRootProps, getInputProps}) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                        alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem'}} />
                        </div>  
                    )}




                    </Dropzone>

                    
                </div>

        <br />
        <br />
        <label>Title</label>
        <Input
            onChange={onTitleChange}
            value={DiaryTitle}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
            onChange={onDescriptionChange}
            value={Description}
        />
        <br />
        <br />

        <select onChange={onPrivateChage}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
        </select>

        <br />
        <br />                
        <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (                       
                        <option key={index} value={item.value}>{item.label}</option>

                    ))}

        </select>
        <br />
        <br />                    
        <Button type="primary" size="large" onClick={onSubmit}>
            Submit
        </Button>


            </Form>
        
        </div>
    )
}

export default DiaryUploadPage