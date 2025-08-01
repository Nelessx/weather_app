export function metersToKilometers(visibilityInMeters: number): string { 
    const visibilityInKilometers = visibilityInMeters / 1000; // Convert meters to kilometers
    return `${visibilityInKilometers.toFixed(0)} km`; // Convert to kilometers and format to 0 decimal places
}