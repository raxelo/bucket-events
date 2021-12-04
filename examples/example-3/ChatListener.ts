import ChatEvent from './ChatEvent';
import { BucketEventListener, EventHandler, EventPriority } from '../../index';

export default class ChatListener extends BucketEventListener {
  private bannedNames = ['lucas', 'raxel'];

  private nameIsBanned(author: string) {
    return this.bannedNames.includes(author.toLowerCase());
  }

  private messageIsSpecial(messageBody: string) {
    return messageBody.includes('🐙');
  }

  /**
   * Prints the chat event.
   */
  @EventHandler()
  onChat(event: ChatEvent) {
    console.log(`author: ${event.author}, body: ${event.body}`);
  }

  /**
   * Cancel chat events if the name is banned.
   */
  @EventHandler({ eventPriority: EventPriority.LOWEST })
  handleBannedUsernames(event: ChatEvent) {
    if (!this.nameIsBanned(event.author)) return;

    event.setCancelled(true);
  }

  /**
   * Uncancel chat events in rare cases where the body contains an octopus emoji 🐙.
   */
  @EventHandler({ eventPriority: EventPriority.LOW, ignoreCancelled: true })
  handleOctopusEdgeCase(event: ChatEvent) {
    if (this.messageIsSpecial(event.body)) {
      event.setCancelled(false);
    }
  }
}
