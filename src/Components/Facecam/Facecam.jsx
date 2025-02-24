import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Facecam.css';

const Facecam = () => {
    const [stream, setStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideos, setRecordedVideos] = useState({});
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error('Error accessing media devices:', err);
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

    const startRecording = (question) => {
        if (!stream) {
            alert("Please start the camera first.");
            return;
        }

        if (isRecording) {
            alert("A recording is already in progress.");
            return;
        }

        setCurrentQuestion(question);
        recordedChunks.current = [];
        const options = { mimeType: 'video/webm' };
        const mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.current.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
            setRecordedVideos(prev => ({ ...prev, [question]: blob }));
        };

        mediaRecorder.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSubmit = async (question) => {
        if (!recordedVideos[question]) {
            alert(`No video recorded for "${question}". Please record an answer first.`);
            return;
        }

        // Convert Blob to File
        const videoBlob = recordedVideos[question];
        const videoFile = new File([videoBlob], "recording.webm", { type: "video/webm" });

        const formData = new FormData();
        formData.append("question", question);
        formData.append("video", videoFile); // Correctly append as a file

        try {
            const response = await axios.post("http://localhost:8080/api/videos/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert(`Video uploaded successfully! ID: ${response.data}`);
        } catch (error) {
            console.error(`Error uploading video for "${question}":`, error);
        }
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
                {[
                    "Can you tell about yourself?",
                ].map((question, index) => (
                    <div key={index} className={`div${index}`}>
                        <p>{index + 1}. {question}</p>
                        {isRecording && currentQuestion === question ? (
                            <button className='btn-p' onClick={stopRecording}>⏹ Stop Recording</button>
                        ) : (
                            <button className='btn-p' onClick={() => startRecording(question)}>🎤 Start Recording</button>
                        )}
                        <button className='btn-submit' onClick={() => handleSubmit(question)}>📤 Upload</button>
                    </div>
                ))}
                <button className='btnx'>Leave Interview</button>
                <button className='btnN'>Next</button>
            </div>
        </div>
    );
};

export default Facecam;
