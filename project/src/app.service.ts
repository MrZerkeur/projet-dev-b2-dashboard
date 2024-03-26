import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getRandomWebsiteName(websiteNames: string[]): string {
    return websiteNames[Math.floor(Math.random() * websiteNames.length)];
  }
}
