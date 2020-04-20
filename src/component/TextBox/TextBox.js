import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const TextBox = ({ value, label, Icon, onChange, fullWidth }) => {
    return (
        <React.Fragment>
          <TextField 
            id="input-with-icon-grid" 
            fullWidth={fullWidth}
            label={label} 
            value={value} 
            onChange={onChange}
            InputProps={Icon ? {
                startAdornment: (
                  <InputAdornment position="start">
                      <Icon />
                  </InputAdornment>
                )
              } : {}
            }
          />
        </React.Fragment>
    );
};

export default TextBox;