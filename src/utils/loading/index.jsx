import React, { useContext } from 'react'
import { Backdrop } from '@mui/material';
import { AppContext } from '@/contexts/app';
import "./style.css"

const Loading = ({ text = "Loading..." }) => {
    return (
        <Backdrop className='backdrop-loader' open={true}>
            <div className="sexyLoaderContainer">
                <div className="sexySpinner">
                    <div className="sexySpinnerRing ring1"></div>
                    <div className="sexySpinnerRing ring2"></div>
                    <div className="sexySpinnerDot"></div>
                </div>
                {text && <span className="sexyLoaderText">{text}</span>}
            </div>
        </Backdrop>
    )
}

export default Loading