import { Component, OnInit } from '@angular/core';
import { SocketService } from 'app/core/socket/socket.service';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    message1 = '';
    messagesNamespace1: string[] = [];

    constructor(private socketService: SocketService) {
        this.socketService.getMessage().subscribe((message) => {
            this.messagesNamespace1.push(message);
        });
    }

    sendMessageToNamespace1() {
        if (this.message1.trim()) {
            this.socketService.sendMessage(this.message1);
            this.message1 = '';
        }
    }

    connectToServer() {
        this.socketService.connect();
    }

    disconnectFromServer() {
        this.socketService.disconnect();
    }
}
