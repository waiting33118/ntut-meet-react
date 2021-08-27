type MessageProps = {
  username: string;
  timestamp: string;
  message: string;
};

const Message = (props: MessageProps) => {
  return (
    <li className={'text-right break-words mb-3'}>
      <div className={'w-full flex align-center space-x-2'}>
        <span>{props.username}</span>
        <span className={'text-gray-400 text-sm'}>{props.timestamp}</span>
      </div>
      <div className={'text-left'}>{props.message}</div>
    </li>
  );
};

export default Message;
