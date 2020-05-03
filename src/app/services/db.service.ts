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

  addData(data: IGeoLocation) {
    const ref = this.db.list('infected-data');

    // const itemRef = this.db.object('infected-data');
    try {
      ref.push(data);
    } catch (error) {
      console.log(error);
    }
  }
  getData() {
    const ref = this.db.list('infected-data');
    return ref.valueChanges();

  }
}
