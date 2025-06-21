import React, { useState } from 'react';
import {
    ToggleButton,
    ToggleButtonGroup,
    Box,
    TextField,
    Typography,
    Button,
    IconButton,
    Grid,
    InputAdornment,
    LinearProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { ArrowForward, Add, Close, FolderOpen, Search } from '@mui/icons-material';
import { Formik, Form, FieldArray, Field, useFormikContext } from 'formik';
import { toWords } from 'number-to-words';
 
const DDDetails = ({ onBack, onPrint }) => {
    const [age, setAge] = React.useState('');
 
    const handleChange = (event) => {
        setAge(event.target.value);
    };
 
    return (
        <div className="container mt-4">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}>
                <p style={{
                    color: '#82808F',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    lineHeight: 'normal',
                    margin: 0,
                }}>
                    Bank Information
                </p>
                <div style={{
                    flex: 1,
                    height: '1px',
                    width: '40%',
                    background: 'linear-gradient(to right, transparent 0%, #82808F 0%, transparent 60%)'
                }}></div>
            </div>
            <div className="root mt-3">
                <div className="col-5">
                    <Box sx={{}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{
                                color: "#000",
                                fontFamily: "Segoe UI",
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "400",
                                lineHeight: "normal",
                                letterSpacing: "-0.084px"
                            }}>Select Organization</InputLabel>
                            <Select sx={{ width: "140%" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Select Organization"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Management</MenuItem>
                                <MenuItem value={20}>Student</MenuItem>
                                <MenuItem value={30}>Employee</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className='col-7 mt-3 d-flex justify-content-between' style={{
                    gap: "10px",
                    color: '#404040',
                    textAlign: 'center',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal',
                    letterSpacing: '-0.072px'
                }}>
                    <TextField sx={{ width: "75%" }} id="outlined-basic" label="Cheque/DD no" variant="outlined" />
                    <TextField sx={{ width: "75%" }} id="outlined-basic" label="Cheque/DD Date" variant="outlined" />
                </div>
                <div className='col-7 mt-3 d-flex justify-content-between' style={{ gap: "10px" }}>
                    <TextField sx={{ width: "75%" }} id="outlined-basic" label="Bank" variant="outlined" />
                    <TextField sx={{ width: "75%" }} id="outlined-basic" label="Branch" variant="outlined" />
                </div>
                <div className='col-7 mt-3 mb-5 d-flex justify-content-between' style={{ gap: "10px" }}>
                    <TextField sx={{ width: "75%" }} id="outlined-basic" label="City Name" variant="outlined" />
                    <TextField sx={{ width: "75%" }} id="outlined-basic" label="IFSC Code" variant="outlined" />
                </div>
            </div>
            <Box mt={4} display="flex" justifyContent="center">
               
                <Button variant="contained" endIcon={<ArrowForward />} onClick={onPrint}>
                    Print Receipt
                </Button>
            </Box>
        </div>
    );
};
 
const feeHeads = [
    { id: 1, name: "Pocket Money" },
    { id: 2, name: "Transport Fee" },
    { id: 3, name: "Exam Fee" },
    { id: 4, name: "Uniform Fee" },
    { id: 5, name: "Akash Books Fee" },
    { id: 6, name: "Material Fee" }
];
 
const FeeItem = ({ feeItem, index, remove }) => {
    const feeHeadName = feeItem?.name || 'Fee Head';
    const { values, handleChange, handleBlur } = useFormikContext();
 
    const amount = values.feeItems?.[index]?.amount || '';
    const description = values.feeItems?.[index]?.description || '';
 
    return (
        <Box
            sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                mb: 2,
                mx:1,
                bgcolor: '#fff',
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: -12,
                    left: 16,
                    bgcolor: '#1E1EFF',
                    color: '#fff',
                    px: 2,
                    py: 0.5,
                    borderRadius: '16px',
                    fontSize: 13,
                    fontWeight: 500,
                    zIndex: 1,
                }}
            >
                {feeHeadName}
            </Box>
 
            <IconButton
                onClick={() => remove(index)}
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 30,
                    transform: 'translateY(-50%)',
                    bgcolor: '#F88',
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    zIndex: 2
                }}
            >
                <Close sx={{ fontSize: 18 }} />
            </IconButton>
 
            <Grid container spacing={2} mt={2}>
                <Grid item xs={4}>
                    <TextField
                        label="Enter Amount"
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        name={`feeItems[${index}].amount`}
                        value={amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                   <Typography
    variant="caption"
    sx={{ mt: 1, display: 'block', color: amount ? 'green' : 'orangered' }}
  >
    * {amount && !isNaN(amount) ? toWords(Number(amount)) : 'Amount in words will display here'}
  </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        label="Description"
                        fullWidth
                        variant="outlined"
                        size="small"
                        name={`feeItems[${index}].description`}
                        value={description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
 
const Payments = () => {
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [term, setTerm] = useState('term1');
      const termOptions = ['term1', 'term2', 'term3'];
    const [amount, setAmount] = useState('');
    const [amountInWords, setAmountInWords] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [showDDDetails, setShowDDDetails] = useState(false);
    const [progress, setProgress] = useState(0); // Progress bar state: 0, 50, or 100
    const [step, setStep] = useState('Step 1'); // Step label state
 
    const handlePaymentModeChange = (mode) => {
        setPaymentMode(mode);
        if (mode !== 'DD') {
            setShowDDDetails(false);
            setProgress(0); // Reset progress if not DD
            setStep('Step 1'); // Reset step
        } else {
            setShowDDDetails(false); // Ensure DDDetails is hidden
            setProgress(50); // Set progress to 50% when DD is selected
            setStep('Step 1'); // Set to Step 1
        }
    };
 
    const handleTermChange = (_, newTerm) => newTerm && setTerm(newTerm);
 
    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        const number = parseInt(value.replace(/[^0-9]/g, ''), 10);
        setAmountInWords(!isNaN(number) ? toWords(number) : '');
    };
 
    const modalStyle = {
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 500,
        height: '35vh',
        bgcolor: 'background.paper',
        borderRadius: 8,
        boxShadow: '0px 0px 7.1px 0px #0000006B',
        p: 2,
        zIndex: 10
    };
 
    return (
        <div
            className="payment"
            style={{
                height: '45vh',
                overflowY: 'auto',
                scrollbarWidth:'none',
                padding: '20px',
                position: 'relative',
                paddingTop: "0px"
            }}
        >
            {showModal && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '1080px',
                        height: '100%',
                        flexShrink: 0,
                        background: 'rgba(0, 0, 0, 0.42)',
                        backdropFilter: 'blur(21.5px)',
                        borderRadius: 1,
                        zIndex: 10,
                    }}
                />
            )}
 
            {/* Top Section */}
            <div className="payments_top d-flex justify-content-between">
                <div className="payments_top_left d-flex flex-column ">
                    <div style={{ marginBottom: "0px" }}>Due Amount</div>
                    <div style={{
                        backgroundColor: "#E9E9E9",
                        marginBottom: "0px",
                        paddingLeft: "20px",
                        borderRadius: "5px"
                    }}>45,000</div>
                </div>
 
                <div className="border rounded-5 p-1" style={{
                        backgroundColor: "#F7F7F7",
                        border: "1px solid #D2D2D2"
                    }}>
                        <div className="btn-group rounded-4 gap-2" role="group">
                            {['Cash', 'DD', 'Cheque', 'Credit/Debit Card'].map(mode => (
                                <button
                                    key={mode}
                                    type="button"
                                    className={`btn ${paymentMode === mode ? 'btn-primary' : ''}`}
                                    onClick={() => handlePaymentModeChange(mode)}
                                    style={{
                                        padding: "3px 20px",
                                        borderRadius: "20px",
                                        border: "none"
                                    }}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                  
                 <div>
                      {paymentMode === 'DD' && (
                        <Box sx={{ width: '100px', textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ fontSize: 12, color: '#333' }}>
                                {step}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: '10px',
                                    borderRadius: 5,
                                    backgroundColor: '#e0e0e0',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#1E90FF',
                                    },
                                }}
                            />
                        </Box>
                    )}
                </div>
               
            </div>
 
            {!showDDDetails && (
                <>
                    {/* Term Toggle + Amount Fields */}
                    <Box sx={{ position: 'relative', width: '100%', maxWidth: 1000, mx: '1' }}>
                        <Box
                            value={term}
                            exclusive
                            onChange={handleTermChange}
                            sx={{
                                position: 'absolute',
                                   display: 'flex',
                                    gap: 1,
                                top: 0,
                                left: 30,
                                transform: 'translateY(-50%)',
                                // backgroundColor: '#fff',
                                borderRadius: 8,
                               
                                zIndex: 1
                            }}
                        >
                            {termOptions.map((val, i) => (
                                <ToggleButton
                                    key={val}
                                    value={val}
                                       selected={term === val}
                                        onChange={() => setTerm(val)}  
 
                                    sx={{
                                        borderRadius: '23px',
                                        px: 3,
                                        py: 0.5,
                                        fontWeight: 500,
                                        backgroundColor:"white",
                                   
                                        '&.Mui-selected': {
                                            bgcolor: '#1E1EFF',
                                            color: '#fff',
                                            '&:hover': {
                                                bgcolor: '#1E1EFF',
                                            }
                                        }
                                    }}
                                >
                                    {`Term Fee ${i + 1}`}
                                </ToggleButton>
                            ))}
                        </Box>
 
 
                        <Box sx={{
                            mt: 4,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            p: 4,
                            backgroundColor: '#fff'
                        }}>
                            <Box display="flex" gap={2} flexWrap="wrap">
                                <TextField
                                    label="Enter Amount"
                                    variant="outlined"
                                    value={amount}
                                    type="number"
                                    onChange={handleAmountChange}
                                    sx={{ flex: 1 }}
                                />
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    sx={{ flex: 2 }}
                                />
                            </Box>
                            <Typography sx={{
                                mt: 1,
                                color: amountInWords ? 'green' : 'orangered',
                                fontSize: 13
                            }}>
                                * {amountInWords ? ` ${amountInWords}` : 'Amount in words will display here'}
                            </Typography>
                        </Box>
                    </Box>
 
                    {/* Fee Items Section */}
                    <Formik
                        initialValues={{ feeItems: [] }}
                        onSubmit={(values) => console.log(values)}
                    >
                        {({ values, setFieldValue }) => {
                            const addFeeItem = (feeHead) => {
                                const newItem = {
                                    id: feeHead.id,
                                    name: feeHead.name,
                                    amount: '',
                                    description: `Payment for ${feeHead.name}`
                                };
                                setFieldValue('feeItems', [...values.feeItems, newItem]);
                                setShowModal(false);
                            };
 
                            return (
                                <Form>
                                    <Typography variant="h5" mt={4} mb={2}></Typography>
 
                                    <FieldArray name="feeItems">
                                        {({ remove }) => (
                                            <>
                                                {values.feeItems.map((item, index) => (
                                                    <FeeItem
                                                        key={index}
                                                        feeItem={item}
                                                        index={index}
                                                        remove={remove}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </FieldArray>
 
                                    <Box display="flex" gap={2} mt={2} flexWrap="wrap">
                                        <TextField
                                            label="Pre print Receipt No"
                                            variant="outlined"
                                            sx={{ width: '35%' }}
                                        />
                                        <TextField
                                            label="Pay Date"
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ width: 250 }}
                                        />
                                    </Box>
 
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        size="large"
                                        onClick={() => setShowModal(true)}
                                        sx={{
                                            mt: 3,
                                            borderRadius: '5px',
                                            textTransform: 'capitalize',
                                            marginLeft: "270px",
                                            width: "40%",
                                            textAlign: "center",
                                            backgroundColor: "#B6B1FF"
                                        }}
                                    >
                                        Add Fee Head
                                    </Button>
 
                                    {/* Modal Popup */}
                                    {showModal && (
                                        <Box sx={modalStyle}>
                                            <TextField
                                                fullWidth
                                                placeholder="Search Fee Head"
                                                variant="outlined"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Search />
                                                        </InputAdornment>
                                                    ),
                                                    sx: {
                                                        borderRadius: 2,
                                                        backgroundColor: '#f2f2f2'
                                                    }
                                                }}
                                            />
 
                                            <Typography
                                                variant="subtitle2"
                                                mt={3}
                                                mb={1}
                                                sx={{
                                                    color: 'gray',
                                                    fontWeight: 500
                                                }}
                                            >
                                                Recent Search
                                            </Typography>
 
                                            <Grid container spacing={2}>
                                                {feeHeads.map((fee) => (
                                                    <Grid item xs={6} key={fee.id}>
                                                        <Button
                                                            variant="outlined"
                                                            fullWidth
                                                            startIcon={<FolderOpen />}
                                                            sx={{
                                                                borderRadius: 2,
                                                                justifyContent: 'flex-start',
                                                                textTransform: 'none',
                                                                fontWeight: 500,
                                                                color: '#222',
                                                                borderColor: '#ccc',
                                                                padding: '8px 12px',
                                                                backgroundColor: '#fff',
                                                                '&:hover': {
                                                                    backgroundColor: '#f5f5f5'
                                                                }
                                                            }}
                                                            onClick={() => addFeeItem(fee)}
                                                        >
                                                            {fee.name}
                                                        </Button>
                                                    </Grid>
                                                ))}
                                            </Grid>
 
                                            <Box mt={4} textAlign="center">
                                                <IconButton
                                                    onClick={() => setShowModal(false)}
                                                    sx={{
                                                        border: '2px solid #000',
                                                        borderRadius: '50%',
                                                        padding: 1,
                                                        backgroundColor: '#fff'
                                                    }}
                                                >
                                                    <Close />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    )}
                                </Form>
                            );
                        }}
                    </Formik>
                </>
            )}
 
            {showDDDetails ? (
                <DDDetails onBack={() => {
                    setShowDDDetails(false);
                    setProgress(50); // Restore progress to 50% on Back
                    setStep('Step 1'); // Restore step to Step 1
                }} onPrint={() => setProgress(100)} />
            ) : (
                paymentMode === 'DD' && (
                    <Box textAlign="center" mt={5}>
                        <Button
                            variant="contained"
                            endIcon={<ArrowForward />}
                            onClick={() => {
                                setShowDDDetails(true);
                                setProgress(100); // Set to 100% on Next
                                setStep('Step 2'); // Change to Step 2
                            }}
                        >
                            Next
                        </Button>
                    </Box>
                )
            )}
            {paymentMode !== 'DD' && !showDDDetails && (
                <Box textAlign="center" mt={5}>
                    <Button variant="contained" endIcon={<ArrowForward />}>
                        Print Receipt
                    </Button>
                </Box>
            )}
        </div>
    );
};
 
export default Payments;
 