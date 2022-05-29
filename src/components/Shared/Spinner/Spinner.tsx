import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = () => {
  return (
    <Box sx={{width: '100%', height: '100vh', display: 'flex', alignItems:'center', justifyContent: 'center'}}><CircularProgress/></Box>
  )
}

export default Spinner