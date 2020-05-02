import { firebaseConfig } from 'src/core/config';


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
}

