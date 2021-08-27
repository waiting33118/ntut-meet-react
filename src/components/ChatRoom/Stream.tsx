import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { toJSON } from '../../libs/utilities';
import WebRTC from '../../libs/WebRTC';
import { ws } from '../../libs/webSocket';
import { UserContext } from '../../store/UserContext';
import styles from './Stream.module.css';
const webRTC = new WebRTC();

enum EventTypes {
  NEW_USER = 'newUser',
  CHAT = 'chat',
  OFFER = 'offer',
  ANWSER = 'anwser',
  CANDIDATE = 'candidate'
}

interface PC {
  pc: RTCPeerConnection;
  username: string;
}

const Stream = () => {
  const ctx = useContext(UserContext);
  const { userInfo } = ctx!;
  const streamWrapperRef = useRef<HTMLDivElement>(null);
  const localStreamRef = useRef<HTMLDivElement>(null);
  const [pcStore, setPcStore] = useState<PC[]>([]);

  useEffect(() => {
    const localVideoEl = document.createElement('video');
    localVideoEl.srcObject = userInfo.localStream;
    localVideoEl.autoplay = true;
    localVideoEl.classList.add('rounded-md');
    localStreamRef.current?.append(localVideoEl);
  }, [userInfo.localStream]);

  ws.addEventListener('message', async (e) => {
    const receive: IMsgFormat = JSON.parse(e.data);

    switch (receive.event) {
      /*
      NEW USER
      */
      case EventTypes.NEW_USER:
        {
          const pc = webRTC.initPeerConnection();
          userInfo
            .localStream!.getTracks()
            .forEach((track) => pc.addTrack(track, userInfo.localStream!));

          //candidate
          pc.addEventListener('icecandidate', (e) => {
            if (e.candidate) {
              ws.send(
                toJSON({
                  event: EventTypes.CANDIDATE,
                  payload: {
                    username: userInfo.username,
                    message: e.candidate,
                    toUser: receive.payload.username
                  }
                })
              );
            }
          });

          // track
          pc.addEventListener('track', (e) => {
            if (e.track.kind === 'video') {
              const wrapperEl = document.createElement('div');
              wrapperEl.classList.add(
                'w-full,',
                'h-7',
                'rounded-md',
                'object-cover'
              );
              const remoteVideoEl = document.createElement('video');
              remoteVideoEl.srcObject = e.streams[0];
              remoteVideoEl.autoplay = true;
              remoteVideoEl.classList.add('rounded-md');
              wrapperEl.append(remoteVideoEl);
              streamWrapperRef.current?.append(wrapperEl);
            }
          });

          // sdp negotiation
          const offer = await pc.createOffer();
          ws.send(
            toJSON({
              event: EventTypes.OFFER,
              payload: {
                username: userInfo.username,
                message: offer,
                toUser: receive.payload.username
              }
            })
          );
          await pc.setLocalDescription(offer);

          /*
            store each peer connection seperate by trigger user
            ex:
            1. you join room, wait for another user
            2. A user come in
            3. you recieve 'newUser' event
            4. send offer and candidate to broker
            5. save A's pc in store 
            */

          setPcStore((prev) => [
            ...prev,
            { pc: pc, username: receive.payload.username }
          ]);
        }
        break;

      /*
      GET OFFER
      create new pc
      save pc to pcStore
      ---
        1. return answer
        2. set username: self (userInfo.username)
        3. offer set to remote sdp
      */
      case EventTypes.OFFER:
        if (receive.payload.toUser === userInfo.username) {
          const pc = webRTC.initPeerConnection();
          userInfo
            .localStream!.getTracks()
            .forEach((track) => pc.addTrack(track, userInfo.localStream!));

          //candidate
          pc.addEventListener('icecandidate', (e) => {
            if (e.candidate) {
              ws.send(
                toJSON({
                  event: EventTypes.CANDIDATE,
                  payload: {
                    username: userInfo.username,
                    message: e.candidate,
                    toUser: receive.payload.username
                  }
                })
              );
            }
          });

          // track
          pc.addEventListener('track', (e) => {
            if (e.track.kind === 'video') {
              const wrapperEl = document.createElement('div');
              wrapperEl.classList.add(
                'w-full,',
                'h-7',
                'rounded-md',
                'object-cover'
              );
              const remoteVideoEl = document.createElement('video');
              remoteVideoEl.srcObject = e.streams[0];
              remoteVideoEl.autoplay = true;
              remoteVideoEl.classList.add('rounded-md');
              wrapperEl.append(remoteVideoEl);
              streamWrapperRef.current?.append(wrapperEl);
            }
          });

          // sdp negotiation
          await pc.setRemoteDescription(
            receive.payload.message as RTCSessionDescriptionInit
          );
          const anwser = await pc.createAnswer();
          await pc.setLocalDescription(anwser);
          ws.send(
            toJSON({
              event: EventTypes.ANWSER,
              payload: {
                username: userInfo.username,
                message: anwser,
                toUser: receive.payload.username
              }
            })
          );

          setPcStore((prev) => [
            ...prev,
            { pc: pc, username: receive.payload.username }
          ]);
        }
        break;

      /*
        answer set to remote sdp
      */
      case EventTypes.ANWSER:
        if (receive.payload.toUser === userInfo.username) {
          const username = receive.payload.username;
          pcStore.forEach((store) => {
            if (store.username === username) {
              store.pc.setRemoteDescription(
                receive.payload.message as RTCSessionDescriptionInit
              );
            }
          });
        }
        break;

      // addcandidate
      case EventTypes.CANDIDATE:
        if (receive.payload.toUser === userInfo.username) {
          const username = receive.payload.username;
          pcStore.forEach((store) => {
            if (store.username === username) {
              store.pc.addIceCandidate(
                receive.payload.message as RTCIceCandidate
              );
            }
          });
        }
        break;
    }
  });

  return (
    <div
      className={`${styles.scroll} w-4/5 flex-auto mr-3 grid grid-cols-3 grid-flow-row-dense gap-2 overflow-y-auto`}
      ref={streamWrapperRef}
    >
      <div
        className={'w-full h-7 rounded-md object-cover'}
        ref={localStreamRef}
      ></div>
    </div>
  );
};

export default Stream;
