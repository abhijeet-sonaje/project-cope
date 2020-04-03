import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MapViewComponent } from './map-view/map-view.component';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { DashboardRoutes } from './dashboard.routing';


@NgModule({
    declarations: [
        MapViewComponent,
        GraphViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
    ]
})
export class DashboardModule { }
