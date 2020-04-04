import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';

interface State {
    short_code: string;
    name: string;
    svg_path: string;
    score: number,
    overall: number,
    district: Array<District>
}

interface District {
    name: string;
    score: number,
    overall: number,
}

declare const $: any;
@Component({
    selector: 'app-map-view',
    templateUrl: './map-view.component.html',
    styleUrls: ['./map-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class MapViewComponent implements OnInit {

    selectedState: State;

    /** list of states */
    states: State[] = [];

    gradientColors = ["#0295e1", "#0492dc", "#068fd8", "#098cd3", "#0b89cf", "#0d86ca", "#0f83c6", "#1180c1", "#137dbd", "#167ab8", "#1877b4", "#1a74af", "#1c71ab", "#1e6ea6", "#206ba2", "#23689d", "#256599", "#276294", "#295f90", "#2b5c8b", "#2d5987", "#2f5682", "#32537e", "#345079", "#364d75", "#384b70", "#3a486c", "#3c4567", "#3f4263", "#413f5e", "#433c5a", "#453955", "#473651", "#49334c", "#4b3048", "#4e2d43", "#502a3f", "#52273a", "#542436", "#562131", "#581e2d", "#5b1b28", "#5d1824", "#5f151f", "#61121b", "#630f16", "#650c12", "#68090d", "#6a0609", "#6c0304"];

    svgDocument;

    constructor(private dataService: DataService, public sanitizer: DomSanitizer,
        private ref: ChangeDetectorRef, private router: Router) {
        this.dataService.getStateJSON().subscribe((res) => {
            this.states = res.data;
            this.selectedState = this.states[0];
            this.dispatchSelectChangeEvent(this.selectedState);
            this.listenerForOnLoadMap();
        });
    }

    ngOnInit() {
    }

    listenerForOnLoadMap() {
        const that = this;
        document.addEventListener("__loadedMap", function (e: any) {
            that.svgDocument = document['svg-id'].contentWindow.document;
            if (that.selectedState.short_code === "IN") {
                for (let i = 1; i < that.states.length; i++) {
                    const currentState: State = that.states[i];
                    currentState.name = currentState.name.toUpperCase();
                    that.fillColor(currentState.name, currentState.score)
                }
            } else {
                for (let i = 0; i < that.selectedState.district.length; i++) {
                    const currentDistrict: District = that.selectedState.district[i];
                    currentDistrict.name = currentDistrict.name;
                    that.fillColor(currentDistrict.name, currentDistrict.score)
                }
            }
        });
    }

    fillColor(title, score) {
        const path = this.svgDocument.querySelector(`path[title="${title}"]`);
        if (path) {
            path.setAttribute("fill", this.gradientColors[score * 10 - 1]);
        } else {
            console.log('Title : ', title);
        }
    }

    selectionOnChangeEvent() {
        const data = { ... this.selectedState };
        if (data.district)
            delete data.district;
        this.dispatchSelectChangeEvent(data);
    }

    dispatchSelectChangeEvent(data) {
        const e = new CustomEvent("__selectionChange", {
            detail: data
        });
        document.dispatchEvent(e);
    }
}