import { Injectable } from '@nestjs/common';
import { Socket } from 'net';
import { PromiseSocket } from 'promise-socket';

@Injectable()
export class NotificationsService {
  async notifyTextModifications() {
    const socket = new PromiseSocket(new Socket());

    await socket.connect(12345, '127.0.0.1');
    await socket.write('Update: texts');
    const response: string | Buffer = await socket.read(1024);
    console.log(response.toString());

    socket.destroy();

    return response.toString();
  }

  async notifyImageModifications() {
    const socket = new PromiseSocket(new Socket());

    await socket.connect(12345, '127.0.0.1');
    await socket.write('Update: images');
    const response: string | Buffer = await socket.read(1024);
    console.log(response.toString());

    socket.destroy();

    return response.toString();
  }
}
