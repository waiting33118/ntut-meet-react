import { useContext } from 'react';
import ControlBar from '../components/ChatRoom/ControlBar';
import StreamAndChat from '../components/ChatRoom/StreamAndChat';
import { toJSON } from '../libs/utilities';
import { UserContext } from '../store/UserContext';
import { ws } from '../libs/webSocket';

const ChatRoom = () => {
  const ctx = useContext(UserContext);
  const { userInfo } = ctx!;

  ws.send(
    toJSON({
      event: 'newUser',
      payload: { username: userInfo.username, message: '加入' }
    })
  );

  return (
    <div className={'h-screen w-full bg-gray-800'}>
      <StreamAndChat />
      <ControlBar />
    </div>
  );
};

export default ChatRoom;
