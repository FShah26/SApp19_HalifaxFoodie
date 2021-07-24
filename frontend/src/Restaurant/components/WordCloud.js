import React,{useEffect,useState} from 'react';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';
import { useParams } from "react-router-dom";

const WordCloud = () => {

  const { menuItemId} = useParams();
  const [words,setWords] = useState([]);


  useEffect(()=>{
    console.log(menuItemId);
    getFeedbacks(menuItemId);
  },[]);


  const callbacks = {
    getWordColor: word => word.value > 50 ? "blue" : "red",
    onWordClick: console.log,
    onWordMouseOver: console.log,
    getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
  }
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
  };
  const size = [300, 200];


async function getFeedbacks(menuItemId)
    {
        await axios({
            method:"get",
            url:"https://fgy5izgkjh.execute-api.us-east-1.amazonaws.com/PROD",
            params:{'menuitemId':menuItemId}
          }).then((response)=>{
            console.log(response.data.data);
            setWords(response.data.data);
          }).catch((error)=>{
            alert(error);
            // history.push("/home");
          });
    }


    return(
      <ReactWordcloud 
      callbacks={callbacks}
      options={options}
      size={size}
      words={words}/>
    );

}

export default WordCloud;