import Chat from './Chat';
import Stream from './Stream';
import styles from './StreamAndChat.module.css';

const StreamAndChat = () => {
  return (
    <div className={`${styles.container} flex flex-nowrap p-3`}>
      <Stream />
      <Chat />
    </div>
  );
};

export default StreamAndChat;
