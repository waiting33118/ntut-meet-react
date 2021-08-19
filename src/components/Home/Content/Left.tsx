const Left = () => {
  const joinRoomHandler = () => {};

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
          在疫情時代下，師生、團隊的最佳溝通利器
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
          />
          <button onClick={joinRoomHandler}>加入</button>
        </div>
        <div className={'py-5 font-light'}>進一步了解 Ntut Meet</div>
      </div>
    </div>
  );
};
export default Left;
