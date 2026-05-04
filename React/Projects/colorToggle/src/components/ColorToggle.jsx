import { useState } from "react";
const ColorToggle = () => {
    const [Color, setColor] = useState('#ecdba5f0');
    function Toggle(){
        if(Color == '#ecdba5f0'){
            setColor('#bc8541f0')
        }else{
            setColor('#ecdba5f0')
        }

    }
    return (

    <div className="main" style={{backgroundColor:Color}}>
      <h2>ColorToggle</h2>
      <button className="btn" onClick={Toggle}>Toggle</button>
    </div>
  );
};

export default ColorToggle;