import React,{useState,useRef,useEffect } from 'react';
import { Form,Row,Col,Button } from 'react-bootstrap';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useHistory,useLocation } from "react-router-dom";
import '../css/Chat.css';

const Chat = () => {

    const location = useLocation();
    const messagesEndRef = React.createRef();
    const history = useHistory();
    const [role,setRole] = useState(location.state.role);
    const [isOnline,setIsOnline] = useState(true);
    const [conversation,setConversation] = useState("Hello \n Hi \n I'm Fenil \n");
    const [userMessage,setUserMessage] = useState('');
    const [timerId,setTimerId] = useState('');
    const [user,setuser] = useState(location.state.userName);
    const [restaurantName,setRestaurantname] = useState(location.state.restaurantName);
    const [userPublisherTopic,setUserPublisherTopic] = useState('');
    const [restaurantPublisherTopic,setRestaurantPublisherTopic] = useState('');
    

    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }

    useEffect(() => {
        scrollToBottom();
        ToggleAvailability();
    }, [conversation,isOnline]);

    function ToggleAvailability(){
        // let timerId;
        if(isOnline)
        {
            
            setUserPublisherTopic(user + "-" + restaurantName + "-" + "Publisher")
            setRestaurantPublisherTopic(restaurantName  + "-" + user + "-" + "Publisher")
            setTimerId(setInterval(() => {
                console.log('Someone Scheduled me to run every second');
                //create a rest-user-publisher
                //call the getAPI(PullMessage) of the user-rest-publisher in case of restaurant
              }, 1000)); 
        }
        else
        {
            clearInterval(timerId);
            if(role === "user")
            {
                history.push("/home");
            }
            else
            {
                history.push("/restaurantHome");
            }
        }
    }

    function getOffline(){
        //Delete the Channel
        setIsOnline(false);
    }

    function addToConversation()
    {
        //call post api(Push) of the rest-user-publisher in case of restaurant
        let prevMessages = conversation;
        prevMessages += "[You]:" + userMessage + "\n";
        setConversation(prevMessages);
        setUserMessage('');
    }

    return(
        <div className="outer">
            <div className="icon">
                <div className="inner" style={{width:"70%"}}>
                    <Form.Control className="textarea" as="textarea" disabled={false} value={conversation} ref={messagesEndRef} />
                    <div className="footer" >
                        <input type="text" style={{height:"47px",width:"800px"}} value={userMessage} onChange={(e)=>setUserMessage(e.target.value)}></input>
                        <ArrowRightSquareFill style={{marginLeft: '0.15rem'}} onClick={()=>addToConversation()} size={50}/>
                    </div>
                </div>
                <Button className="button" onClick={()=>{getOffline()}} variant="danger">
                    Offline
                </Button>
            </div>
        </div>
    );

}


export default Chat;