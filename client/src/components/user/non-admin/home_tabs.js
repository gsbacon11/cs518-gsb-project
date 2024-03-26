"use client";
//import * as React from 'react';
import TabSheetStatus from "@/components/user/non-admin/tab_sheet_status";
import TabSheetCreation from "@/components/user/non-admin/tab_sheet_creation";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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
    <Box sx={{ width: "100%" }}>
      <div className="bg-white border-1 border-slate-400">
        <Box sx={{ borderBottom: 1, borderColor: "divider", borderTop: 1 }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Status" {...a11yProps(0)} />
            <Tab label="Create" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </div>
      <CustomTabPanel value={value} index={0}>
        <TabSheetStatus />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabSheetCreation />
      </CustomTabPanel>
    </Box>
  );
}

//<TabSheetStatus/>
//<TabSheetCreation/>
