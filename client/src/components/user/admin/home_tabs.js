import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AdminTabCourseCreation from "@/components/user/admin/tab_course_creation";
import AdminTabAdvisingSheets from "@/components/user/admin/tab_advising_sheets";
import AdminTabAccountRequests from "@/components/user/admin/tab_account_requests";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
       <div className="bg-white border-slate-400">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', borderTop:1}}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Advising Sheets" {...a11yProps(0)} />
          <Tab label="Edit Courses" {...a11yProps(1)} />
          <Tab label="Account Requests" {...a11yProps(2)} />
        </Tabs>
      </Box>
      </div>
      <CustomTabPanel value={value} index={0}>
         <AdminTabAdvisingSheets/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AdminTabCourseCreation/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AdminTabAccountRequests></AdminTabAccountRequests>
      </CustomTabPanel>
    </Box>
  );
}

/*"use client";
//import * as React from 'react';
import AdminAccountRequests from "@/components/user/admin/tab_account_requests";
import AdminTabCourseCreation from "@/components/user/admin/tab_course_creation";
import { useState } from "react";
import styles from "@/components/common/Common.module.css";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import CustomTabPanel from "@/components/common/tab_panel";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function AdminTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <div className="bg-white border-slate-400">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', borderTop:1}}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Advising Sheets"/>
          <Tab label="Course Creation"/>
          <Tab label="Account Requests"/>
        </Tabs>
      </Box>
      </div>
      <CustomTabPanel value={value} index={0}>
        Advising Entry Requests
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AdminTabCourseCreation/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       Account Requests
       <AdminAccountRequests></AdminAccountRequests>
      </CustomTabPanel>
    </Box>
  );
}*/