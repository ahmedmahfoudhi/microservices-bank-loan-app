import { Alert, AlertTitle, Box, Button, Snackbar, Stack, TextField, Typography, makeStyles } from '@mui/material';
import axios from 'axios';
import React, { FormEvent, SyntheticEvent, useState } from 'react';



function LoanDemand() {
    const [alertMessage, setAlertMessage] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState<any>();

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault()
        setAlertType('')
        setAlertOpen(true)
        try {
            const response = await axios.get('http://localhost:3010/commercial/assess');
            console.log(response.data.success === true)
            if(response.data.success === true){
                setAlertType("success")
            }else{
              setAlertType('error')
            }
            setAlertMessage(response.data.message);
        } catch (error) {
            setAlertMessage("Something went wrong ...");
            setAlertType('error')
        }
    }

    function handleAlertClose(): void {
        setAlertOpen(false)
        setAlertMessage('')
        setAlertType('')
    }

    return (
      <>
        <form className="form" onSubmit={handleSubmit}>
          <Typography variant='h3' margin={4}>Bank Loan Application</Typography>
          <Box className="form-container" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={7}>
            <Box gridColumn="span 6">
            <TextField id="standard-basic" label="Firstname" style={{width: "100%"}} variant="standard" />
            </Box>
            <Box gridColumn="span 6">
            <TextField id="standard-basic" label="Lastname" style={{width: "100%"}} variant="standard" />
            </Box>
            <Box gridColumn="span 12">
            <TextField id="standard-basic" label="Email" style={{width: "100%"}} variant="standard" />
            </Box>
            <Box gridColumn="span 6">
            <TextField id="standard-basic" label="Loan Amount" style={{width: "100%"}} variant="standard" />
            </Box>
            <Box gridColumn="span 6">
            <TextField id="standard-basic" label="Years" style={{width: "100%"}} variant="standard" />
            </Box>
            <Box gridColumn="span 12">
              <Button
              type="submit"
            style={{
              backgroundColor: "#08AD36",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "18px",
              padding: "15px",
              width: "100%",
            }}
          >
            Submit
          </Button>
            </Box>
          </Box>

        </form>
                  <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                  <Alert onClose={handleAlertClose} severity={alertType}>
                    <AlertTitle>{alertType === 'success' ? 'success' : 'error'}</AlertTitle>
                    {alertMessage}
                  </Alert>
                </Snackbar>
                </>
      );
}

export default LoanDemand;