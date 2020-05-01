interface Result {
  numDays: number;
  numTrainingDays: number;
  originalTargetValue: number;
  averageTime: number;
  isReached: boolean;
  rating: 1 | 2 | 3;
  ratingExplanation: string;
}

const calculateExercises = (
  dailyHours: Array<number>,
  targetHours: number
): Result => {

  const average = dailyHours.reduce((a, b) => a + b) / dailyHours.length

  return {
    numDays: dailyHours.length,
    numTrainingDays: dailyHours.filter(h => h > 0).length,
    originalTargetValue: targetHours,
    averageTime: average,
    isReached: average >= targetHours,
    rating: 1,
    ratingExplanation: "not too bad but could be better",
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
