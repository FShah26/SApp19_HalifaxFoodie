import React,{useState,useRef,useEffect } from 'react';
import { Form,Row,Col,Button } from 'react-bootstrap';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useHistory,useLocation } from "react-router-dom";
import '../css/Chat.css';
import axios from 'axios';
import { USER_PROFILE } from '../../Utils/AccountUtils';
import { Spinner } from "react-bootstrap";

const Chat = () => {

    const location = useLocation();
    const messagesEndRef = React.createRef();
    const history = useHistory();
    const [role,setRole] = useState(location.state.role);
    const [isChatInitiated,setIsChatInitiated] = useState(false);
    const [isOnline,setIsOnline] = useState(true);
    const [conversation,setConversation] = useState('');
    const [userMessage,setUserMessage] = useState('');
    const [timerId,setTimerId] = useState('');
    const [user,setuser] = useState(location.state.userName);
    const [restaurantName,setRestaurantname] = useState(location.state.restaurantName);
    const [pulledMessage,setPulledMessage] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    

    const scrollToBottom = () => {
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
      }

    useEffect(() => {
        //initiateChat
        if(!isLoading)
        {
            scrollToBottom();
        }
        if(!isChatInitiated)
        {
            (role === USER_PROFILE ? initiateChat() : checkConnectionRequest());
        }
        if(pulledMessage.length>0)
        {
            addToConversation(true);
        }
        if(!isOnline)
        {
            ToggleAvailability();
        }
    }, [pulledMessage,isOnline]);

    function ToggleAvailability(){
        // let timerId;
        console.log("Inside ToggleAvailability",isOnline);
        if(isOnline)
        {           
            setTimerId(setInterval(() => {
                // console.log('Someone Scheduled me to run every second');
                //create a rest-user-publisher
                //call the getAPI(PullMessage) of the user-rest-publisher in case of restaurant
                pullMessage();
              }, 10000)); 
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

    async function checkConnectionRequest()
    {
        setIsLoading(true);
        // console.log(restaurantName);      
        var url = `http://www.localhost:3000/checkChatInitiation/${restaurantName}`;
        await axios({
            method:"get",
            url: url
        })
        .then((response)=>{
            console.log(response);
            if(response.data.status)
            {
                setuser(response.data.user);
                setIsChatInitiated(true);
                // setIsOnline(true);
                ToggleAvailability();
                setIsLoading(false);                
            }
            else
            {
                history.push("/restaurantHome");
            }
            alert(response.data.message);
        })
        .catch((error)=>{
            console.log(error);
            setIsLoading(false);
        });

    }

    async function initiateChat()
    {
        let uname = (role === USER_PROFILE ? user.split('@')[0] : user);
        await axios({
            method:"post",
            url:"http://www.localhost:3000/initiateChat",
            data:{
                "user":uname,
                "restaurant":restaurantName,
            }
        })
        .then((response)=>{
            console.log("initiateChat",response);
            if(response.data.status)
            {
                //stop the loader
                setIsChatInitiated(true);
                // setIsOnline(true);
                ToggleAvailability();
                setIsLoading(false);
            }
            alert(response.data.message);
        })
        .catch((error)=>{
            //stop the loader
            alert(error);
            setIsLoading(false);
        });
    }

    async function pushMessage()
    {
        await axios({
            method:"post",
            url:"http://www.localhost:3000/pushMessage",
            data:{
                "role":role,
                "message":userMessage
            }
        })
        .then((response)=>{
            // alert(response);
        })
        .catch((error)=>{
            alert(error);
        });
    }

    async function pullMessage()
    {
        await axios({
            method:"get",
            url:"http://www.localhost:3000/getMessage",
            params:{
                "role":role
            }
        })
        .then((response)=>{
            console.log(response);
            if(response.data.length > 0)
            {
                console.log("PullMessage",response.data[0].Message);
                setPulledMessage(response.data[0].Message);
                addToConversation(true);
            } 
        })
    }


    async function disconnectChat(){
        setIsLoading(true);
        setIsOnline(false);
        if(role === USER_PROFILE)
        {
            await axios({
                method:"delete",
                url:"http://www.localhost:3000/disconnectChat"
            }).then((response)=>{
                console.log("disconnectChat",response);
                if(response.status)
                {
                    alert(response.message);
                    // ToggleAvailability();
                    setIsLoading(false);
                    history.push("/home");
                }
            }).catch((error)=>{
                alert(error);
                setIsLoading(false);
            });
        }
        else
        {
            if(!isOnline)
            {
                setIsLoading(false);
            // setIsOnline(false);
                history.push("/restaurantHome");
            }
        }
    }


    // function getOffline(){
    //     //Delete the Channel
    //     setIsOnline(false);
    // }

    function addToConversation(fromOtherUser)
    {
        let prefix = fromOtherUser ? "[" + (role === USER_PROFILE ? restaurantName : user) + "]:" : "[You]:";
        let prevMessages = conversation;
        console.log("Conversation",conversation);
        if(!fromOtherUser)
        {
            pushMessage();
            prevMessages += prefix + userMessage + "\n";
            setConversation(prevMessages);
            setUserMessage('');
        }
        else
        {
            if(pulledMessage.length > 0)
            {
                prevMessages += prefix + pulledMessage + "\n";
                console.log("prevMessage before clearing",prevMessages);
                setConversation(prevMessages);
                setPulledMessage('');            
            }
        }        
        console.log("PreviousMessage",prevMessages);
                
    }

    return(
        <div className="outer">
            <div className="icon">
                { isLoading ? 
                <Spinner animation="border" size="lg" style={{display:'flex',justifyContent:'flex-center', visibility:(isLoading ? "visibile" : "collapse") }} /> 
                :
                // return(
                    <div className="inner" style={{width:"70%"}}>
                    <Form.Control className="textarea" as="textarea" disabled={false} value={conversation} ref={messagesEndRef} />
                    <div className="footer" >
                        <input type="text" style={{height:"47px",width:"800px"}} value={userMessage} onChange={(e)=>setUserMessage(e.target.value)}></input>
                        <ArrowRightSquareFill style={{marginLeft: '0.15rem'}} onClick={()=>addToConversation(false)} size={50}/>
                    </div>
                    </div>
                // );
                }
                <Button className="button" onClick={()=>{disconnectChat()}} variant="danger">
                    Offline
                </Button>
            </div>
        </div>
    );

}


export default Chat;