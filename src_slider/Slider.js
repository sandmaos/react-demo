import React, { useEffect, useState } from 'react';

export default function Slider({ imgList }) {
    const [currIdx, setCurrIdx] = useState(0);
    const [timer, setTimer] = useState(null);

    const sliderStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const imgStyle = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const naviStyle = {
        position: 'absolute',
        top: '1%',
        fontSize: '18px',
    }
    const leftStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0,-50%)',
        left: '20px',
        fontSize: '30px',
        color: '#fff',
        zIndex: '2',
        cursor: 'pointer',
    }

    const rightStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0,-50%)',
        right: '20px',
        fontSize: '30px',
        color: '#fff',
        zIndex: '2',
        cursor: 'pointer',
    }

    const dotContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '1%',
        gap: '15px',
        fontSize: '25px',
    }
    const dotStyle = {
        cursor: 'pointer',
    }

    const prevImg = () => {
        setCurrIdx(preVla => (preVla - 1 + imgList.length) % imgList.length);
        setSlider();
    }

    const nextImg = () => {
        setCurrIdx(preVla => (preVla + 1) % imgList.length);
        setSlider();
    }

    const navigate=(idx)=>{
        setCurrIdx(idx);
        setSlider();
    }

    function setSlider() {
        clearInterval(timer);
        const nowTimer = setInterval(() => {
            setCurrIdx(preVla => (preVla + 1) % imgList.length);
        }, 3000);
        setTimer(nowTimer);
    }

    useEffect(() => {
        setSlider();
    }, [])

    return (
        <>
            <div style={sliderStyle}>
                <div style={naviStyle}>

                    {currIdx + 1} / {imgList.length}
                </div>
                <div style={leftStyle} onClick={prevImg}> {'<'} </div>
                <div style={rightStyle} onClick={nextImg}> {'>'} </div>
                <img style={imgStyle} src={require(`./statics/${currIdx}.jpg`)} />
                <div style={dotContainerStyle}>
                    {
                        imgList.map((_, idx) =>
                            <span onClick={()=>navigate(idx)} style={{ ...dotStyle, color: idx === currIdx ? '#121212' : '#fff' }}>•</span>
                        )
                    }
                </div>

            </div>
        </>
    )
}
