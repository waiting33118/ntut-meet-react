type TEventTypes = 'newUser' | 'chat' | 'offer' | 'anwser' | 'candidate';

interface MessageType {
  username: string;
  message: string | RTCSessionDescriptionInit | RTCIceCandidate;
  toUser?: string;
}

interface IMsgFormat {
  event: TEventTypes;
  payload: MessageType;
}
