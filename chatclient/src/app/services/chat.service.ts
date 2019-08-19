import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private socket: any;
  connect(username: string, callback: Function = () => { }): void {
    // initialize the connection
    this.socket = io('http://localhost:8000');

    this.socket.on('error', error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    });

    this.socket.on('connect', () => {
      this.sendUser(username);
      console.log('connected to the chat server');
      callback();
    });
  }

  sendUser(username: string): void {
    this.socket.emit('username', { username: username });
  }
  getActiveList(): void {
    this.socket.emit('getactive');
  }
}