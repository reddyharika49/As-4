import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  Grid,
  InputAdornment
} from '@mui/material';
import { Add, Search, Close, FolderOpen } from '@mui/icons-material';
import { Formik, Form, FieldArray, Field } from 'formik';

// Mock Fee Heads
const feeHeads = [
  { id: 1, name: "Pocket Money" },
  { id: 2, name: "Transport Fee" },
  { id: 3, name: "Exam Fee" },
  { id: 4, name: "Uniform Fee" },
  { id: 5, name: "Akash Books Fee" },
  { id: 6, name: "Material Fee" }
];

const initialValues = {
  feeItems: []
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '85%', sm: '60%', md: '40%' },
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
  zIndex: 20
};

const AddFeeHeadModal = ({ open, handleClose, feeHeads, addFeeItem }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFeeHeads = feeHeads.filter(fee =>
    fee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!open) return null;

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.1)',
          backdropFilter: 'blur(5px)',
          zIndex: 10
        }}
      />
      <Box sx={modalStyle}>
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
          sx={{ color: 'gray', fontWeight: 500 }}
        >
          Recent Search
        </Typography>

        <Grid container spacing={2}>
          {filteredFeeHeads.map((fee) => (
            <Grid item xs={6} key={fee.id}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FolderOpen />}
                sx={{
                  borderRadius: 2,
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  fontWeight: '500',
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
            onClick={handleClose}
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
    </>
  );
};

const FeeItem = ({ feeItem, index, remove }) => (
  <Box
    sx={{
      p: 2,
      border: '1px solid #ccc',
      borderRadius: 2,
      mb: 2,
      bgcolor: '#fafafa',
      position: 'relative'
    }}
  >
    <IconButton
      onClick={() => remove(index)}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        bgcolor: '#F88',
        borderRadius: '50%',
        width: 30,
        height: 30
      }}
    >
      <Close sx={{ fontSize: 18 }} />
    </IconButton>

    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Field
          name={`feeItems[${index}].amount`}
          as={TextField}
          fullWidth
          placeholder="Amount"
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

export default function Displaysomes() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Box
      sx={{
        p: 4,
        position: 'relative', // required for local modal blur
        minHeight: '100vh',
        overflow: 'hidden'
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log('Submitted:', values)}
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
              <Typography variant="h5" mb={2}>Fee Items</Typography>

              <FieldArray name="feeItems">
                {({ remove }) => (
                  <>
                    {values.feeItems.map((item, index) => (
                      <FeeItem key={index} feeItem={item} index={index} remove={remove} />
                    ))}
                  </>
                )}
              </FieldArray>

              <Box mt={3}>
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
              </Box>

              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setShowModal(true)}
                sx={{
                  mt: 2,
                  borderRadius: '12px',
                  textTransform: 'capitalize'
                }}
              >
                Add Fee Head
              </Button>

              <AddFeeHeadModal
                open={showModal}
                handleClose={() => setShowModal(false)}
                feeHeads={feeHeads}
                addFeeItem={addFeeItem}
              />
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
