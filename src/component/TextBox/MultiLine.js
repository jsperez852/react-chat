import React from 'react';
import TextField from '@material-ui/core/TextField';
import './css/multiline.css';

const MultiLine = ({ value, label, rows, onChange, fullWidth }) => {
    return (
       <React.Fragment> 
         <div className="multiliner"> 
            <TextField
                id="outlined-multiline-flexible"
                fullWidth={fullWidth}
                label={label}
                multiline
                rowsMax={rows}
                value={value}
                onChange={onChange}
                variant="outlined"
            />
          </div>
        </React.Fragment>
    );
};

export default MultiLine;