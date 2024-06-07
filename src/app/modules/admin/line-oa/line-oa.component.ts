import { Component } from '@angular/core';

@Component({
    selector: 'app-line-oa',
    templateUrl: './line-oa.component.html',
    styleUrls: ['./line-oa.component.scss'],
})
export class LineOaComponent {
    fields: string[] = ['Field 1', 'Field 2', 'Field 3'];
    message: string = '';

    constructor() {}

    addFieldToMessage(field: string) {
        const textarea = <HTMLTextAreaElement>(
            document.getElementById('message')
        );
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        this.message =
            this.message.substring(0, startPos) +
            `<mark>${field}</mark>` +
            this.message.substring(endPos, this.message.length);
    }
}
