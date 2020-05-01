export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (((height / 100) * height) / 100);

  if (bmi < 15) {
    return "Very severely underweight";
  } else if (bmi >= 15 && bmi < 16) {
    return "Severely underweight";
  } else if (bmi >= 16 && bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obese Class II (Severely obese)";
  } else {
    return "Obese Class III (Very severely obese)	";
  }
};

interface BmiValues {
  height: number,
  weight: number
}

const parseBmiArgs = (args: Array<string>): BmiValues => {
  if(args.length > 4) throw new Error('too many arguments, enter height in cm and weight in kg')
  if(args.length < 4) throw new Error('too few arguments, enter height in cm and weight in kg')

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  }else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const {height, weight} = parseBmiArgs(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error) {
  console.log('Error, something bad happened, message: ', error.message)
}
