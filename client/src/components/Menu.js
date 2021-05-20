import React, {useState} from 'react'
import {Divider, InputNumber, Card, message} from 'antd';
import {Marker} from 'react-leaflet';
import {Modal, Button} from 'react-bootstrap';
import axios from '../commons/axios';
import {Icon} from "leaflet";
import {useHistory} from 'react-router-dom';

import image from '../icons/location-pin.png';
import { formatCountdown } from 'antd/lib/statistic/utils';


const {Meta} = Card;
//add comment

export default function Menu(props){

    const vendorIcon = new Icon({
        iconUrl: image,
        iconSize: [30,30]
    })

    const[order, setOrder] = useState([]);
    const[modalVisible, setModalVisible]= useState(props.modalVisible);
    const handleModalShow = () => setModalVisible(true);
    const handleModalClose = () => setModalVisible(false);

    const onChange = (index, event) => {
        let newArray = [...order];
        newArray[index] = event;
        setOrder(newArray);

    }

    let history = useHistory();


    const onSubmit = () => {
        if (!props.customer){

            message.error("You need to login to place order!")
            history.goBack()

        }else{
            var submitOrder = []
        
            for (var i = 0; i < order.length; i++){
                if(Number.isFinite(order[i])){
                    submitOrder.push({
                        "name":props.snacks[i].name,
                        "qty":order[i]
                    })
                }
            }
            if (submitOrder.length ===0){
                setModalVisible(false)
                message.error("You need to enter more than one snack!")

            }else{
                axios.post('/order/create',{
                    customer:props.customer.id,
                    vendor: props.vendor.id, //will be changed in the future
                    snacks: submitOrder
                }).then(response =>{
                    if(response.data.success){
                        message.success("Order has been placed!")
                        setModalVisible(false)
                    }else{
                        message.error("Order placing errored!")
                    }
                })
            }
            
        }
        
    }

    return(
        <>
           <Marker key={props.id} position={props.position} icon={vendorIcon}
                eventHandlers={{ click : handleModalShow }}>

            </Marker>
            {}
            <Modal show={modalVisible} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My cart </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.snacks.map((snack, index) =>(
                        <Card cover={<img alt="example" src={snack.image} />}style={{marginBottom:"2vh"}}size={"small"} key={snack._id}>
                            <Meta
                                title={snack.name + "    " + snack.price}
                            />
                            <Divider style={{borderWidth:5, borderColor: '#593e34' }} plain>
                            </Divider>
                            <Meta
                                description={snack.detail}
                            />
                            <InputNumber key ={snack._id} min={0} defaultValue={0} style ={{marginLeft:"80%"}} onChange={e => onChange(index, e)} />
                                
                        </Card>
                    ))}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={onSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}