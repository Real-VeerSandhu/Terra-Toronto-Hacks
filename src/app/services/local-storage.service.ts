import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private storage: Storage) { }

  async create(data): Promise<void> {
    const online: boolean = navigator.onLine;
    const result = await this.storage.set(`${new Date().valueOf()}`, data);
  }
  async getData() {
    return this.storage.forEach(r => {
      console.log('R', r);
    });
  }
}
