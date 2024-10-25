import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import { Header } from './commonComponents/Header';
import { SideNavBar } from './commonComponents/SideNavBar';
import { DashBoard } from './page/dashBoard/DashBoard';

function App() {
  return (
    <Box display={'flex'} flexDirection={'column'}>
       <Header/>
       <Box display={'flex'} flexDirection={'row'}>
        <SideNavBar/>
         <Box height={'100vh'} width={'100%'}>
             <DashBoard/>
         </Box>
       </Box>
    </Box>
  );
}

export default App;
