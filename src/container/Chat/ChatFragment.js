import React from 'react';
import { socketConnect } from 'socket.io-react';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import TextBox from '../../component/TextBox/TextBox';
import MultiLine from '../../component/TextBox/MultiLine';
import ItemList from '../../component/List/ItemList';
import ButtonIcon from '../../component/Button/ButtonIcon'
import { ICON_END_POSITION, SEND_ICON, PRIMARY_COLOR } from '../../component/Button/Iconprops';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '30%',
    margin: '0 auto',   
    paddingTop: '20px'
  }
});

const ChatFragment = ({ socket }) => {
  const classes = useStyles();
  const [user, setUser] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([{ primaryText: 'Moderador', secondaryText: 'Escribe un bonito mensaje', isIcon: true, icon: PersonPinIcon }]);

  const addMessage = (messages, message) => messages.concat(message);

  const saveMessage = (messages, message) => addMessage(messages, { ...message, avatar: SentimentVerySatisfiedIcon });

  socket.on('chat:message', messageItem => {
      setMessages(saveMessage(messages, messageItem));
    })

  const sendMessage = () => {
    const messageItem = { primaryText: user, secondaryText: message, isAvatar: true }
    setMessages(saveMessage(messages, messageItem));
    setMessage('');
    socket.emit('chat:message', messageItem)
  }


  return (
    <React.Fragment>
        <div className={classes.root}>
         <TextBox label={"Usuario"} Icon={AccountCircle} onChange={(event) => setUser(event.target.value)} value={user}/>
        </div>
        <MultiLine label={"Escribe tu mensaje"} rows={"10"} value={message} onChange={(event) => setMessage(event.target.value)} fullWidth={true}/>
        <ButtonIcon text="ENVIAR" handleClick={() => sendMessage()} iconType={SEND_ICON} iconOrientation={ICON_END_POSITION} color={PRIMARY_COLOR} />
        <ItemList items={messages} />
    </React.Fragment>
  );
};

export default socketConnect(ChatFragment);