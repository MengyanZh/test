import React, {useState} from 'react'
import { PageHeader, Button, Form, Input, message } from 'antd';
import axios from '../commons/axios.js';

export default function CustomerRegister(props) {

    const [form] = Form.useForm();
    const [givenName,setGivenName] = useState('');
    const [familyName,setFamilyName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmit = () => {
        const registerBody = {
            "givenName": givenName,
            "familyName": familyName,
            "email": email,
            "password": password
        }
        axios.post('/customer/register/', registerBody).then((response) => {
            if (response.data.customer){
                message.success("customer details registered succsess")
                props.history.push('/');
            }else{
                message.error(response.data.message)
            }
        })
    }

    return (
        <>
           <PageHeader title={"Register"}></PageHeader>
           <div style={{width: '40%', margin: 'auto'}}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Given Name">
                        <Input placeholder="given name" defaultValue={givenName}
                            onChange={e => setGivenName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Family Name">
                        <Input placeholder="family name" defaultValue={familyName}
                            onChange={e => setFamilyName(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input placeholder="email" defaultValue={email}
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input placeholder="email" 
                            type = "password"
                            defaultValue={password}
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onSubmit}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
