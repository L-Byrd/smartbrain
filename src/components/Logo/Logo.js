import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'
const Logo = () => {
    return (
        <div style={{display:'flex',justifyContent:'flex-start'}}className='ma4 mt0 br2'>
            <Tilt className='br2 shadow' tiltMaxAngleX='55' tiltMaxAngleY='55'>
                <div className='pa3'><img style={{paddingTop: '5px'}} alt ='logo' src={brain}></img></div>
            </Tilt>
        </div>
    );
}

export default Logo;