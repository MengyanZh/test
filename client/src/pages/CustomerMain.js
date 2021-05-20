import {useState, useEffect} from 'react';
import axios from "../commons/axios"
import LeafletMap  from '../components/LeafletMap.js';
import Header from '../components/Header';
import './main.css';


export default function CustomerMain(props) {


    const [orders, setOrders] = useState([]);
    const [snacks, setSnacks] = useState([]);


    useEffect(() => {
        if(props.location.state.customer){
            
            console.log(props.location.state.position)
            console.log(props.location.state.vendor)
            axios.get('/order?customer=' + props.location.state.customer.id).then(response => {
                setOrders(response.data.allOrders)
            })
        }
        axios.get('/snack').then(response => {
            setSnacks(response.data.snacks)
        })
        
    }, [props.location.state.position, props.location.state.vendors, props.location.state.customer]); 
    
    

    console.log(props.location.state.position)
    return (
        <>
            <Header id = {props.location.state.customer.id}
                    customer = {props.location.state.customer}
                    orders =  {orders}/>
            <LeafletMap center = {props.location.state.position}
                        vendors = {props.location.state.vendors}
                        snacks={snacks}
                        customer={props.location.state.customer}
                        />
        </>
    )

    
}
