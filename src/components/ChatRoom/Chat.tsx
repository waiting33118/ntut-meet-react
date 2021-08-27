import styles from './Chat.module.css';
import { ws } from '../../libs/webSocket';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { toJSON, uuid } from '../../libs/utilities';
import Message from './Message';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../store/UserContext';

enum EventTypes {
  NEW_USER = 'newUser',
  CHAT = 'chat'
}

interface IChatRecord {
  id: string;
  username: string;
  message: string;
  timestamp: string;
}

const Chat = () => {
  const [chatRecord, setChatRecord] = useState<IChatRecord[]>([]);
  const ctx = useContext(UserContext);
  const [input, setInput] = useState('');

  useEffect(() => {
    ws.addEventListener('message', (e) => {
      const receive: IMsgFormat = JSON.parse(e.data);
      switch (receive.event) {
        case EventTypes.NEW_USER:
        case EventTypes.CHAT:
          setChatRecord((prev) => [
            ...prev,
            {
              id: uuid(),
              username: receive.payload.username,
              message:
                typeof receive.payload.message === 'string'
                  ? receive.payload.message
                  : '',
              timestamp: `${new Date().getHours()}:${new Date().getMinutes()}`
            }
          ]);
          break;
      }
    });
  }, []);

  const handleSendChat = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ws.send(
        toJSON({
          event: EventTypes.CHAT,
          payload: { message: input, username: ctx!.userInfo.username }
        })
      );
      setInput('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={'w-1/5 flex-none bg-white p-3 rounded-md'}>
      <div className={'h-full flex flex-col'}>
        <h3 className={'text-xl px-3 pb-6'}>通話中的訊息</h3>
        <div className={'rounded-md bg-gray-200 text-xs p-3 mb-3 text-center'}>
          只有這場通話的參與者可以查看訊息，且訊息會在通話結束後刪除。
        </div>
        <ul className={`${styles.scroll} flex-auto py-3 overflow-y-auto`}>
          {chatRecord.map((record) => (
            <Message
              key={record.id}
              message={record.message}
              timestamp={record.timestamp}
              username={record.username}
            />
          ))}
        </ul>
        <input
          type="text"
          name="chatInput"
          placeholder="傳送訊息給所有人"
          value={input}
          className={'rounded-full py-3 px-3 bg-gray-200 mt-3 outline-none'}
          onChange={handleInputChange}
          onKeyDown={handleSendChat}
        />
      </div>
    </div>
  );
};

export default Chat;
