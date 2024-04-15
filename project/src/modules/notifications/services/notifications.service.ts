import { Injectable } from '@nestjs/common';
import { Socket } from 'net';
import { PromiseSocket } from 'promise-socket';
import { Buffer } from 'buffer';

@Injectable()
export class NotificationsService {
  async notifyNewImageAdded(
    host: string,
    port: number,
    imageId: string,
    siteId: string,
  ) {
    console.log(port);
    const socket = new PromiseSocket(new Socket());
    await socket.connect(port, host);

    const message = `0|${imageId}|${siteId}`;

    const buffer = Buffer.from(message, 'utf8');

    await socket.write(buffer);
    const response: string | Buffer = await socket.read(1);
    console.log(response.toString());

    socket.destroy();
  }

  async notifyImageDeleted(
    host: string,
    port: number,
    imageId: string,
    siteId: string,
  ) {
    const socket = new PromiseSocket(new Socket());
    await socket.connect(port, host);

    const message = `1|${imageId}|${siteId}`;

    const buffer = Buffer.from(message, 'utf8');

    await socket.write(buffer);
    const response: string | Buffer = await socket.read(1);
    console.log(response.toString());

    socket.destroy();
  }
}
