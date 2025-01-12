import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';

const QuoteTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Data Collection" />
            <Tab label="Accepted" />
            <Tab label="Work in Progress" />
            <Tab label="Invoicing" />
        </Tabs>
    );
};

export default QuoteTabs;
