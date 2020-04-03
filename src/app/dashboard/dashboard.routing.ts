import { Routes } from '@angular/router';

import { MapViewComponent } from './map-view/map-view.component';
import { GraphViewComponent } from './graph-view/graph-view.component';

export const DashboardRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'map-view',
            component: MapViewComponent
        }, {
            path: 'graph-view',
            component: GraphViewComponent
        }]
    }
];