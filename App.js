import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
 [1, 2, 3, "+"],
  [4, 5, 6, "-"],
  [7, 8, 9, "X"],
  ["Clear", 0, "/","="],
  ["Scientific"]
];






const App = () => {
  
  const [num,setNum]=useState(0)
  
  const [res,setRes]=useState(0)
  const [sign,setSign]=useState(0)
  const [toggle,setToggle]=useState(false)
  
 

  const numClickHandler = (e) => {

    e.preventDefault();
    
    const value = e.target.innerHTML;
    console.log("NumClick")
    if(num===0 &&value==="0"){ setNum(0) }
    else setNum(num+value)
    
    
    
   console.log("this is num click handler","values of num and res are",num,res)
    console.log(num)
  };
  const resetClickHandler = () => {
    console.log("reset click")
    setSign("")
    setNum(0)
    setRes(0)
 }
 


  
  const signClickHandler = (e) => {

  
   
     console.log("sign click")
     
     setSign(e.target.innerHTML)
      setRes(!res && num ? num : res)
      
      
     setNum(0)

   };

  const equalsClickHandler = () => {
    console.log("equals")
    if (sign && num) {
      const math = (a, b, sign) =>
        sign ==="+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;
        

      
        setRes(
          num === "0" && sign === "/"
            ? "Can't divide with 0"
            : (
                math(
                  Number((res)),
                  Number((num)),
                  sign
                )
              ))
       setSign("")
        setNum(0)
        console.log(num)
        console.log(res)
  
    }
  };

  const sci=(e)=>{
    console.log('INSIDE SQ')
    const val=e.target.innerHTML
    val==="Square root"
    ?setNum(Math.sqrt(num))
    :val==="Square"
    ?setNum(num*num)
    :setNum(num*(-1))
    
  }

const addition=(e)=>{
  let [a,b]=[res,num]
  const val= e.target.innerHTML
  let sum=0
  if(val==="+"){

   sum=a+b
   setRes(sum)
  }
}

  return (
    <Wrapper>
      <Screen value={num?num:res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "Clear"
                  ? resetClickHandler
                  
                  : btn === "="
                  ? equalsClickHandler
                  :btn==="Scientific"
                  ?()=>setToggle(!toggle)
                 
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  
                  : numClickHandler
              }
            />
          );
        })}
        {toggle
        ?<div>
          <button onClick={sci}>Square root</button>
          <button onClick={sci}>Square</button>
          <button onClick={sci}>Invert</button>
        </div>
        :null}
      </ButtonBox>
    
    </Wrapper>
  );
};

export default App;
