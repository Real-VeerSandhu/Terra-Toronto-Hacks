import { IPoint, randomIPointInCircle, ILocation } from '../services/helper';
import { differenceInMinutes, addMinutes } from 'date-fns';

export const infectedLocations = [
    { latitude: 43.6875214, longitude: -79.7637835 },
    { latitude: 43.6658217, longitude: -79.7343035 },
];

export const personalLocations = [
    { latitude: 43.644377, longitude: -79.755049 },
    { latitude: 43.656433, longitude: -79.780023 },
    { latitude: 43.644377, longitude: -79.755049 },
    { latitude: 43.6645775, longitude: -79.7834997 },
    { latitude: 43.6680614, longitude: -79.8046107 },
    { latitude: 43.676046, longitude: -79.746058 },
    { latitude: 43.6512361, longitude: -79.7767496 },
    { latitude: 43.6383432, longitude: -79.7564171 },
    { latitude: 43.6388715, longitude: -79.7621492 },
    { latitude: 43.6875836, longitude: -79.7636955 } // <-- Close to first infected location
];

export function randomPointGen(iPoint: IPoint, startWindow: Date, endWindow: Date): ILocation {
    let time: Date;
    const point = randomIPointInCircle(iPoint, 0.01);
    const difference = differenceInMinutes(startWindow, endWindow);

    const randomMinute = getRandomInt(difference);
    time = addMinutes(startWindow, randomMinute).valueOf();

    return { iPoint: point, time };
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


export function distance(iPointA: IPoint, iPointB: IPoint): number {
    const R = 6371e3; // metres
    const φ1 = iPointA.latitude * Math.PI / 180; // φ, λ in radians
    const φ2 = iPointB.latitude * Math.PI / 180;
    const Δφ = (iPointB.latitude - iPointA.latitude) * Math.PI / 180;
    const Δλ = (iPointB.longitude - iPointA.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
}
