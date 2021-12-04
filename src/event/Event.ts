/**
 * Extend from this class to create events.
 */
class BucketEvent {
  cancelled = false;

  public setCancelled(value = true) {
    this.cancelled = value;
  }
}

export default BucketEvent;
