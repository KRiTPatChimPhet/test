import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements AfterViewInit   {
    // message for inner text
    @Input() textMessage: string = '';

    // message for inner html
    @Input() textHtml: string = 'test<div>test</div><div>test</div><div>set</div><div>set</div><div><br></div>';


    @ViewChild('myInput') myInput: ElementRef;
    cursorPosition: Range;
    datas: string[] = ['Title', 'FirstName', 'LastName'];
    selectedDatas: string[] = [];


    buttonTitle: string = '';
    buttonText: string = '';
    numActions: number = 1;
    buttonAction: string = '';
    selectedLabel: string = 'TEXT';

    message: string = '';

    constructor(
        private ref: ChangeDetectorRef,
    ) {

    }

    ngAfterViewInit() {
        // this.myInput.nativeElement.innerText = this.textMessage;
        // this.textHtml = this.myInput.nativeElement.innerHTML;
        this.myInput.nativeElement.innerHTML = this.textHtml;
        this.textMessage = this.myInput.nativeElement.innerText;
    }

    onFocusOut(event: FocusEvent): void {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            this.cursorPosition = range;
        }
    }

    onKeydown(event): void {
        console.log('keydown --> ', event);
        const keyCode = event.code;
        console.log(keyCode);
        if (keyCode === 'Delete' || keyCode === 'Backspace') {
            const selection = window.getSelection();
            const cusPos = selection.getRangeAt(0);

            // Check delete mark node -> delete all content in mark
            const isMarkNode = cusPos.startContainer.parentNode.nodeName === 'MARK';
            console.log('is mark node --> ', isMarkNode);

            if (isMarkNode) {
                cusPos.selectNode(cusPos.startContainer.parentNode);
                cusPos.deleteContents();
            }


            console.log(cusPos);
        }

    }

    addSelectedDatasToQuote() {
        const quoteElement = this.myInput.nativeElement;

        let data;
        if (this.selectedDatas?.length > 0) {
            data = this.selectedDatas[0];

            console.log(this.cursorPosition);

            const mark = document.createElement(`mark`);
            mark.textContent = `{{${data}}}`;

            this.cursorPosition.deleteContents();
            this.cursorPosition.insertNode(mark);

            this.cursorPosition.setStartBefore(mark);
            this.cursorPosition.insertNode(document.createTextNode('\xA0'));

            this.cursorPosition.setStartAfter(mark)
            this.cursorPosition.insertNode(document.createTextNode('\xA0'));
        }

        this.updatePreviewMessage({ target: quoteElement });
    }


    updatePreviewMessage(event: any): void {
        // const text = event.target.innerText;

        // console.log(text);

        this.textMessage = event.target.innerText
        this.textHtml = event.target.innerHTML;

        console.log('text Message --> ', this.textMessage);
        console.log('text Html --> ', this.textHtml);

    }


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

    updateSelectedDatas(selectedOptions) {
        this.selectedDatas = selectedOptions.map((option) => option.value);
    }
}
