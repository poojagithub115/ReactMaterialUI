import { FileUpload, FileUploadRounded, Image, SearchOff } from '@mui/icons-material';
import { Avatar, Box, Button, DialogTitle, Divider, Drawer, Autocomplete, IconButton, InputAdornment, Stack, TextField, Typography, useTheme, CircularProgress, Select, MenuItem, OutlinedInput, Chip, FormControl, InputLabel, Checkbox, ListItemText, Accordion, AccordionSummary, AccordionDetails, FormHelperText } from '@mui/material'
import { SideModal } from 'Components/Styled/Styled';
import React, { useEffect, useState } from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useGetUserByIdQuery, usePostUserByIDMutation, usePostUserMutation } from 'api/userApi';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { GridArrowDownwardIcon } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Toast from './Toast';

function EditJob({ opneEditt, opnEditFun, id, onRefetch, mode }) {
    const EditMode = mode === 'edit';
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
    const { data: userData, error, isLoading } = useGetUserByIdQuery(id, {
        skip: !id, // <-- skip the query if id is not present
    });
    const [postUserByID, { isLoadingg, isError, isSuccess }] = usePostUserByIDMutation();
    const [postUser, { data: newJobData, error: NewJobError }] = usePostUserMutation();

    const [toast, setToast] = useState({
        open: false,
        severity: 'info',
        message: '',
    });
    const [formData, setFormData] = useState({
        title: '',
        company: {
            name: "",
            logo: "",
            location: '',
            website: "",
            images: {
                banner: "",
                office: ""
            }
        },
        description: '',
        requirements: [],
        responsibilities: [],
        employmentType: "",
        experienceLevel: "",
        salary: {
            min: '',
            max: '',
            currency: "",
            type: ""
        },
        locationType: "",
        postedDate: new Date(),
        applicationDeadline: "",
        tags: [],
        howToApply: "",
        status: ""

    });
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [errors, setErrors] = React.useState({});



    const [imagePreviews, setImagePreviews] = useState({
        logo: '',
        banner: '',
        office: '',
    });
    const handleImageChange = (event, Imgtype) => {
        debugger
        const file = event.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setImagePreviews(prev => ({
            ...prev,
            [Imgtype]: imageUrl
        }));

        setFormData((prev) => {
            if (Imgtype === 'logo') {
                return {
                    ...prev,
                    company: {
                        ...prev.company,
                        logo: file
                    }
                };
            }
            return {
                ...prev,
                company: {
                    ...prev.company,
                    images: {
                        ...prev.company.images,
                        [Imgtype]: file
                    }
                }
            }
        })
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Helper: Update nested state
        const updateNestedField = (parentKey, childKey) => {
            setFormData(prev => ({
                ...prev,
                [parentKey]: {
                    ...prev[parentKey],
                    [childKey]: value
                }
            }));
        };

        // Handle salary fields (e.g., "salary.min", "salary.currency")
        if (name.startsWith('salary.')) {
            const key = name.split('.')[1];
            updateNestedField('salary', key);
        }
        // Handle company fields (e.g., "company.name", "company.website")
        // Handle company fields (non-file)
        else if (name.startsWith('company.')) {
            const key = name.split('.')[1];
            updateNestedField('company', key);
        }
        // Handle top-level fields
        else {
            setFormData(prev => ({
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
    const validate = () => {
        const newErrors = {};
        const getNestedValue = (obj, path) => {
            return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
        };
        const requiredFields = [
            { path: 'title', label: 'Job title' },
            { path: 'description', label: 'Description' },
            { path: 'company.name', label: 'Company name' },
            { path: 'company.logo', label: 'Company Logo' },
            // { path: 'company.location', label: 'Company location' },
            { path: 'company.images.banner', label: 'Company Banner image' },
            // { path: 'company.website', label: 'Company website' },
            // { path: 'salary.min', label: 'Minimum salary' },
            // { path: 'salary.max', label: 'Maximum salary' },
            // { path: 'salary.currency', label: 'Currency' },
            // { path: 'salary.type', label: 'Type' },
            // { path: 'locationType', label: 'Location Type' },
            // { path: 'tags', label: 'Tags' },
            // { path: 'requirements', label: 'Requirement' },
            // { path: 'responsibilities', label: 'Responsibilities' },
            // { path: 'employmentType', label: 'Employment type' },
            // { path: 'experienceLevel', label: 'Experience level' },
        ];

        const setNestedError = (obj, path, value) => {
            const keys = path.split('.');
            let current = obj;
            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    current[key] = value;
                } else {
                    current[key] = current[key] || {};
                    current = current[key];
                }
            });
        };
        requiredFields.forEach(({ path, label }) => {
            const value = getNestedValue(formData, path);
            if (!value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)) {
                setNestedError(newErrors, path, `${label} is required`);
            }
        });



        setErrors(newErrors);
        console.log(newErrors)
        if (Object.keys(newErrors).length > 0 && !toast.open) {
            setToast({
                open: true,
                severity: 'error',
                message: 'Fill required fields',
            });
        }
        return Object.keys(newErrors).length === 0;
    };
    const handleUpdate = async (mode) => {
        debugger
        try {


            const formData123 = new FormData();
            formData123.append('title', formData.title);
            formData123.append('description', formData.description);
            formData123.append('employmentType', formData.employmentType);
            formData123.append('experienceLevel', formData.experienceLevel);
            formData123.append('locationType', formData.locationType);

            // ✅ Company details
            formData123.append('company.name', formData.company.name);
            formData123.append('company.location', formData.company.location);
            formData123.append('company.website', formData.company.website);

            // ✅ Files
            console.log(formData.company.logo)
            formData123.append('company.logo', formData.company.logo);
            formData123.append('company.images.banner', formData.company.images.banner);
            formData123.append('company.images.office', formData.company.images.office);

            // ✅ Salary object as JSON string
            formData123.append('salary', JSON.stringify({
                min: formData.salary.min,
                max: formData.salary.max,
                currency: formData.salary.currency,
                type: formData.salary.type
            }));

            // ✅ Tags array
            formData123.append('tags', JSON.stringify(formData.tags));

            // Other fields
            formData123.append('responsibilities', formData.responsibilities);
            formData123.append('requirements', formData.requirements);
            // formData.append('applicationDeadline', formData.applicationDeadline);
            // formData.append('howToApply', formData.howToApply);
            // formData.append('status', formData.status);

            if (!validate()) return;

            if (EditMode) {
                console.log('Edit data', formData);
                await postUserByID({ id, data: formData123  }).unwrap();
                setToast({
                    open: true,
                    severity: 'success',
                    message: 'Success: Job updated!',
                });
                opnEditFun(false);  // close drawer after toast is set
                onRefetch();
            } else {
                await postUser({ data: formData123 }).unwrap(); // <-- use formData here, not newJobData

                opnEditFun(false);  // close drawer after toast is set
                setToast({
                    open: true,
                    severity: 'success',
                    message: 'Success: Job added!',
                });
                onRefetch();
            }



        } catch (error) {


            const errorMessages = error?.data?.details || [];

            console.log(error?.data?.details)
            // Optional: Combine into one string for toast
            const combinedMessage = Array.isArray(errorMessages)
                ? errorMessages.join('\n')
                : error?.data?.error || 'Failed to submit the job.';
            setErrors(combinedMessage)
            setToast({
                open: true,
                severity: 'error',
                message: combinedMessage,
            });


            // Keep drawer open on error (do NOT call opnEditFun(true))
        }
    };
    useEffect(() => {
        const generatePreview = (fileOrUrl) => {
            if (!fileOrUrl) return '';
            // If it's already a string (server URL), return it
            if (typeof fileOrUrl === 'string') return fileOrUrl;
            // If it's a File, convert to blob URL
            return URL.createObjectURL(fileOrUrl);
        };
    
        const previews = {
            logo: generatePreview(formData.company.logo),
            banner: generatePreview(formData.company.images?.banner),
            office: generatePreview(formData.company.images?.office),
        };
    
        setImagePreviews(previews);
    
        // Cleanup blob URLs when component unmounts or previews change
        return () => {
            Object.values(previews).forEach((url) => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [formData]);
    

    useEffect(() => {
        console.log(userData)
        setFormData({
            title: EditMode ? userData?.title || '' : '',
            company: {
                name: EditMode ? userData?.company?.name || '' : '',
                location: EditMode ? userData?.company?.location || '' : '',
                website: EditMode ? userData?.company?.website || '' : '',
                logo: EditMode ? userData?.company?.logo || '' : '',
                images: {
                    banner: EditMode ? userData?.company?.images?.banner || '' : '',
                    office: EditMode ? userData?.company?.images?.office || '' : ''
                },
            },
            description: EditMode ? userData?.description || '' : '',
            requirements: EditMode ? userData?.requirements : '',
            responsibilities: EditMode ? userData?.responsibilities : '',
            employmentType: EditMode ? userData?.employmentType || '' : '',
            salary: {
                min: EditMode ? userData?.salary?.min || '' : '',
                max: EditMode ? userData?.salary?.max || '' : '',
                currency: EditMode ? userData?.salary?.currency || '' : '',
                type: EditMode ? userData?.salary?.type || '' : '',
            },
            postedDate: EditMode ? userData?.postedDate : new Date(),
            locationType: EditMode ? userData?.locationType || '' : '',
            tags: EditMode ? userData?.tags || '' : '',
        })

    }, [userData, id]);

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

    return (<>
        <SideModal
            anchor="right"
            open={opneEditt}
            onClose={opnEditFun}>
            <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <DialogTitle sx={{ padding: '0' }}>{mode == 'edit' ? "Edit Job" : 'Add Job'}</DialogTitle>
                    <IconButton onClick={opnEditFun} >
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
                <Divider orientation="horizontal" flexItem sx={{
                    borderStyle: 'dotted',
                    borderWidth: '1px', margin: '15px 0',
                    borderColor: 'rgba(0, 0, 0, 0.12)', // optional: match MUI's default color
                }} />
                <Box>
                    {/* =============================================== */}
                    <TextField
                        label="Job title"
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title}
                        name='title'
                        value={formData?.title || ''}
                        onChange={handleChange}
                        fullWidth
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
                                value={formData.company.name || ''}
                                name='company.name'
                                error={!!errors.company?.name}
                                helperText={errors.company?.name}
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
                                {/* {formData?.company?.logo && <Avatar
                                    src={formData?.company?.logo}

                                    className='MuiAvatar-size8'
                                    alt="Uploaded Preview"
                                />} */}

                                {imagePreviews.logo && <img src={imagePreviews.logo} alt="Logo Preview" width="100" />}
                                {errors?.company?.logo && (
                                    <Typography variant="caption" color="error" mt={0.5}>
                                        {errors.company.logo}
                                    </Typography>
                                )}
                            </Stack>

                            {/* =============================================== */}
                            <Autocomplete
                                fullWidth
                                value={formData?.company?.location || ''}

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
                                getOptionLabel={(option) =>
                                    typeof option === 'string' ? option : option?.label || ''
                                }
                                renderInput={(params) =>
                                (
                                    <TextField
                                        error={!!errors.company?.location}
                                        helperText={errors.company?.location}
                                        {...params}
                                        label="Search location"
                                        variant="outlined"
                                        name='company.location'
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
                                    />
                                )
                                }
                            />

                            {/* =============================================== */}
                            <TextField
                                label="Website"
                                value={formData.company.website || ''}
                                name='company.website'
                                margin="normal"
                                fullWidth
                                onChange={handleChange}
                                error={!!errors?.company?.website}
                                helperText={errors?.company?.website}

                            />

                            {/* =============================================== */}
                            <Stack direction={'column'} alignItems={'flex-start'} mb={4}>
                                <Typography mb={'6px'} variant='smallerText'>Banner</Typography>
                                <Button variant="outlined" sx={{ marginBottom: 1 }} component="label">
                                    <FileUploadRounded /> Choose Logo
                                    <input name='company.images.banner' type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, 'banner')} />
                                </Button>
                                {imagePreviews.banner && <img src={imagePreviews.banner} alt="Logo Preview" width="100" />}
                                {/* {formData?.company?.images?.banner &&

                                    // <Avatar
                                    //     src={formData?.company?.images?.banner}
                                    //     // error={!!errors.company?.images?.banner}
                                    //     // helperText={errors?.company?.images?.banner}
                                    //     alt="Uploaded Preview"
                                    //     className='MuiAvatar-size8'
                                    // // sx={{ width: 80, height: 80 }}
                                    // />
                                    } */}

                                {errors.company?.images?.banner && (
                                    <Typography variant="caption" color="error" mt={0.5}>
                                        {errors?.company?.images?.banner}
                                    </Typography>
                                )}
                            </Stack>

                            {/* =============================================== */}
                            <Stack direction={'column'} alignItems={'flex-start'} mb={4}>
                                <Typography mb={'6px'} variant='smallerText'>Office</Typography>
                                <Button variant="outlined" sx={{ marginBottom: 1 }} component="label">
                                    <FileUploadRounded /> Choose Logo
                                    <input type="file" name='company.images.office' accept="image/*" hidden onChange={(e) => handleImageChange(e, 'office')} />
                                </Button>
                                {imagePreviews.office && <img src={imagePreviews.office} alt="Logo Preview" width="100" />}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    {/* =============================================== */}
                    <TextField
                        minRows={3}
                        label="Description"
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        error={!!errors.description}
                        helperText={errors.description}
                        name='description'
                        maxRows={8}
                        // InputLabelProps={{ shrink: true }}
                        value={formData?.description || ''}
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
                        error={!!errors?.responsibilities}
                        helperText={errors?.responsibilities}
                        value={formData?.responsibilities || ''}
                        onChange={handleChange}
                        fullWidth
                        maxRows={8}
                    // InputLabelProps={{ shrink: true }}
                    />

                    {/* =============================================== */}
                    <TextField
                        label="Requirements"
                        margin="normal"
                        multiline
                        name='requirements'
                        error={!!errors?.requirements}
                        helperText={errors?.requirements}
                        value={formData?.requirements || ''}
                        onChange={handleChange}
                        fullWidth
                        maxRows={8}
                    // InputLabelProps={{ shrink: true }}
                    />

                    {/* =============================================== */}
                    <FormControl fullWidth sx={{ mb: 4 }} error={!!errors?.tags}>
                        <InputLabel id="demo-multiple-checkbox-labels">Tag</InputLabel>
                        <Select
                            label="Tags"
                            // id="demo-multiple-chips"
                            multiple
                            name='tags'
                            fullWidth
                            value={Array.from(formData?.tags) || []}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chips" label="Tags" />}
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
                        {errors?.tags && (
                            <FormHelperText>{errors.tags}</FormHelperText>
                        )}
                    </FormControl>

                    {/* =============================================== */}
                    <FormControl fullWidth sx={{ mb: 4 }} error={!!errors?.employmentType}>
                        <InputLabel id="demo-multiple-checkbox-label">Employement Type</InputLabel>
                        <Select
                            label="Employement Type"
                            name='employmentType'
                            fullWidth
                            value={formData?.employmentType || ''}
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
                            <MenuItem value="">
                                <em>Select Employment Type</em>
                            </MenuItem>
                            <MenuItem value={'Full-Time'}>Full time</MenuItem>
                            <MenuItem value={'Part-Time'}>Part time</MenuItem>
                            <MenuItem value={'Contract'}>Contract</MenuItem>
                            <MenuItem value="Internship">Internship</MenuItem>
                        </Select>
                        {errors?.employmentType && (
                            <FormHelperText>{errors.employmentType}</FormHelperText>
                        )}
                    </FormControl>

                    {/* =============================================== */}
                    <FormControl fullWidth sx={{ mb: 3 }} error={!!errors?.locationType}>
                        <InputLabel id="demo-multiple-checkbox-labele">Location Type</InputLabel>
                        <Select
                            label="Location Type"
                            name='locationType'
                            fullWidth
                            value={formData?.locationType || ''}
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
                            <MenuItem value="">
                                <em>Select Employment Type</em>
                            </MenuItem>
                            <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
                            <MenuItem value={'Remote'}>Remote</MenuItem>
                            <MenuItem value={'On-Site'}>On Site</MenuItem>
                        </Select>
                        {errors?.tags && (
                            <FormHelperText>{errors.locationType}</FormHelperText>
                        )}
                    </FormControl>

                    {/* =============================================== */}
                    <Typography mb={1} variant='smallerText'>Salary</Typography>
                    <Stack direction={'row'} gap={2} alignItems={'baseline'}>
                        <TextField
                            label="Minimum"
                            value={formData.salary?.min || ''}
                            name='salary.min'
                            margin="normal"
                            error={!!errors?.salary?.min}
                            helperText={errors?.salary?.min}
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            label="Maximum"
                            value={formData.salary?.max || ''}
                            name='salary.max'
                            error={!!errors?.salary?.max}
                            helperText={errors?.salary?.max}
                            margin="normal"
                            fullWidth
                            onChange={handleChange}

                        />
                        <FormControl fullWidth sx={{ mb: 3 }} error={!!errors?.salary?.currency} >
                            <InputLabel >currency</InputLabel>
                            <Select
                                label="currency"
                                name='salary.currency'
                                fullWidth
                                value={formData?.salary?.currency || ''}
                                onChange={handleChange}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                                            maxHeight: 48 * 4.5 + 8,
                                            width: 250,
                                        },
                                    },
                                }}>
                                <MenuItem value="">
                                    <em>Select Employment Type</em>
                                </MenuItem>
                                <MenuItem value={'USD'} key={'USD'}>USD</MenuItem>
                                <MenuItem value={'INR'} key={'INR'}>INR</MenuItem>
                                <MenuItem value={'EUR'} key={'EUR'}>EUR</MenuItem>
                                <MenuItem value={'GBP'} key={'GBP'}>GBP</MenuItem>
                                <MenuItem value={'JPY'} key={'JPY'}>JPY</MenuItem>
                            </Select>
                            {errors?.tags && (
                                <FormHelperText>{errors.salary?.currency}</FormHelperText>)
                            }
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 3 }} error={!!errors?.salary?.type}>
                            <InputLabel >Type</InputLabel>
                            <Select
                                label="Type"
                                name='salary.type'
                                fullWidth
                                value={formData?.salary?.type || ''}
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
                                <MenuItem value="">
                                    <em>Select Salary Type</em>
                                </MenuItem>
                                <MenuItem value={'Annual'}>Annual</MenuItem>
                                <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                <MenuItem value={'quaterly'}>quaterly</MenuItem>
                            </Select>
                            {errors?.tags && (
                                <FormHelperText>{errors.salary?.type}</FormHelperText>)
                            }
                        </FormControl>
                    </Stack>
                </Box>
                <Stack direction={'row'} gap={2}>
                    <Button variant="contained" onClick={() => handleUpdate(mode)}>{mode == 'edit' ? 'Update' : 'Add'}</Button>
                    <Button variant="outlined" onClick={opnEditFun} >Close</Button>
                </Stack>
            </Box>

        </SideModal >
        {
            toast.open && <Toast autoHideDuration={3000} open={toast.open} severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} tMessage={toast.message} />

        }
    </>
    )
}

export default EditJob
