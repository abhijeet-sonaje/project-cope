import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../app.module';

import { MapViewComponent } from './map-view/map-view.component';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { SvgComponent } from './svg/svg.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardRoutes } from './dashboard.routing';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        MapViewComponent,
        GraphViewComponent,
        SvgComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        ChartsModule
    ]
})
export class DashboardModule { }
