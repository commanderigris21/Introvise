// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Facecam.css';

const Facecam = () => {
    const [stream, setStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error('Error accessing media devices.', err);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMuted(!isMuted);
        }
    };

    const handleSubmit = () => {
        console.log('Submit button clicked');
    };

    const handleNext = () => {
        navigate('/dashboard');
    };

    return (
        <div>
            <div className="facecam-container">
                <p className='p1'>Developer Interview</p>
                <div className="facecam-controls">
                    <button className="facecam-button" onClick={startCamera}>Start Camera</button>
                    {stream && (
                        <>
                            <button className="facecam-button" onClick={stopCamera}>Stop Camera</button>
                            <button className="facecam-button" onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
                            <button className="facecam-button" onClick={handleSubmit}>Submit</button>
                        </>
                    )}
                </div>
                <div className="facecam-video-container">
                    <video className="facecam-video" ref={videoRef} autoPlay playsInline style={{ display: stream ? 'block' : 'none' }} />
                    {!stream && <div className="facecam-placeholder">Camera is off</div>}
                </div>
            </div>
            <div className='interview'>
                <p className='p3'>Interview Questions</p>
                <div className='div0'><p>1. Can you tell about yourself?</p> <button className='btn-p1' onClick={startCamera}></button></div>
                <div className='div1'><p>2. What are your greatest strengths and weaknesses?</p> <button className='btn-p2' onClick={startCamera}></button></div>
                <div className='div2'><p>3. Why do you want to work here?</p> <button className='btn-p3' onClick={startCamera}></button></div>
                <div className='div3'><p>4. Describe a challenging situation you have encountered and how you overcame it.</p> <button className='btn-p' onClick={startCamera}></button></div>
                <div className='div4'><p>5. Where do you see yourself in 5 years?</p> <button className='btn-p4' onClick={startCamera}></button></div>
                <div className='div5'><p>6. How do you prioritize your work?</p> <button className='btn-p5' onClick={startCamera}></button></div>
                <div className='div6'><p>7. Do you have any questions for us?</p> <button className='btn-p6' onClick={startCamera}></button></div>
                <button className='btnx'>Leave Interview</button>
                <button className='btn-next' onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};

export default Facecam;
