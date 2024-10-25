import { Component, OnInit } from '@angular/core';
import { SocketService } from 'app/core/socket/socket.service';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    message1 = '';
    message2 = '';
    messagesNamespace1: string[] = [];
    messagesNamespace2: string[] = [];

    constructor(private socketService: SocketService) {
        // รับข้อความจาก namespace1
        this.socketService.getMessageFromNamespace1().subscribe((message) => {
            this.messagesNamespace1.push(message);
        });

        // รับข้อความจาก namespace2
        this.socketService.getMessageFromNamespace2().subscribe((message) => {
            this.messagesNamespace2.push(message);
        });
    }

    sendMessageToNamespace1() {
        if (this.message1.trim()) {
            this.socketService.sendMessageToNamespace1(this.message1);
            this.message1 = '';
        }
    }

    sendMessageToNamespace2() {
        if (this.message2.trim()) {
            this.socketService.sendMessageToNamespace2(this.message2);
            this.message2 = '';
        }
    }
}
