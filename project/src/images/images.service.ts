import { Injectable } from '@nestjs/common';

@Injectable()
export class ImagesService {
  getAllImages() {
    return { images: 'https://picsum.photos/200/300' };
  }

  async addImage() {
    return;
  }
}
