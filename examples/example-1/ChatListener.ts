import ChatEvent from './ChatEvent';
import { BucketEventListener, EventHandler } from '../../index';

export default class ChatListener extends BucketEventListener {
  @EventHandler()
  onChat(event: ChatEvent) {
    console.log(`author: ${event.author}, body: ${event.body}`);
  }
}
