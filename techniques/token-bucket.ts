class TokenBucket {
  private capacity: number;
  private refillRate: number;
  private lastRefillTime: number;
  private currentToken: number;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.currentToken = capacity;
    this.lastRefillTime = Date.now();
  }

  private refill() {
    const now = Date.now();

    const timePastAfterLastRequestInSec = (now - this.lastRefillTime) / 1000;
    const tokenToRefillInTheTime =
      timePastAfterLastRequestInSec * this.refillRate;
    this.currentToken = Math.min(
      this.capacity,
      this.currentToken + tokenToRefillInTheTime,
    );

    this.lastRefillTime = now;
  }

  public allowRequest(requestedToken: number = 1) {
    // update state before request
    this.refill();

    if (requestedToken <= this.currentToken) {
      this.currentToken -= requestedToken;
      return true;
    }

    return false;
  }
}

// run
const tokenBucket = new TokenBucket(5, 1);
// console.log(tokenBucket.allowRequest());
console.log(tokenBucket.allowRequest(5));
