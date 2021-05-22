import React from 'react'
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'; 
import { Card, notification } from 'antd';
import { EyeOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';

import CountUp from './CountUp.js';

const { Meta } = Card;

// export default function OrderBrief(props) {
//     const snacks = props.order.snacks.map((snack) => <li key={snack.name}>{snack.name} - qty: {snack.qty}</li>);
//     const [modalVisible, setModalVisible] = useState(false);
//     const handleClose = () => setModalVisible(false);
//     const handleShow = () => setModalVisible(true);
    
//     const renderTooltip = (props) => (
//         <Tooltip id="button-tooltip" {... props}>
//             feature still in progress
//         </Tooltip>
//     );

//     const getTime = () => {
//         console.log(new Date())
//     }

//     return (
//         <div>
//             <Modal visible={modalVisible} title = {"OrderId: " + props.order._id}
//                 onOk={handleClose} onCancel= {handleClose}>
//                 <p>Vendor: {props.order.vendor._id}</p>
//                 <p>{snacks}</p >
//             </Modal>
        
//             <Card style={{ margin: "10px" }}
//                 actions={[<EyeOutlined onClick={handleShow} />,
//                     <EditOutlined onClick={getTime}/>
//                     ]}>
//                 <Meta title={"VendorId: " + props.order.vendor._id + " - " + props.order.status}/>
//                 <CountUp updatedAt={props.order.updatedAt}/>
//             </Card>
//         </div>
//     ) 
// }

export default class   extends React.Component {

    constructor(props){
        super();
        this.state = {
            modalVisible: false,
            editModalVisibale: false,
            modalBody: <> </>,
            diff: ""
        }
    }

    handleClose = () => this.setState({modalVisible: false});
    handleShow = () => this.setState({modalVisible: true});

    handleEditClose = () => this.setState({editModalVisible: false});
    handleEditShow = () => this.setState({editModalVisible: true});

    tick(){
        let now = new Date().getTime()
        let upd = Date.parse(this.props.order.updatedAt)
        this.setState({diff: ((now - upd) / 60000)})
    }

    componentDidMount(){
        this.timerID = setInterval(() => this.tick(), 1000); // updates this DOM every second
    }

    componentWillUnmount(){
        clearInterval(this.timerID); // tear down timer so that interval starts over
    }
    
    handleShowOrderDetail = () => {
        console.log(this.props.order)
    }

    handleEditOrder = () => {
        console.log(this.state.diff)
    }

    render() {
        return (
            <>
                <Modal show={this.state.modalVisible} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"OrderId: " + this.props.order._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Vendor: {this.props.order.vendor._id}</p>
                        <p>Snacks: {this.props.order.snacks.map((snack) => <li key={snack.name}>{snack.name} - qty: {snack.qty}</li>)}</p>
                    </Modal.Body>
                </Modal>
                <Card style={{margin: "10px"}} 
                actions={[<EyeOutlined onClick = {() => this.handleShow()} />, 
                <EditOutlined onClick = {() => this.handleEditOrder()}/>]}>
                    <Meta  title={this.props.order.vendor._id + " - " + this.props.order.status}/>
                    {(this.props.order.status === "fulfilled") ? "Order is fulfilled"
                        : (this.props.order.status === "completed") ? "Order is completed"
                            :<CountUp updatedAt={this.props.order.updatedAt} />}

                </Card>
            </>
        )
    }
}