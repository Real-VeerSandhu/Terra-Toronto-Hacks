import { firebaseConfig } from 'src/core/config';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IGeoLocation } from './geolocation.service';



export function dbPost(data) {
  const createResponse = fetch(firebaseConfig.databaseURL + `/infected-data.json`, {
    // const createResponse = fetch(fireDeubugServer.databaseURL + '/mock-gps.json', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Origin': null
    }
  });
  return createResponse;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private db: AngularFireDatabase) { }

  addData(data: IGeoLocation, path: string) {
    const ref = this.db.list(path);

    // const itemRef = this.db.object('infected-data');
    try {
      ref.push(data);
    } catch (error) {
      console.log(error);
    }
  }
  updateData(data: {}, path) {
    const ref = this.db.object(path);

    try {
      ref.set(data);
    } catch (error) {
      console.log(error);
    }
  }
  getData(path: string) {
    const ref = this.db.list(path);
    return ref.valueChanges();
  }
}
