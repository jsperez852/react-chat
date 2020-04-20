import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { ICON_END_POSITION, ICON_START_POSITION } from './Iconprops';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

const ButtonIcon = ({ text, handleClick, iconType, iconOrientation, color }) => {
    const classes = useStyles();
    let ButtonComponent;

    switch(iconOrientation) {
        case ICON_START_POSITION: 
          ButtonComponent = (
            <Button
             variant="contained"
             color={color}
             startIcon={<Icon>{iconType}</Icon>}
             className={classes.button}
             onClick={handleClick}
            > 
             {text} 
            </Button>);
          break;
        case ICON_END_POSITION: 
          ButtonComponent = (
            <Button
             variant="contained"
             color={color}
             endIcon={<Icon>{iconType}</Icon>}
             className={classes.button}
             onClick={handleClick}
            > 
             {text} 
            </Button>);
          break;
        default: {
            ButtonComponent = (
                <Button
                 variant="contained"
                 color={color}
                 onClick={handleClick}
                 className={classes.button}
                > 
                 {text} 
                </Button>);
        }
    }

    return ButtonComponent;
};

export default ButtonIcon;