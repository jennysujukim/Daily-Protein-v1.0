
export const CalculateIntake = (age, gender, height, weight, activity, goal) => {

    // calculate Basal Metabolic Rate
    let bmr = 0
    if (gender === 'Male'){
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else if (gender === 'Female'){
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // calcualte activity factor
    let activityFactor = 0

    switch (activity) {
        case 'No Active':
            activityFactor = 1.2
            break
        case 'Low Active':
            activityFactor = 1.375
            break
        case 'Average':
            activityFactor = 1.55
            break
        case 'Active':
            activityFactor = 1.725
            break
        case 'Highly Active':
            activityFactor = 1.9
            break
        default:
            activityFactor = 0
            break
    }
    
    // multiply bmr with activity factor
    const updatedBmr = bmr * activityFactor

    // calculate entire calories first
    let calorieIntake = 0
    switch (goal) {
        case 'Loose weight':
            calorieIntake = updatedBmr * 0.9
            break
        case 'Gain weight':
            calorieIntake = updatedBmr + 500
            break
        case 'Maintain weight':
            calorieIntake = updatedBmr
            break
        default:
            calorieIntake = 0
            break
    }

    // calculate protein percentage
    let proteinPercentage = 0
    if ( goal === 'Loose weight') {
        proteinPercentage = 0.4
    } else if ( goal === 'Gain weight' || goal === 'Maintain weight') {
        proteinPercentage = 0.3
    }

    // calculate protein calories (4cal per gram of protein)
    const proteinCal = calorieIntake * proteinPercentage
    const proteinAmount = proteinCal / 4


    return Math.round(proteinAmount)
}