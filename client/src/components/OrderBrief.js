import React, { useState } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'; 
import { Card, Modal } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

const { Meta } = Card;
 
export default function OrderBrief(props) {
    const snacks = props.order.snacks.map((snack) => 
        // form for each order info 
        <li key={snack.name}>{snack.name} - quantities: {snack.qty}
        </li>
    );
    const [modalVisible, setModalVisible] = useState(false);

    const handleClose = () => setModalVisible(false);
    const handleShow = () => setModalVisible(true);

    // this feature is not designed for this stage
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {... props}>
            Sorry, this is still in working~
        </Tooltip>
    );

    // representation 
    return (
        <div>

            {/* each order should include order id, vendor id and list of snacks */}
            <Modal visible={modalVisible} title = {"Order Id: " + props.order._id}
                onOk={handleClose} onCancel= {handleClose}>
                <p>Vendor: {props.order.vendor._id}</p>
                <p>{snacks}</p >
            </Modal>
        
            <Card style={{ margin: "10px" }}
                actions={[<EyeOutlined onClick={handleShow} />, <OverlayTrigger
                    placement="bottom"
                    delay={{show: 250, hide: 408 }}
                    overlay= {renderTooltip}
                >
                    <EditOutlined/>
                </OverlayTrigger>]}>

                {/* show status of order on card  */}
                <Meta title={props.order._id + " - " + props.order.status}/>
            </Card>
        </div>
    )
}