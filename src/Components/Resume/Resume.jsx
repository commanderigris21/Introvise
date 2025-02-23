import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import './Resume.css';
import UploadIcon from '@mui/icons-material/Upload';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const Resume = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null); // State to store the uploaded file
    const [jobTitle, setJobTitle] = useState(''); // State for job title
    const [jobDescription, setJobDescription] = useState(''); // State for job description
    const [requiredSkills, setRequiredSkills] = useState(''); // State for required skills

    // Handle file drop
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]); // Store the first file
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    // Handle form submission
    const handleSubmit = async () => {
        if (!file) {
            alert('Please upload a resume file.');
            return;
        }

        // Create a FormData object to send the file and other data
        const formData = new FormData();
        formData.append('file', file); // Append the file
        formData.append('jobTitle', jobTitle); // Append job title
        formData.append('jobDescription', jobDescription); // Append job description
        formData.append('requiredSkills', requiredSkills); // Append required skills

        try {
            // Send the file and data to the backend
            const response = await axios.post('http://localhost:8080/api/pdf/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for file upload
                },
            });

            console.log('File uploaded successfully:', response.data);
            alert('Resume uploaded successfully!');
            navigate('/facecam'); // Navigate to the next page
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload resume. Please try again.');
        }
    };

    return (
        <div className='resume'>
            <p className='txt1'>Upload Resume</p>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <UploadIcon />
                {isDragActive ? (
                    <p>Drop your resume here...</p>
                ) : (
                    <p>Drag and drop your resume here, or click to select a file (PDF/DOC)</p>
                )}
            </div>
            {file && <p>Selected file: {file.name}</p>} {/* Display the selected file name */}

            <p className='txt2'>Job Details</p>
            <div className='inputs'>
                <TextField
                    label="Job Title"
                    placeholder='Enter your Job Title here'
                    variant="filled"
                    className="filled-basic"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)} // Update job title state
                />
            </div>
            <div className='inputs2'>
                <TextField
                    label="Job Description"
                    placeholder='Enter your Job Description here'
                    variant="filled"
                    className="filled-basic2"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)} // Update job description state
                />
            </div>
            <div className='inputs3'>
                <TextField
                    label="Required Skills"
                    placeholder='Enter your Required Skills here'
                    variant="filled"
                    className="filled-basic3"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)} // Update required skills state
                />
            </div>
            <div className='btn'>
                <Button className="button" variant="contained" disableElevation onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            <div className='btn2'>
                <Button className="button2" variant="contained" disableElevation onClick={handleSubmit}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default Resume;
