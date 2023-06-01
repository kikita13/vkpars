export class DelayHelper {
  static delay(ms) {
    return new Promise((r) => setTimeout(() => r(), ms));
  }
}