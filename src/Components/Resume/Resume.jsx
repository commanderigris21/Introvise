// eslint-disable-next-line no-unused-vars
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import './Resume.css';
import UploadIcon from '@mui/icons-material/Upload';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Resume = () => {
    const navigate = useNavigate();
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const handleSubmit = () => {
        navigate('/facecam');
    };

    return (
        <div className='resume'>
            <p className='txt1'>Upload Resume</p>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <UploadIcon />
                {
                    isDragActive ?
                        <p>Upload your Resume Here</p> :
                        <p>Upload your Resume in PDF and DOC format</p>
                }
            </div>
            <p className='txt2'>Job Details</p>
            <div className='inputs'>
                <TextField label="Job Title" placeholder='Enter your Job Description here' variant="filled" className="filled-basic" />
            </div>
            <div className='inputs2'>
                <TextField label="Job Description" placeholder='Enter your Job Description here' variant="filled" className="filled-basic2" />
            </div>
            <div className='inputs3'>
                <TextField label="Required Skills" placeholder='Enter your Required Skills here' variant="filled" className="filled-basic3" />
            </div>
            <div className='btn'>
                <Button className="button" variant="contained" disableElevation onClick={handleSubmit}>Submit</Button>
            </div>
            <div className='btn2'>
                <Button className="button2" variant="contained" disableElevation onClick={handleSubmit}>Save</Button>
            </div>
        </div> 
    );
};

export default Resume;