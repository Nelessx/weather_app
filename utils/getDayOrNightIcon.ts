export default function getDayOrNightIcon(
    iconName: string,
    dateTimeString: string
): string{
    const hours = new Date(dateTimeString).getHours(); // Extract hours from the dateTimeString
    // Determine if it's day or night based on the hours
    
    const isDayTime = hours >= 6 && hours < 18; // Daytime is between 6 AM and 6 PM
    return isDayTime ? iconName.replace(/.$/, 'd') : iconName.replace(/.$/, 'n'); // Replace last character with 'd' for day or 'n' for night
}