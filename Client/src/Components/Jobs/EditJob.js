                    import { FileUpload, FileUploadRounded, Image, SearchOff } from '@mui/icons-material';
import { Avatar, Box, Button, DialogTitle, Divider, Drawer, Autocomplete, IconButton, InputAdornment, Stack, TextField, Typography, useTheme, CircularProgress, Select, MenuItem, OutlinedInput, Chip, FormControl, InputLabel, Checkbox, ListItemText } from '@mui/material'
import { SideModal } from 'Components/Styled/Styled';
import React, { useEffect, useState } from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useGetUserByIdQuery } from 'api/userApi';
import TextareaAutosize from '@mui/material/TextareaAutosize';


function EditJob({ opneEditt, opnEditFun, id }) {

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

    const theme = useTheme();


    const [formData, setFormData] = useState({
        title: '',
        cname: '',
        description: '',
        cwebsite: '',
        clocation: '',
        tags: '',
        imgs: {
            logo: '',
            banner: '',
            office: '',
        },
        responsibilities: '',
        requirements: '',
        employmentType: '',
        locationType: ''
    });


    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);


    const handleImageChange = (event, Imgtype) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, imgs: { ...prev.imgs, [Imgtype]: imageUrl } }))
            console.log(formData)
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                    setFormData(prev => ({ ...prev, clocation: datta.display_name }))
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


    useEffect(() => {
        setFormData({
            title: userData?.title || '',
            cname: userData?.company?.name || '',
            description: userData?.description || '',
            clocation: userData?.company?.location || '',
            cwebsite: userData?.company?.website || '',
            tags: userData?.tags || '',
            imgs: {
                logo: userData?.company?.logo || '',
                banner: userData?.company?.images.banner || '',
                office: userData?.company?.images.office || ''
            },
            responsibilities: userData?.responsibilities.join(',\n'),
            requirements: userData?.requirements.join(',\n'),
            employmentType: userData?.employmentType || '',
            locationType: userData?.locationType || '',
        })

        console.log(formData.employmentType)

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
    }, [userData]);

    return (
        <SideModal
            anchor="right"
            open={opneEditt}
            onClose={opnEditFun}>
            <Box>
                <DialogTitle sx={{ padding: '0 !important' }}>{"Edit Job"}</DialogTitle>
                <Divider orientation="horizontal" flexItem sx={{
                    borderStyle: 'dotted',
                    borderWidth: '1px', margin: '15px 0',
                    borderColor: 'rgba(0, 0, 0, 0.12)', // optional: match MUI's default color
                }} />
                <Box sx={{}}>
                    {/* =============================================== */}
                    <TextField
                        label="Job title"
                        id="custom-input"
                        margin="normal"
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 8, // change this value as needed
                            },
                        }}
                    />
                    {/* =============================================== */}
                    <Typography variant='caption'>Company Details</Typography>
                    <TextField
                        label="Name"
                        value={formData?.cname}
                        name='cname'
                        margin="normal"
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 8, // change this value as needed
                            },
                        }}
                    />
                    {/* =============================================== */}
                    <Stack direction={'column'} alignItems={'flex-start'} mb={5}>
                        <Typography mb={.5} variant='smallerText'>Logo</Typography>
                        <Button variant="outlined" sx={{ marginBottom: 1 }} component="label">
                            <FileUploadRounded /> Choose Logo
                            <input type="file" name='logo' accept="image/*" hidden onChange={(e) => handleImageChange(e, 'logo')} />
                        </Button>
                        {formData.imgs.logo && <Avatar
                            src={formData.imgs.logo}
                            alt="Uploaded Preview"
                            sx={{ width: 80, height: 80 }}
                        />}
                    </Stack>
                    {/* =============================================== */}
                    <Autocomplete
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData?.clocation}
                        freeSolo
                        name='clocation'
                        options={options}
                        loading={loading}
                        onInputChange={(event, newInputValue) => {
                            setQuery(newInputValue);
                        }}
                        onChange={(e, value) => {
                            setSelectedValue(value);
                        }}
                        renderInput={(params) =>
                        (
                            <TextField
                                {...params}
                                InputLabelProps={{ shrink: true }}
                                label="Search location"
                                variant="outlined"
                                name='clocation'
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
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 8
                                    }
                                }}
                            />
                        )
                        }
                    />
                    {/* =============================================== */}
                    <TextField
                        label="Website"
                        value={formData?.cwebsite}
                        name='cwebsite'
                        margin="normal"
                        fullWidth
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 8, // change this value as needed
                            },
                        }}
                    />
                    {/* =============================================== */}
                    <Stack direction={'column'} alignItems={'flex-start'} mb={4}>
                        <Typography mb={.5} variant='smallerText'>Banner</Typography>
                        <Button variant="outlined" sx={{ marginBottom: 1 }} component="label">
                            <FileUploadRounded /> Choose Logo
                            <input name='banner' type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, 'banner')} />
                        </Button>
                        {formData.imgs.banner && <Avatar
                            src={formData.imgs.banner}
                            alt="Uploaded Preview"
                            sx={{ width: 80, height: 80 }}
                        />}
                    </Stack>
                    {/* =============================================== */}
                    <Stack direction={'column'} alignItems={'flex-start'} mb={4}>
                        <Typography mb={.5} variant='smallerText'>Office</Typography>
                        <Button variant="outlined" sx={{ marginBottom: 1 }} component="label">
                            <FileUploadRounded /> Choose Logo
                            <input type="file" name='office' accept="image/*" hidden onChange={(e) => handleImageChange(e, 'office')} />
                        </Button>
                        {formData.imgs.office && <Avatar
                            src={formData.imgs.office}
                            alt="Uploaded Preview"
                            sx={{ width: 80, height: 80 }}
                        />}
                    </Stack>
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

                        InputLabelProps={{ shrink: true }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 8,
                                overflow: 'auto',
                            },
                            '& .MuiOutlinedInput-root textarea': {
                                resize: 'vertical', // This allows the user to resize the textarea
                            },
                        }}
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
                    <FormControl fullWidth sx={{ mb: 3.5 }}>
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
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
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
                            }}>{ListTags.map(({ jobType }) => (<MenuItem
                                key={jobType} value={jobType}>
                                <Checkbox checked={formData?.tags.includes(jobType)} />
                                <ListItemText primary={jobType} />
                                {jobType}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* =============================================== */}
                    <FormControl fullWidth sx={{ mb: 3.5 }} >
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

                </Box>
            </Box>
        </SideModal >
    )
}

export default EditJob
