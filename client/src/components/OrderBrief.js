import React, { useState } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'; 
import { Card, Modal } from 'antd';
import { EyeOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';

import CountUp from './CountUp.js';

const { Meta } = Card;

export default function OrderBrief(props) {
    const snacks = props.order.snacks.map((snack) => <li key={snack.name}>{snack.name} - qty: {snack.qty}</li>);
    const [modalVisible, setModalVisible] = useState(false);
    const handleClose = () => setModalVisible(false);
    const handleShow = () => setModalVisible(true);
    
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {... props}>
            feature still in progress
        </Tooltip>
    );

    const getTime = () => {
        console.log(new Date())
    }

    return (
        <div>
            <Modal visible={modalVisible} title = {"OrderId: " + props.order._id}
                onOk={handleClose} onCancel= {handleClose}>
                <p>Vendor: {props.order.vendor._id}</p>
                <p>{snacks}</p >
            </Modal>
        
            <Card style={{ margin: "10px" }}
                actions={[<EyeOutlined onClick={handleShow} />,
                    <EditOutlined onClick={getTime}/>
                    ]}>
                <Meta title={"VendorId: " + props.order.vendor._id + " - " + props.order.status}/>
                <CountUp updatedAt={props.order.updatedAt}/>
            </Card>
        </div>
    ) 
}