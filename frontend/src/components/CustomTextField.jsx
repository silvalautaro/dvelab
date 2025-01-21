import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

const CustomTextField = ({ name, control, rules, label, type = "text", fullWidth = true }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    label={label}
                    type={type}
                    error={!!error}
                    helperText={
                        error && (
                            <span style={{ color: '#ffcc00' }}>
                                {error.message}
                            </span>
                        )
                    }
                    InputProps={{
                        style: {
                            color: error ? '#ffcc00' : undefined, // Texto amarillo si hay error
                        },
                    }}
                    InputLabelProps={{
                        style: {
                            color: error ? '#ffcc00' : undefined, // Label amarillo si hay error
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: error ? '#ffcc00' : undefined, // Borde amarillo
                            },
                        },
                    }}
                    fullWidth={fullWidth}
                />
            )}
        />
    );
};

export default CustomTextField;
