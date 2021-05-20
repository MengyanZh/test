
import React, {useState, useMemo} from 'react'
import {useHistory} from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Button, Form, Modal} from 'react-bootstrap';
import {message} from 'antd';
import Menu from './Menu.js';
import axios from "../commons/axios"

export default function LeafletMap(props) {
    let history = useHistory();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [address, setAddress] = useState('');

    const [position, setPosition] = useState(props.center)
    const eventHandlers = useMemo(
        (e)=> ({
            dragend(e){
                console.log(e.target.getLatLng())
                setPosition(e.target.getLatLng())
            },
            click(){
                handleShow()
            }
        }),
        [],
    )

    const onPark = () =>{
        console.log(props.vendor.id, position.lat, position.lng)
        axios.post('/vendor/park/' + props.vendor.id, {
            location: [position.lat, position.lng],
            textAddress: address
        }).then(response=>{
            message.success("vendor successfully parked")
            history.push({pathname: '/orders', state: {vendor: props.vendor}})
        })
    }

    const renderFiveVendors = props.vendors.map((vendor)=>{
        return (
            <Menu key={vendor.id}
            position = {vendor.location}
            snacks = {props.snacks}
            vendor = {vendor}
            customer = {props.customer} />
        )
    })

    const renderCustomerMarker = (
        <Marker position = {props.center} iconUrl = {'https://static.thenounproject.com/png/780108-200.png'}>
            <Popup>Your location</Popup>
        </Marker>
    )

    const renderVendorMarker = (
        <Marker
        draggable = {true}
        eventHandlers = {eventHandlers}
        position = {position}>
        </Marker>
    )

 
    return (
        <>
            <Modal show = {show} onHide = {handleClose} style = {{marginTop: '2vh'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Vendor Park</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Detailed Text address</Form.Label>
                            <Form.Control type="text" placeholder="Enter address"
                                onChange={e => setAddress(e.target.value)} />
                            <Form.Text className="text-muted">
                                Plases enter the detailed address
                            </Form.Text>  
                        </Form.Group>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onPark}>
                    Submit
                </Button>
            </Modal.Footer>
            </Modal>



            <MapContainer center={props.center} zoom={18} scrollWheelZoom={false} style={{height: "90vh"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    
                />
                {(history.location.pathname ==='/vendor') ? renderVendorMarker : <></>}
                {(history.location.pathname ==='/customer') ? renderCustomerMarker : <></>}
                {(history.location.pathname ==='/customer') ? renderFiveVendors : <></>}
            </MapContainer>
        </>
    )
}
