import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevPrompts, setprevPrompts] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index,nextWord) => {
    setTimeout(()=>{
        setResultData(Prev=>Prev+nextWord)
    }, 75*index)
  }

  const newChat = () =>{
    setloading(false)
    setshowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData("");
    setloading(true);
    setshowResult(true);
    let response;
    if(prompt !== undefined){
        response = await run(prompt);
        setrecentPrompt(prompt)
    }
    else {
        setprevPrompts(prev=>[...prev,input]);
        setrecentPrompt(input);
        response = await run(input)
    }
    // setrecentPrompt(input)
    // setprevPrompts(prev=>[...prev,input])
    // const response = await run(input);
    let responseArray = response.split("**");
    let newResponse="";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>"+responseArray[i]+"</b>";
      }
    }

    let updateResponse = newResponse.split("*").join("<br/>");

    let updatedResponseArray = updateResponse.split(" ");
    for(let i=0;i<updatedResponseArray.length;i++){
        const nextWord = updatedResponseArray[i];
        delayPara(i,nextWord+" ")
    }
    setloading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setprevPrompts,
    onSent,
    recentPrompt,
    setrecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children} </Context.Provider>
  );
};

export default ContextProvider;
