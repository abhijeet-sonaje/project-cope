import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from './../../services/data.service';

interface State {
    short_code: string;
    name: string;
    svg_path: string;
}

@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

    selectedState: State;

    /** list of states */
    states: State[] = [];

    constructor(private dataService: DataService, private sanitizer: DomSanitizer) {
        this.dataService.getStateJSON().subscribe((res) => {
            this.states = res.data;
            this.selectedState = this.states[0];
        });
    }

    ngOnInit() {
    }

    getSvgUrl(controller) {
        if (controller && controller.svg_path) {
            return this.sanitizer.bypassSecurityTrustResourceUrl(`./assets/svg/${controller.svg_path}`);
        }
    }
}