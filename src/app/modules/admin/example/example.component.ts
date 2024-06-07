import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    textMessage: string = '';
    buttonTitle: string = '';
    buttonText: string = '';
    numActions: number = 1;
    buttonAction: string = '';
    selectedLabel: string = 'TEXT';

    datas: string[] = ['Title', 'FirstName', 'LastName'];
    selectedDatas: string[] = [];

    @ViewChild('myinput') myInput: ElementRef;
    cursorPosition: Range;
    message: string = '';

    ngAfterViewInit() {}

    onTabChange(event: MatTabChangeEvent): void {
        this.selectedLabel = event.tab.textLabel;
    }

    updatePreview(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement) {
            switch (inputElement.getAttribute('ng-reflect-name')) {
                case 'title':
                    this.buttonTitle = inputElement.value;
                    break;
                case 'text':
                    this.buttonText = inputElement.value;
                    break;
                case 'action':
                    this.buttonAction = inputElement.value;
                    break;
            }
        }
    }

    onFocusOut(event: FocusEvent) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            this.cursorPosition = range;
        }
    }

    addSelectedDatasToQuote() {
        const quoteElement = this.myInput.nativeElement;

        this.selectedDatas.forEach((data) => {
            const mark = document.createElement(`mark`);
            mark.textContent = data;
            this.cursorPosition.insertNode(mark);
        });

        this.updatePreviewMessage({ target: quoteElement });
    }

    addFieldToMessage(field: string) {
        const quoteElement = this.myInput.nativeElement;

        const textarea = <HTMLTextAreaElement>(
            document.getElementById('message')
        );
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        this.message =
            this.message.substring(0, startPos) +
            `<mark>${field}</mark>` +
            this.message.substring(endPos, this.message.length);

        this.updatePreviewMessage({ target: quoteElement });
    }

    updatePreviewMessage(event: any): void {
        this.textMessage = event.target.innerHTML;
    }

    updateSelectedDatas(selectedOptions) {
        this.selectedDatas = selectedOptions.map((option) => option.value);
    }
}
