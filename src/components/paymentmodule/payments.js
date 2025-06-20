import React, { useState } from 'react';
import {
    ToggleButton,
    ToggleButtonGroup,
    Box,
    TextField,
    Typography,
    Button,
    Modal,
    Grid,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Add, ArrowForward, Search, Close, FolderOpen } from '@mui/icons-material';
import { toWords } from 'number-to-words';


const Payments = () => {
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [term, setTerm] = useState('term1');
    const [amount, setAmount] = useState('');
    const [amountInWords, setAmountInWords] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handlePaymentModeChange = (mode) => setPaymentMode(mode);
    const handleTermChange = (event, newTerm) => newTerm && setTerm(newTerm);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        const number = parseInt(value.replace(/[^0-9]/g, ''), 10);
        setAmountInWords(!isNaN(number) ? toWords(number) : '');
    };

    const feeHeads = [
        "Pocket Money",
        "Transport Fee",
        "Exam Fee",
        "Uniform Fee",
        "Akash Books Fee",
        "Material Fee"
    ];

    const filteredFeeHeads = feeHeads.filter(fee =>
        fee.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="payments mt-3" style={{ height: "45vh", overflowY: "auto" }}>
            {/* Top Section */}
            <div className="payments_top d-flex flex-row" style={{ gap: "150px" }}>
                {/* Left */}
                <div className="payments_top_left">
                    <p style={{ marginBottom: "0px" }}>Due Amount</p>
                    <p style={{ backgroundColor: "gray", marginBottom: "0px" }}>45,000</p>
                </div>

                {/* Middle - Payment Modes */}
                <div className="payments_top_middle mt-2 rounded-4">
                    <div className="border rounded-5 p-2" style={{ backgroundColor: "#F7F7F7" }}>
                        <div className="btn-group rounded-4 gap-2" role="group">
                            {['Cash', 'DD', 'Cheque', 'Credit/Debit Card'].map(mode => (
                                <button
                                    key={mode}
                                    type="button"
                                    className={`btn ${paymentMode === mode ? 'btn-primary' : 'btn-outline-secondary'}`}
                                    onClick={() => handlePaymentModeChange(mode)}
                                    style={{ paddingLeft: "20px", paddingRight: "20px", borderRadius: "20px" ,border:"none"}}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Form */}
            <div className="payment_bottom">
                <Box sx={{ position: 'relative', width: '100%', maxWidth: 800, mx: 'auto' }}>
                    {/* Term Toggle Buttons */}
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
                                sx={{
                                    borderRadius: '23px',
                                    px: 3,
                                    py: 0.5,
                                    textTransform: 'none',
                                    fontWeight: 500
                                }}
                            >
                                {`Term Fee ${i + 1}`}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>

                    {/* Form Inputs */}
                    <Box
                        sx={{
                            mt: 4,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            p: 4,
                            pt: 4,
                            boxShadow: 1,
                            backgroundColor: '#fff'
                        }}
                    >
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

                        <Typography
                            sx={{
                                mt: 1,
                                color: amountInWords ? 'green' : 'orangered',
                                fontSize: 13
                            }}
                        >
                            * {amountInWords ? `Amount in words: ${amountInWords}` : 'Amount in words will display here'}
                        </Typography>
                    </Box>
                </Box>

                {/* Additional Fields */}
                <div className='mt-4 px-5'>
                    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
                        <TextField
                            label="Pre print Receipt No"
                            variant="outlined"
                            sx={{ borderRadius: "6px", width: "35%" }}
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

                    {/* Add FeeHead Button */}
                    <div className='add_feeHead'>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            size="large"
                            sx={{
                                borderRadius: '12px',
                                textTransform: "capitalize",
                                width: "50%",
                                marginTop: "5%",
                                marginLeft: "25%",
                                '& .MuiButton-startIcon': {
                                    marginRight: '8px',
                                    marginLeft: '8px',
                                },
                            }}
                            onClick={() => setModalOpen(true)}
                        >
                            Add FeeHead
                        </Button>
                    </div>

                    {/* Print Button */}
                    <div className='next'>
                        <Button
                            variant="contained"
                            endIcon={<ArrowForward />}
                            sx={{ marginTop: "5%", marginLeft: "40%" }}
                        >
                            Print Receipt
                        </Button>
                    </div>
                </div>
            </div>

            {/* Modal for Add Fee Head */}
            <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40%',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    {/* Search Bar */}
                    <TextField
                        fullWidth
                        placeholder="Search Fee Head"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 2, backgroundColor: '#f2f2f2' }
                        }}
                    />

                    <Typography variant="subtitle1" mt={2} mb={1}>
                        Recent Search
                    </Typography>

                    <Grid container spacing={2}>
                        {filteredFeeHeads.map((fee, index) => (
                            <Grid item xs={6} key={index}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<FolderOpen />}
                                    sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
                                >
                                    {fee}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Close Button */}
                    <Box mt={3} textAlign="center">
                        <IconButton
                            onClick={() => setModalOpen(false)}
                            sx={{
                                border: '2px solid #000',
                                borderRadius: '50%',
                                padding: 1
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default Payments;
