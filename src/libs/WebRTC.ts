class WebRTC {
  private readonly DEFAULT_VIDEO_HEIGHT: number = 1280;
  private readonly DEFAULT_VIDEO_WIDTH: number = 720;
  private readonly DEFAULT_FACE_MODE: string = 'user';

  getLocalStream() {
    return navigator.mediaDevices.getUserMedia({
      video: {
        height: this.DEFAULT_VIDEO_HEIGHT,
        width: this.DEFAULT_VIDEO_WIDTH,
        facingMode: this.DEFAULT_FACE_MODE
      },
      audio: true
    });
  }

  initPeerConnection() {
    return new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun1.l.google.com:19302' }]
    });
  }
}

export default WebRTC;
