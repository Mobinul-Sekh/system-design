class LeakyBucket {
  private capacity: number;
  private leakRate: number;
  private currentWater: number;
  private lastLeakedTime: number;

  constructor(capacity: number, leakRate: number) {
    this.capacity = capacity;
    this.leakRate = leakRate;
    this.currentWater = 0;
    this.lastLeakedTime = Date.now();
  }

  private leak() {
    const now = Date.now();

    const timePassedAfterLastLeakInSec = (now - this.lastLeakedTime) / 1000;
    const waterLeakInThatTime = timePassedAfterLastLeakInSec * this.leakRate;

    this.currentWater = Math.max(0, this.currentWater + waterLeakInThatTime);

    this.lastLeakedTime = now;
  }

  public allowRequst(incomingWater: number = 1) {
    this.leak();

    if (this.currentWater + incomingWater <= this.capacity) {
      this.currentWater += incomingWater;
      return true;
    }

    return false;
  }
}

// run
const leakyBucket = new LeakyBucket(10, 2);
// console.log(leakyBucket.allowRequst(2));
console.log(leakyBucket.allowRequst(9));
