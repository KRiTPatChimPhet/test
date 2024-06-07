import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineOaComponent } from './line-oa.component';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const lineRoutes: Route[] = [
    {
        path: '',
        component: LineOaComponent,
    },
];

@NgModule({
    declarations: [LineOaComponent],
    imports: [
        RouterModule.forChild(lineRoutes),
        SharedModule,
        CommonModule,
        FormsModule,
    ],
})
export class LineOaModule {}
