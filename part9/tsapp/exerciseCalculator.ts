interface Result {
  numDays: number;
  numTrainingDays: number;
  originalTargetValue: number;
  averageTime: number;
  isReached: boolean;
  rating: 1 | 2 | 3;
  ratingExplanation: string;
}

export const calculateExercises = (
  dailyHours: Array<number>,
  targetHours: number
): Result => {
  const average = dailyHours.reduce((a, b) => a + b) / dailyHours.length;

  return {
    numDays: dailyHours.length,
    numTrainingDays: dailyHours.filter((h) => h > 0).length,
    originalTargetValue: targetHours,
    averageTime: average,
    isReached: average >= targetHours,
    rating: 1,
    ratingExplanation: "not too bad but could be better",
  };
};

interface ExerciseValues {
  dailyHours: Array<number>;
  targetHours: number;
}

const parseExerciseArgs = (args: Array<string>): ExerciseValues => {
  if (args.length < 4)
    throw new Error(
      "too few arguments, enter target hours and then hours for each day"
    );
  const isAllNumbers =
    args.slice(2).filter((v) => !isNaN(Number(v))).length === args.length - 2;
  if (isAllNumbers) {
    return {
      dailyHours: args.slice(3).map((v) => Number(v)),
      targetHours: Number(args[2]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { dailyHours, targetHours } = parseExerciseArgs(process.argv);
  console.log(calculateExercises(dailyHours, targetHours));
} catch (error) {
  console.log("Error, something bad happened, message: ", error.message);
}
