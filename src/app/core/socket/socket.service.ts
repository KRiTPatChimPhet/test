import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socketOrder: Socket;

    constructor() {
        this.socketOrder = io('http://localhost:3000/orders', {
            transports: ['websocket'],
            auth: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhhODQyYTJhNGJhZTAwMTkzNmNiYTkiLCJmaXJzdE5hbWUiOiLguIHguKTguJUiLCJsYXN0TmFtZSI6IuC4m-C4seC4iOC4ieC4tOC4oeC5gOC4nuC5h-C4iuC4oyIsImRlcGFydG1lbnQiOiJBTEwiLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3MzAxMDY0MDQsImV4cCI6MTczMDE5MjgwNCwiYXVkIjoiTGFtdW5waGFuIiwiaXNzIjoiTGFtdW5waGFuIn0.Uo-Re5fFAoXGHMatyPDsKt7G5BihqEli-5dSQKkBuYs',
            },
        });
    }

    sendMessage(message: string) {
        this.socketOrder.emit('message', message);
    }

    getMessage(): Observable<string> {
        return new Observable((observer) => {
            this.socketOrder.on('message', (data: string) =>
                observer.next(data)
            );
        });
    }

    connect() {
        if (!this.socketOrder.connected) {
            this.socketOrder.connect();
        }
    }

    disconnect() {
        if (this.socketOrder.connected) {
            this.socketOrder.disconnect();
        }
    }
}
