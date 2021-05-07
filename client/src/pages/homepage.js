import 'antd/dist/antd.css';
import '../pages/main.css';
import LeafletMap  from '../components/LeafletMap.js';
import {PageHeader} from 'antd';


export default function CustomerMain(props) {
    //homepage
    //vendor and customer infomation need to be catched
    return (
        <>
            <PageHeader title = {"Welcome, please select your today's vendor for pick up :)"}>
            </PageHeader>
            <LeafletMap center = {props.location.state.position}
                        vendors = {props.location.state.vendors}
                        customer = {props.location.state.customer}
                        />
        </>
    )
}   