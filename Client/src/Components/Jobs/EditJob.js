import { FileUpload, FileUploadRounded, Image, SearchOff } from '@mui/icons-material';
import { Avatar, Box, Button, DialogTitle, Divider, Drawer, Autocomplete, IconButton, InputAdornment, Stack, TextField, Typography, useTheme, CircularProgress, Select, MenuItem, OutlinedInput, Chip, FormControl, InputLabel, Checkbox, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { SideModal } from 'Components/Styled/Styled';
import React, { useEffect, useState } from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useGetUserByIdQuery, useGetUsersQuery, usePostUserByIDMutation } from 'api/userApi';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { GridArrowDownwardIcon } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



function EditJob({ opneEditt, opnEditFun, id, onRefetch }) {

    // const { refetch } = useGetUsersQuery();
    let ListTags = [{
        "jobType": "Administrator"
    },
    {
        "jobType": "Strategist"
    },
    {
        "jobType": "Producer"
    },
    {
        "jobType": "Representative"
    },
    {
        "jobType": "Supervisor"
    },
    {
        "jobType": "Liaison"
    },
    {
        "jobType": "Specialist"
    },
    {
        "jobType": "Strategist"
    },
    {
        "jobType": "Liaison"
    },
    {
        "jobType": "Manager"
    },
    {
        "jobType": "Executive"
    },
    {
        "jobType": "Coordinator"
    }]
    const { data: userData, error, isLoading } = useGetUserByIdQuery(id);
    const [postUserByID, { isLoadingg, isError, isSuccess }] = usePostUserByIDMutation();

    const [toast, setToast] = useState({
        open: false,
        severity: 'success',
        message: '',
    });



    const [formData, setFormData] = useState({
        title: '',
        company: {
            name: '',
            location: '',
            website: '',
            logo: '',
            images: {
                banner: '',
                office: ''
            },
        },
        description: '',
        requirements: '',
        responsibilities: '',
        employmentType: '',
        salary: {
            min: '',
            max: '',
            currency: '',
            type: '',
        },
        locationType: '',
        tags: '',

    });


    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);


    const handleImageChange = (event, Imgtype) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => {
                if (Imgtype === 'logo') {
                    return {
                        ...prev,
                        company: {
                            ...prev.company,
                            logo: imageUrl
                        }
                    };
                }
                return {
                    ...prev,
                    company: {
                        ...prev.company,
                        images: {
                            ...prev.company.images,
                            [Imgtype]: imageUrl
                        }
                    }
                }

            })
        }

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // setFormData(prev => ({ ...prev, [name]: value }));
        debugger
        if (['min', 'max', 'currency', 'type'].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                salary: {
                    ...prev.salary,
                    [name]: value
                }
            }));
        } else if (name.startsWith('company.')) {
            // Handle nested company keys if needed in future
            const key = name.split('.')[1];
            console.log(key)
            setFormData((prev) => ({
                ...prev,
                company: {
                    ...prev.company,
                    [key]: value
                }
            }));
        } else {

            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }

    };

    const onUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const datta = await res.json();
                    setFormData(prev => ({
                        ...prev,
                        company: {
                            ...prev.company,
                            location: datta.display_name
                        }
                    }
                    ))
                } catch (err) {
                    console.error('Failed to fetch address', err);
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert("Unable to retrieve your location.");
            }
        );
    };

    const handleUpdate = async () => {
        try {
            const response = await postUserByID({ id, data: formData }).unwrap();
            setToast({
                open: true,
                severity: 'success',
                message: 'Job updated successfully!',
            });
            opnEditFun(false);
            onRefetch();
            // console.log(formData)
        } catch (error) {
            setToast({
                open: true,
                severity: 'error',
                message: 'Failed to update job.',
            });
            console.error('Update failed:', error);

        }
    };

    useEffect(() => {
        setFormData({
            title: userData?.title || '',
            company: {
                name: userData?.company?.name || '',
                location: userData?.company?.location || '',
                website: userData?.company?.website || '',
                logo: userData?.company?.logo || '',
                images: {
                    banner: userData?.company?.images.banner || '',
                    office: userData?.company?.images.office || ''
                },
            },
            description: userData?.description || '',
            requirements: userData?.requirements,
            responsibilities: userData?.responsibilities,
            employmentType: userData?.employmentType || '',
            salary: {
                min: userData?.salary.min || '',
                max: userData?.salary.max || '',
                currency: userData?.salary.currency || '',
                type: userData?.salary.type || '',
            },
            locationType: userData?.locationType || '',
            tags: userData?.tags || '',
        })

    }, [userData]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length < 3) return;

            setLoading(true);
            fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    query
                )}&addressdetails=1&limit=5`
            )
                .then((res) => res.json())
                .then((data) => {
                    const locations = data.map((item) => ({
                        label: item.display_name,
                        lat: item.lat,
                        lon: item.lon
                    }));
                    setOptions(locations);
                    setLoading(false);
                });
        }, 500); // debounce input
        return () => clearTimeout(delayDebounce);

    }, [query]);

    return (
        <SideModal
            anchor="right"
            open={opneEditt}
            onClose={opnEditFun}>
            <Box>
                <DialogTitle sx={{ padding: '0' }}>{"Edit Job"}</DialogTitle>
                <Divider orientation="horizontal" flexItem sx={{
                    borderStyle: 'dotted',
                    borderWidth: '1px', margin: '15px 0',
                    borderColor: 'rgba(0, 0, 0, 0.12)', // optional: match MUI's default color
                }} />
                <Box>
                    {/* =============================================== */}
                    <TextField
                        label="Job title"
                        id="custom-input"
                        margin="normal"
                        name='title'
                        value={formData?.title}
                        onChange={handleChange}
                        fullWidth
                    // InputLabelProps={{ shrink: true }}

                    // sx={{
                    //     '& .MuiOutlinedInput-root': {
                    //         borderRadius: 8, // change this value as needed
                    //     },
                    // }}
                    />
                    <Accordion sx={{ marginBottom: 2 }} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<GridArrowDownwardIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span">Company Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* =============================================== */}
                            <TextField
                                label="Name"
                                value={formData.company.name}
                                name='company.name'
                                margin="normal"
                                onChange={handleChange}
                                fullWidth
                            />

                            {/* =============================================== */}
                            <Stack direction={'column'} alignItems={'flex-start'} mb={5}>
                                <Typography mb={'6px'} variant='smallerText'>Logo</Typography>
                                <Button variant="outlined" sx={{ marginBottom: 1 }} component="label">
                                    <FileUploadRounded /> Choose Logo
                                    <input type="file" name='company.logo' accept="image/*" hidden onChange={(e) => handleImageChange(e, 'logo')} />
                                </Button>
                                {formData?.company?.logo && <Avatar
                                    src={formData?.company?.logo}
                                    className='MuiAvatar-size8'
                                    alt="Uploaded Preview"
                                // sx={{ width: 80, height: 80 }}
                                />}
                            </Stack>

                            {/* =============================================== */}
                            <Autocomplete
                                fullWidth
                                value={formData?.company?.location}
                                freeSolo
                                name='company.location'
                                options={options}
                                loading={loading}
                                onInputChange={(event, newInputValue) => {
                                    setQuery(newInputValue);
                                }}
                                onChange={(event, newValue) => {
                                    const selectedLabel =
                                        typeof newValue === 'string' ? newValue : newValue?.label || '';
                                    setFormData((prev) => ({
                                        ...prev,
                                        company: {
                                            ...prev.company,
                                            location: selectedLabel,
                                        },
                                    }));
                                }}

                                renderInput={(params) =>
                                (
                                    <TextField
                                        {...params}
                                        // InputLabelProps={{ shrink: true }}

                                        label="Search location"
                                        variant="outlined"
                                        name='company.location'
                                        // margin="normal"  
                                        // value={Cordinate}
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    <InputAdornment position="end">
                                                        <IconButton title="Use current location" edge="end" onClick={onUseCurrentLocation}>
                                                            <MyLocationIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                </>
                                            )
                                        }}
                                    // sx={{
                                    //     '& .MuiOutlinedInput-root': {
                                    //         borderRadius: 8
                                    //     }
                                    // }}
                                    />
                                )
                                }
                            />

                            {/* =============================================== */}
                            <TextField
                                label="Website"
                                value={formData.company.website}
                                name='company.website'
                                margin="normal"
                                fullWidth
                                onChange={handleChange}
                            // InputLabelProps={{ shrink: true }}

                            // sx={{
                            //     '& .MuiOutlinedInput-root': {
                            //         borderRadius: 8, // change this value as needed
                            //     },
                            // }}
                            />

                            {/* =============================================== */}
                            <Stack direction={'column'} alignItems={'flex-start'} mb={4}>
                                <Typography mb={'6px'} variant='smallerText'>Banner</Typography>
                                <Button variant="outlined" sx={{ marginBottom: 1 }} component="label">
                                    <FileUploadRounded /> Choose Logo
                                    <input name='banner' type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, 'banner')} />
                                </Button>
                                {formData?.company?.images?.banner && <Avatar
                                    src={formData?.company?.images?.banner}
                                    alt="Uploaded Preview"
                                    className='MuiAvatar-size8'
                                // sx={{ width: 80, height: 80 }}
                                />}
                            </Stack>

                            {/* =============================================== */}
                            <Stack direction={'column'} alignItems={'flex-start'} mb={4}>
                                <Typography mb={'6px'} variant='smallerText'>Office</Typography>
                                <Button variant="outlined" sx={{ marginBottom: 1 }} component="label">
                                    <FileUploadRounded /> Choose Logo
                                    <input type="file" name='office' accept="image/*" hidden onChange={(e) => handleImageChange(e, 'office')} />
                                </Button>
                                {formData?.company?.images.office && <Avatar
                                    src={formData?.company?.images.office}
                                    alt="Uploaded Preview"
                                    className='MuiAvatar-size8'
                                // sx={{ width: 80, height: 80 }}
                                />}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>


                    {/* =============================================== */}
                    <TextField
                        minRows={3}
                        label="Description"
                        id="custom-input"
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        name='description'
                        maxRows={8}
                        value={formData?.description}
                        // onChange={(e) => setRequirement(e.target.value)}
                        // hiddenLabel
                        fullWidth
                    />

                    {/* =============================================== */}
                    <TextField
                        label="Responsibilites"
                        margin="normal"
                        multiline
                        name='responsibilities'
                        value={formData?.responsibilities}
                        onChange={handleChange}
                        fullWidth
                        maxRows={8}
                        InputLabelProps={{ shrink: true }}
                    />

                    {/* =============================================== */}
                    <TextField
                        label="Requirements"
                        margin="normal"
                        multiline
                        name='requirements'
                        value={formData?.requirements}
                        onChange={handleChange}
                        fullWidth
                        maxRows={8}
                        InputLabelProps={{ shrink: true }}
                    />

                    {/* =============================================== */}
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                        <Select
                            label="Tags"
                            id="demo-multiple-chip"
                            multiple
                            name='tags'
                            fullWidth
                            value={Array.from(formData?.tags)}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {selected.map((value, key) => (
                                        <Chip key={`${value}-${key}`} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                                        maxHeight: 48 * 4.5 + 8,
                                        width: 250,
                                    },
                                },
                            }}>{ListTags.map(({ jobType }, index) => (
                                <MenuItem key={index} value={jobType}>
                                    <Checkbox checked={formData?.tags.includes(jobType)} />
                                    <ListItemText primary={jobType} />
                                    {jobType}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* =============================================== */}
                    <FormControl fullWidth sx={{ mb: 4 }} >
                        <InputLabel id="demo-multiple-checkbox-label">Employement Type</InputLabel>
                        <Select
                            label="Employement Type"
                            name='employmentType'
                            fullWidth
                            value={formData?.employmentType}
                            onChange={handleChange}
                            // input={<OutlinedInput id="select-multiple-chip" label="Employement Type" />}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                                        maxHeight: 48 * 4.5 + 8,
                                        width: 250,
                                    },
                                },
                            }}>
                            <MenuItem value={'Full-Time'}>Full time</MenuItem>
                            <MenuItem value={'Part-Time'}>Part time</MenuItem>
                            <MenuItem value={'Contract'}>Contract</MenuItem>
                            <MenuItem value="Internship">Internship</MenuItem>
                        </Select>
                    </FormControl>

                    {/* =============================================== */}
                    <FormControl fullWidth sx={{ mb: 3 }} >
                        <InputLabel id="demo-multiple-checkbox-label">Location Type</InputLabel>
                        <Select
                            label="Location Type"
                            name='locationType'
                            fullWidth
                            value={formData?.locationType}
                            onChange={handleChange}
                            // input={<OutlinedInput id="select-multiple-chip" label="Employement Type" />}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                                        maxHeight: 48 * 4.5 + 8,
                                        width: 250,
                                    },
                                },
                            }}>
                            <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
                            <MenuItem value={'Remote'}>Remote</MenuItem>
                            <MenuItem value={'On-Site'}>On Site</MenuItem>
                        </Select>
                    </FormControl>

                    {/* =============================================== */}
                    <Typography mb={1} variant='smallerText'>Salary</Typography>
                    <Stack direction={'row'} gap={2} alignItems={'baseline'}>
                        <TextField
                            label="Minimum"
                            value={formData.salary.min}
                            name='min'
                            margin="normal"
                            fullWidth
                            onChange={handleChange}
                        // InputLabelProps={{ shrink: true }}

                        // sx={{
                        //     '& .MuiOutlinedInput-root': {
                        //         borderRadius: (theme)=>  `${theme.shape.borderRadius[0]}px`, // change this value as needed
                        //     },
                        // }}
                        />  <TextField
                            label="Maximum"
                            value={formData.salary.max}
                            name='max'
                            margin="normal"
                            fullWidth
                            onChange={handleChange}
                        // InputLabelProps={{ shrink: true }}

                        // sx={{
                        //     '& .MuiOutlinedInput-root': {
                        //         borderRadius: 1, // change this value as needed
                        //     },
                        // }}
                        />
                        <FormControl fullWidth sx={{ mb: 3 }} >
                            <InputLabel >currency</InputLabel>
                            <Select
                                label="currency"
                                name='currency'
                                fullWidth
                                value={formData.salary.currency}
                                onChange={handleChange}
                                // input={<OutlinedInput id="select-multiple-chip" label="Employement Type" />}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                                            maxHeight: 48 * 4.5 + 8,
                                            width: 250,
                                        },
                                    },
                                }}>
                                <MenuItem value={'USD'} key={'USD'}>USD</MenuItem>
                                <MenuItem value={'INR'} key={'INR'}>INR</MenuItem>
                                <MenuItem value={'EUR'} key={'EUR'}>EUR</MenuItem>
                                <MenuItem value={'GBP'} key={'GBP'}>GBP</MenuItem>
                                <MenuItem value={'JPY'} key={'JPY'}>JPY</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }} >
                            <InputLabel >Type</InputLabel>
                            <Select
                                label="Type"
                                name='type'
                                fullWidth
                                value={formData.salary.type}
                                onChange={handleChange}
                                // input={<OutlinedInput id="select-multiple-chip" label="Employement Type" />}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                                            maxHeight: 48 * 4.5 + 8,
                                            width: 250,
                                        },
                                    },
                                }}>
                                <MenuItem value={'Annual'}>Annual</MenuItem>
                                <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                <MenuItem value={'quaterly'}>quaterly</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                <Stack direction={'row'} gap={2}>
                    <Button variant="contained" onClick={handleUpdate}>Update</Button>
                    <Button variant="outlined" onClick={opnEditFun} >Close</Button>
                </Stack>
            </Box>
            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <MuiAlert
                    elevation={1}
                    variant="filled"
                    severity={toast.severity}
                    onClose={() => setToast({ ...toast, open: false })}
                    sx={{ width: '100%', }}
                >
                    {toast.message}
                </MuiAlert>
            </Snackbar>
        </SideModal>
    )
}

export default EditJob
