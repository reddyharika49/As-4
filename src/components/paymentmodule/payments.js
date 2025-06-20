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
    InputAdornment
} from '@mui/material';
import { ArrowForward, Add, Close, FolderOpen, Search } from '@mui/icons-material';
import { Formik, Form, FieldArray, Field } from 'formik';
import { toWords } from 'number-to-words';

const feeHeads = [
    { id: 1, name: "Pocket Money" },
    { id: 2, name: "Transport Fee" },
    { id: 3, name: "Exam Fee" },
    { id: 4, name: "Uniform Fee" },
    { id: 5, name: "Akash Books Fee" },
    { id: 6, name: "Material Fee" }
];

const Payments = () => {
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [term, setTerm] = useState('term1');
    const [amount, setAmount] = useState('');
    const [amountInWords, setAmountInWords] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handlePaymentModeChange = (mode) => setPaymentMode(mode);
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

    const FeeItem = ({ feeItem, index, remove }) => {
        // Use feeItem.name directly since it contains the selected fee head's name
        const feeHeadName = feeItem?.name || 'Fee Head';

        return (
            <Box
                sx={{
                    p: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    mb: 2,
                    bgcolor: '#fff',
                    position: 'relative'
                }}
            >
                {/* Fee Head Badge */}
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

                {/* Remove Button */}
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
                        <Field
                            name={`feeItems[${index}].amount`}
                            as={TextField}
                            fullWidth
                            placeholder="Enter Amount"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Field
                            name={`feeItems[${index}].description`}
                            as={TextField}
                            fullWidth
                            placeholder="Description"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                   
                </Grid>
            </Box>
        );
    };

    return (
        <div
            className="payments mt-3"
            style={{
                height: '50vh',
                overflowY: 'auto',
                padding: '20px',
                position: 'relative'
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
            <div className="payments_top d-flex flex-row " style={{ gap: "150px" }}>
                <div className="payments_top_left">
                    <p style={{ marginBottom: "0px" }}>Due Amount</p>
                    <p style={{ backgroundColor: "gray", marginBottom: "0px" }}>45,000</p>
                </div>

                <div className="payments_top_middle mt-2 rounded-4">
                    <div className="border rounded-5 p-2" style={{ backgroundColor: "#F7F7F7" }}>
                        <div className="btn-group rounded-4 gap-2" role="group">
                            {['Cash', 'DD', 'Cheque', 'Credit/Debit Card'].map(mode => (
                                <button
                                    key={mode}
                                    type="button"
                                    className={`btn ${paymentMode === mode ? 'btn-primary' : 'btn-outline-secondary'}`}
                                    onClick={() => handlePaymentModeChange(mode)}
                                    style={{ padding: "5px 20px", borderRadius: "20px", border: "none" }}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Term Toggle + Amount Fields */}
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 800, mx: 'auto' }}>
                <ToggleButtonGroup
                    value={term}
                    exclusive
                    onChange={handleTermChange}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 30,
                        transform: 'translateY(-50%)',
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        boxShadow: 2,
                        zIndex: 1
                    }}
                >
                    {['term1', 'term2', 'term3'].map((val, i) => (
                        <ToggleButton
                            key={val}
                            value={val}
                            sx={{ borderRadius: '23px', px: 3, py: 0.5, fontWeight: 500 }}
                        >
                            {`Term Fee ${i + 1}`}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>

                <Box sx={{ mt: 4, border: '1px solid #ccc', borderRadius: 2, p: 4, backgroundColor: '#fff' }}>
                    <Box display="flex" gap={2} flexWrap="wrap">
                        <TextField
                            label="Enter Amount"
                            variant="outlined"
                            value={amount}
                            onChange={handleAmountChange}
                            sx={{ flex: 1 }}
                        />
                        <TextField label="Description" variant="outlined" sx={{ flex: 2 }} />
                    </Box>
                    <Typography sx={{ mt: 1, color: amountInWords ? 'green' : 'orangered', fontSize: 13 }}>
                        * {amountInWords ? `Amount in words: ${amountInWords}` : 'Amount in words will display here'}
                    </Typography>
                </Box>
            </Box>

            {/* Fee Items Section */}
            <Formik initialValues={{ feeItems: [] }} onSubmit={(values) => console.log(values)}>
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
                                <TextField label="Pre print Receipt No" variant="outlined" sx={{ width: '35%' }} />
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
                                color="primary"
                                startIcon={<Add />}
                                onClick={() => setShowModal(true)}
                                sx={{ mt: 3, borderRadius: '12px', textTransform: 'capitalize',marginLeft:"250px" }}
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
                                            sx: { borderRadius: 2, backgroundColor: '#f2f2f2' }
                                        }}
                                    />

                                    <Typography variant="subtitle2" mt={3} mb={1} sx={{ color: 'gray', fontWeight: 500 }}>
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

            {/* Print Receipt Button */}
            <Box textAlign="center" mt={4}>
                <Button variant="contained" endIcon={<ArrowForward />}>
                    Print Receipt
                </Button>
            </Box>
        </div>
    );
};

export default Payments;