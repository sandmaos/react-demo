import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Grid,
    Paper,
    Container,
    TextField,
    useMediaQuery,
} from '@mui/material'

export default function FilePage() {
    const token = localStorage.getItem('token');
    const [file, setFile] = useState([]);
    const [fileList, setFileList] = useState([]);
    const isSmallerScreen = useMediaQuery('(max-width:750px)');

    const FORM_DATA = new FormData();
    FORM_DATA.append('file', file);
    FORM_DATA.append('info', 'info for test');

    useEffect(() => {
        getFileList();
    }, [])

    const getFileList = () => {
        axios.get('http://127.0.0.1:5000/api/file/all')
            .then((res) => {
                setFileList(res.data.files);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0] || '';
        if (!newFile)
            return
        setFile(newFile);
    };

    const handleFileUpload = () => {
        if (file.length === 0)
            return alert('Please choose file!')
        axios.post('http://127.0.0.1:5000/api/file/upload', FORM_DATA, {
            headers: {
                token: `Bearer_${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res);
                alert(`File ${file.name} uploaded!`)
                getFileList();
            })
            .catch((error) => {
                alert('Upload failed, check console!')
                console.error(error.response.data);
            })
    }

    const downloadFile = (fileId) => {
        axios.get(`http://127.0.0.1:5000/api/file/download/${fileId}`, {
            headers: {
                token: `Bearer_${token}`,
            },
            responseType: 'arraybuffer' // Set the response type to arraybuffer for binary data
        })
            .then((res) => {
                console.log(res);
                const blob = new Blob([res.data], { type: res.headers['content-type'] });
                const contentDisposition = res.headers['content-disposition'];
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                const filename = filenameMatch ? filenameMatch[1] : 'new_file';
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 401)
                    alert('Unauthorized!');
            })
    }

    const deleteFile = (fileId) => {
        axios.delete(`http://127.0.0.1:5000/api/file/delete/${fileId}`)
            .then((res) => {
                alert(res.data.message);
                getFileList();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <Container sx={{ padding: '10px' }}>
                <Paper sx={{
                    boxShadow: 3,
                    padding: '10px',
                }}>
                    <Paper sx={{
                        margin: '10px',
                        boxShadow: 1,
                        padding: '5px',
                    }}>
                        <Button
                            variant='outlined'
                            onClick={getFileList}
                        >
                            Refresh
                        </Button>

                        <label>
                            Upload Documents:
                            <TextField
                                margin="normal"
                                required
                                name="file"
                                type="file"
                                accept=".pdf, .doc, .docx, .jpg, .png"
                                id="file"
                                onChange={handleFileChange}
                            />
                        </label>
                        <p>Selected Documents: {file.name || ''}</p>
                        <Button onClick={handleFileUpload}>
                            Upload
                        </Button>
                    </Paper>
                    <Paper sx={{
                        margin: '10px',
                        boxShadow: 1,
                        padding: '5px',
                    }}>

                        {
                            fileList.map((file, id) => (
                                <Grid key={id}
                                    container
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Grid item xs={4} textAlign={'left'}>
                                        <p>{file.filename}</p>
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4} textAlign={'right'}>
                                        <Button sx={{ marginRight: '10px' }} onClick={() => downloadFile(file._id)}>Download </Button>
                                        <Button sx={{}} onClick={() => deleteFile(file._id)}>Delete </Button>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Paper>
                </Paper>
            </Container>
        </>
    );
};

