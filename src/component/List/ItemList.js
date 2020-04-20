import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
}));

const createIconComponent = (isAvatar, AvatarIcon, isIcon, Icon) => {
    const IconComponent = isAvatar 
     ? (<ListItemAvatar>
         <Avatar>
          <AvatarIcon />
         </Avatar>
        </ListItemAvatar>) : isIcon 
     ? (<ListItemIcon>
         <Icon />
        </ListItemIcon>) : null;
    
    return IconComponent;
};

const createItem = (item, idx) => {
    const { isAvatar, isIcon, primaryText, secondaryText, avatar, icon } = item;

    const IconComponent = createIconComponent(isAvatar, avatar, isIcon, icon);
      
   return (
    <ListItem key={`item-${idx}`}>
       {IconComponent && IconComponent }
       <ListItemText primary={primaryText} secondary={secondaryText} />
    </ListItem>
   );
};

const ItemList = ({ items }) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
           {items.map((item, idx) => createItem(item, idx))}
        </List>
    );
}

export default ItemList;