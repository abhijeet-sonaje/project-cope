import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { DataService } from "./../../services/data.service";
import { Router } from "@angular/router";

interface State {
    short_code: string;
    name: string;
    svg_path: string;
    score: number;
    overall: number;
    district: Array<District>;
}

interface District {
    name: string;
    score: number;
    overall: number;
}

declare const $: any;
@Component({
    selector: "app-map-view",
    templateUrl: "./map-view.component.html",
    styleUrls: ["./map-view.component.scss"],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MapViewComponent implements OnInit {
    selectedState: State;

    /** list of states */
    states: State[] = [];

    gradientColors = [
        "#05fa00",
        "#0af500",
        "#0ff000",
        "#14eb00",
        "#19e600",
        "#1ee100",
        "#23dc00",
        "#28d700",
        "#2dd200",
        "#32cd00",
        "#37c800",
        "#3cc300",
        "#41be00",
        "#46b900",
        "#4bb400",
        "#50af00",
        "#55aa00",
        "#5aa500",
        "#5fa000",
        "#649b00",
        "#699600",
        "#6e9100",
        "#738c00",
        "#788700",
        "#7d8200",
        "#827d00",
        "#877800",
        "#8c7300",
        "#916e00",
        "#966900",
        "#9b6400",
        "#a05f00",
        "#a55a00",
        "#aa5500",
        "#af5000",
        "#b44b00",
        "#b94600",
        "#be4100",
        "#c33c00",
        "#c83700",
        "#cd3200",
        "#d22d00",
        "#d72800",
        "#dc2300",
        "#e11e00",
        "#e61900",
        "#eb1400",
        "#f00f00",
        "#f50a00",
        "#fa0500",
    ];
    svgDocument;

    constructor(
        private dataService: DataService,
        public sanitizer: DomSanitizer,
        private ref: ChangeDetectorRef,
        private router: Router
    ) {
        this.dataService.getStateJSON().subscribe((res) => {
            this.states = res.data;
            this.selectedState = this.states[0];
            this.dispatchSelectChangeEvent(this.selectedState);
            this.listenerForOnLoadMap();
        });
    }

    ngOnInit() {}

    listenerForOnLoadMap() {
        const that = this;
        document.addEventListener("__loadedMap", function (e: any) {
            that.svgDocument = document["svg-id"].contentWindow.document;
            if (that.selectedState.short_code === "IN") {
                for (let i = 1; i < that.states.length; i++) {
                    const currentState: State = that.states[i];
                    currentState.name = currentState.name.toUpperCase();
                    that.fillColor(currentState.name, currentState.score);
                }
            } else {
                for (let i = 0; i < that.selectedState.district.length; i++) {
                    const currentDistrict: District =
                        that.selectedState.district[i];
                    currentDistrict.name = currentDistrict.name;
                    that.fillColor(currentDistrict.name, currentDistrict.score);
                }
            }
        });
    }

    fillColor(title, score) {
        const path = this.svgDocument.querySelector(`path[title="${title}"]`);
        if (path) {
            score = score * 10 - 1; // To get the score in between 0 to 49 for gradient color array
            path.setAttribute("fill", this.gradientColors[score]);
        } else {
            console.log("Title : ", title);
        }
    }

    selectionOnChangeEvent() {
        const data = { ...this.selectedState };
        if (data.district) delete data.district;
        this.dispatchSelectChangeEvent(data);
    }

    dispatchSelectChangeEvent(data) {
        const e = new CustomEvent("__selectionChange", {
            detail: data,
        });
        document.dispatchEvent(e);
    }
}
