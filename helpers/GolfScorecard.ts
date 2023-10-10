type ParType = 3 | 4 | 5;

class GolfScorecard {
  private scores: Map<number, number>; // key is hole number, value is the score for that hole

  constructor() {
    this.scores = new Map();
  }

  // Add or update the score for a specific hole
  addScore(hole: number, score: number, par: ParType): void {
    let adjustedScore = this.adjustScore(score, par);
    this.scores.set(hole, adjustedScore);
  }

  // Adjust the score based on the par value
  private adjustScore(score: number, par: ParType): number {
    switch (par) {
      case 3:
        return Math.min(score, 6);
      case 4:
        return Math.min(score, 7);
      case 5:
        return Math.min(score, 8);
      default:
        throw new Error("Invalid par value");
    }
  }

  // Allow a player to pick up after X amount of shots
  pickUp(hole: number, shotsTaken: number, par: ParType): void {
    // Adjust the shots taken to get the appropriate score when a player picks up
    let adjustedScore = this.adjustScore(shotsTaken + 1, par); // +1 because the player would've taken one more shot to hole out
    this.scores.set(hole, adjustedScore);
  }

  // Get the score for a specific hole
  getScore(hole: number): number | undefined {
    return this.scores.get(hole);
  }

  // Print the scorecard
  printScorecard(): void {
    console.log("Hole\tScore");
    this.scores.forEach((score, hole) => {
      console.log(`${hole}\t${score}`);
    });
  }
}


export default GolfScorecard;
