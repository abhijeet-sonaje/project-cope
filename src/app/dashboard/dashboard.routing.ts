import { Routes } from "@angular/router";

import { MapViewComponent } from "./map-view/map-view.component";
import { GraphViewComponent } from "./graph-view/graph-view.component";
import { ContactViewComponent } from "./contact-view/contact-view.component";

export const DashboardRoutes: Routes = [
    {
        path: "",
        children: [
            {
                path: "map-view",
                component: MapViewComponent,
            },
            {
                path: "graph-view",
                component: GraphViewComponent,
            },
            {
                path: "contact-view",
                component: ContactViewComponent,
            },
        ],
    },
];
