import React from 'react';
import SockJsClient from 'react-stomp';
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

const ChatFragmentSpringBoot = ({ socket }) => { 
  const classes = useStyles();
  const [user, setUser] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([{ primaryText: 'Moderador', secondaryText: 'Escribe un bonito mensaje', isIcon: true, icon: PersonPinIcon }]);
  const [socketClient, setSocketClient] = React.useState(null);

  const addMessage = (messages, message) => messages.concat(message);

  const saveMessage = (messages, message) => addMessage(messages, { ...message, avatar: SentimentVerySatisfiedIcon });

  const sendMessage = () => {
    const messageItem = { primaryText: user, secondaryText: message, isAvatar: true }
    setMessages(saveMessage(messages, messageItem));
    setMessage('');
    socketClient.sendMessage('/app/sendMessage', JSON.stringify(messageItem));
  }


  return (
    <React.Fragment>
        <SockJsClient 
          url={`${socket}/chat/`}
          topics={['/topic/messages']}
          onConnect={() => {
            console.log("Conexión establecida");
          }}
          onDisconnect={() => {
            console.log("Disconnected");
          }}
          onMessage={(messageItem) => {
            if (messageItem.primaryText !== user) { 
             setMessages(saveMessage(messages, messageItem));
            }
          }}
          ref={(client) => setSocketClient(client)}
        />
        <div className={classes.root}>
         <TextBox label={"Usuario"} Icon={AccountCircle} onChange={(event) => setUser(event.target.value)} value={user}/>
        </div>
        <MultiLine label={"Escribe tu mensaje"} rows={"10"} value={message} onChange={(event) => setMessage(event.target.value)} fullWidth={true}/>
        <ButtonIcon text="ENVIAR" handleClick={() => sendMessage()} iconType={SEND_ICON} iconOrientation={ICON_END_POSITION} color={PRIMARY_COLOR} />
        <ItemList items={messages} />
    </React.Fragment>
  );
};

export default ChatFragmentSpringBoot;