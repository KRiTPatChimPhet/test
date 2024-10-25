import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socketNamespace1: Socket;
    private socketNamespace2: Socket;

    constructor() {
        // เชื่อมต่อไปยัง namespace1
        this.socketNamespace1 = io('http://localhost:3001/namespace1', {
            transports: ['websocket'],
        });

        // เชื่อมต่อไปยัง namespace2
        this.socketNamespace2 = io('http://localhost:3001/namespace2', {
            transports: ['websocket'],
        });
    }

    // ฟังก์ชันเพื่อส่งข้อความไปยัง namespace1
    sendMessageToNamespace1(message: string) {
        this.socketNamespace1.emit('message1', message);
    }

    // ฟังก์ชันเพื่อรับข้อความจาก namespace1
    getMessageFromNamespace1(): Observable<string> {
        return new Observable((observer) => {
            this.socketNamespace1.on('message1', (data: string) =>
                observer.next(data)
            );
        });
    }

    // ฟังก์ชันเพื่อส่งข้อความไปยัง namespace2
    sendMessageToNamespace2(message: string) {
        this.socketNamespace2.emit('message2', message);
    }

    // ฟังก์ชันเพื่อรับข้อความจาก namespace2
    getMessageFromNamespace2(): Observable<string> {
        return new Observable((observer) => {
            this.socketNamespace2.on('message2', (data: string) =>
                observer.next(data)
            );
        });
    }
}
