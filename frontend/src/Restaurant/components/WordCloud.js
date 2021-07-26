import React,{useEffect,useState} from 'react';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const WordCloud = ({menuItemId,orderData}) => {

  // const { menuItemId} = useParams();
  const [words,setWords] = useState([]);
  const [isLoading,setIsLoading] = useState(true);


  useEffect(()=>{
    // console.log(menuItemId);
    if(menuItemId > 0)
    {
      getFeedbacks(menuItemId);
    }
    if(orderData.length > 0)
    {
      console.log("InWordCloud",orderData);
      setWords(orderData);
      setIsLoading(false);
    }
    
  },[]);


  const callbacks = {
    // getWordColor: word => word.value > 15 ? "green" : "red",
    // onWordClick: console.log,
    // onWordMouseOver: console.log,
    // getWordTooltip: word => `${word.text} (${word.value})`,
  }
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    rotations: 1,
    rotationAngles: [0],
    enableTooltip: true,
    fontSizes: [20, 50],
    fontFamily: "impact",
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    spiral: "archimedean",
    transitionDuration: 1000
    
  };
  let size = [500,300];
  if(orderData.length>0)
  {
    size = [700, 500];
  }
  


async function getFeedbacks(menuItemId)
    {
        await axios({
            method:"get",
            url:"https://fgy5izgkjh.execute-api.us-east-1.amazonaws.com/PROD",
            params:{'menuitemId':menuItemId}
          }).then((response)=>{
            console.log(response.data.data);
            setWords(response.data.data);
            setIsLoading(false);
          }).catch((error)=>{
            alert(error);
            // history.push("/home");
            setIsLoading(false);
          });
    }
    return(
      isLoading ?
      <Spinner animation="border" size="lg" style={{display:'flex',justifyContent:'flex-center', visibility:(isLoading ? "visibile" : "collapse") }} /> 
      :
      <ReactWordcloud 
      callbacks={callbacks}
      options={options}
      size={size}
      words={words}/>
    );

}

export default WordCloud;