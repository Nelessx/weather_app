export function convertWindSpeed(speedInMetersPerSecond: number): string {
    const speedInKilometersPerHour = speedInMetersPerSecond * 3.6; // Convert m/s to km/h
    return `${speedInKilometersPerHour.toFixed(0)} km/h`; // Format to 1 decimal place
}