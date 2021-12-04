import { BucketEvent } from '../../index';

export default class ChatEvent extends BucketEvent {
  author: string;
  body: string;

  constructor(author: string, bodyContents: string) {
    super();
    this.author = author;
    this.body = bodyContents;
  }
}
