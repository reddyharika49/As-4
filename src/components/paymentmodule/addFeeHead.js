import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  Grid,
  InputAdornment
} from '@mui/material';
import { Add, Search, Close, FolderOpen } from '@mui/icons-material';

const feeHeads = [
  "Pocket Money",
  "Transport Fee",
  "Exam Fee",
  "Uniform Fee",
  "Akash Books Fee",
  "Material Fee"
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

export default function AddFeeHeadModal() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchTerm('');
  };

  const filteredFeeHeads = feeHeads.filter(fee =>
    fee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        size="large"
        sx={{
          borderRadius: '12px',
          textTransform: 'capitalize',
          width: '50%',
          marginTop: '5%',
          marginLeft: '25%',
          '& .MuiButton-startIcon': {
            marginRight: '8px',
            marginLeft: '8px'
          }
        }}
        onClick={handleOpen}
      >
        Add FeeHead
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
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
              onClick={handleClose}
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
    </>
  );
}
