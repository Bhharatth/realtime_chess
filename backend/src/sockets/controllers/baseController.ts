import { Socket } from 'socket.io';

export default class BaseController {
   socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
}