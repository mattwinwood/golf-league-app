export default {
  extractCourseDetails(scorecard) {
    for (const response of scorecard.value) {
      let csvContent = `Course Name: ${response.course.name} (Front 9)\n`;
      return csvContent;
    }

  },
  extractTeeDetails(scorecard)  {
    const teesMap = new Map();
    const pars = [];
    const strokeIndexes = [];
    for (const response of scorecard.value) {
      for (const tee of response.tees) {

        const distances = [];
        for (let i = 1; i <= 9; i++) {
          const hole = tee.holes.find(h => h.holeNumber === i);

          if (hole) {
            distances.push(Math.round(hole.distance));
            pars.push(Math.round(hole.par));
            strokeIndexes.push(Math.round(hole.strokeIndex));
          }
        }

        // Check if all 9 holes have values
        if (distances.length === 9) {
          const gender = tee.gender;
          if (!teesMap.has(gender)) {
            teesMap.set(gender, {
              distances,
              pars,
              strokeIndexes
            });
          }
        }
      }
    }

    let csvContent = ''
    // Append Distance Data
    for (const [gender, data] of teesMap.entries()) {
      csvContent += `${gender}, ${data.distances.join(", ")}\n`;
    }

    // Append Par Data
    pars.length = 9
    csvContent += `Par, ${pars.join(", ")}\n`;

    strokeIndexes.length = 9
    console.log("", strokeIndexes);
    csvContent += `Handicap, ${strokeIndexes.join(", ")}\n`;

    return {csvContent, teesMap};
  },
  generateCsv(scorecard){
    let data = ''
    const teeData = this.extractTeeDetails(scorecard)
    data += this.extractCourseDetails(scorecard)
    data += teeData.csvContent
    const playersMap = this.extractPlayerScores(scorecard)
    const csvScoreData = this.getCsvContent(playersMap)
    data += csvScoreData
    return data
  },

  extractPlayerScores(scorecard)  {
    const playersMap = new Map();
    const teeData = this.extractTeeDetails(scorecard)
    const pars = teeData.teesMap.entries().next().value[1].pars;

    for (const response of scorecard.value) {
      for (const record of response.records) {
        const holeScores = [];

        for (let i = 1; i <= 9; i++) {
          const hole = record.holes.find(h => h.holeNumber === i);
          if (hole) {
            const adjustedScore = this.adjustScore(pars[i-1], hole.grossScore);
            holeScores.push(adjustedScore);
          }
        }

        // Check if all 9 holes have scores
        if (holeScores.length === 9) {
          const playerName = record.players[0].name;
          const totalScore = holeScores.reduce((acc, score) => acc + score, 0);

          if (!playersMap.has(playerName) || (playersMap.get(playerName)?.date || new Date(0)) < record.date) {
            if(record.state === "Completed") {
              playersMap.set(playerName, {
                date      : new Date(record.lastHoleFinishedAt),
                holeScores: holeScores,
                totalScore: totalScore
              });
            }
          }
        }
      }
    }
    return playersMap
  },
  getCsvContent(playersMap){

    let csvContent = ''
    csvContent += "Hole, 1, 2, 3, 4, 5, 6, 7, 8, 9, Total Score\n";
    for (const [playerName, data] of playersMap.entries()) {
      csvContent += `${playerName}, ${data.holeScores.join(", ")}, ${data.totalScore}\n`;
    }
    return csvContent;
  },
  adjustScore (holeNumber, grossScore) {
    if (!grossScore) return 0; // if player picked up

    switch (holeNumber) {
      case 3:
        return Math.min(grossScore, 7);
      case 4:
        return Math.min(grossScore, 8);
      case 5:
        return Math.min(grossScore, 9);
      default:
        return Math.min(grossScore, 9);
    }
  }
}
