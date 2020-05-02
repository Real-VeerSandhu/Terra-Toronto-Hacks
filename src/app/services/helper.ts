import {round} from 'lodash';

export interface IPoint {
    latitude: number;
    longitude: number;
}

export function randomIPointInCircle(iPoint: IPoint, radius: number, param: 'miles' | 'km' = 'km') {
    // Convert radius from meters to degrees.
    const radiusInDegrees = radius * 1000 / 111320;

    // Get a random distance and a random angle.
    const u = Math.random();
    const v = Math.random();
    const w = radiusInDegrees * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);
    // Compensate the x value.
    // convert lat degrees to radians
    const newX = x / Math.cos(iPoint.latitude * Math.PI / 180);

    const foundLatitude = round((iPoint.latitude + y), 6);
    const foundLongitude = round((iPoint.longitude + newX), 6);
    const randomIPoint: IPoint = { latitude: foundLatitude, longitude: foundLongitude };
    return randomIPoint;
}
