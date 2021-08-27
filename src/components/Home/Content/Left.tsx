import { ChangeEvent, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../store/UserContext';
import WebRTC from '../../../libs/WebRTC';
import { useHistory } from 'react-router-dom';

const Left = () => {
  const history = useHistory();
  const ctx = useContext(UserContext);
  const { setUserInfo } = ctx!;
  const [username, setUsername] = useState('');
  const [isClick, setIsClick] = useState(false);
  const webRTC = new WebRTC();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const joinRoomHandler = async () => {
    setIsClick(true);
    if (username.trim() === '') {
      alert('請輸入名稱才可加入至會議室！');
      setIsClick(false);
      return;
    }
    try {
      const localStream = await webRTC.getLocalStream();
      setUserInfo((prev) => ({ ...prev, username, localStream }));
      history.push('/room');
    } catch (error: any) {
      setIsClick(false);
      if (error.name === 'NotAllowedError')
        alert(`${error.message}! 請給予攝影機與麥克風權限`);
      if (error.name === 'NotFoundError')
        alert(`${error.message}! 使用者無鏡頭設備，無法加入會議`);
    }
  };

  return (
    <div
      className={
        'h-full w-1/2 px-28 flex flex-col justify-center items-baseline'
      }
    >
      <div className={'text-5xl font-light'}>
        <div className={'mb-3'}>運用ＷebRTC技術打造出的</div>
        <div>小型會議室</div>
        <div className={'mt-8 text-xl text-gray-600'}>
          在疫情時代下，師生、團隊的最佳遠距溝通服務
        </div>
      </div>
      <div className={'w-full divide-y-2 divide-gray-200'}>
        <div className={'w-full mt-16 mb-7 flex justify-start items-center'}>
          <input
            type="text"
            name="username"
            placeholder="輸入您的稱呼或大名"
            required
            className={
              'w-60 mr-4 p-3 border border-gray-400 hover:border-gray-900 focus:border-blue-500 rounded-md'
            }
            value={username}
            onChange={handleInputChange}
          />
          <button onClick={joinRoomHandler} disabled={isClick}>
            加入
          </button>
        </div>
        <div className={'py-5 font-light'}>
          <a
            href="https://github.com/waiting33118/ntut-meet-react"
            rel="noreferrer"
            target="_blank"
            className={'mr-1 text-blue-600 underline'}
          >
            進一步了解
          </a>
          Ntut Meet
        </div>
      </div>
    </div>
  );
};
export default Left;
