import { Component, ChangeDetectorRef } from '@angular/core';

interface State {
    short_code: string;
    name: string;
    svg_path: string;
    score: number,
    overall: number,
    district: Array<Object>
}

@Component({
    selector: 'app-svg',
    templateUrl: './svg.component.html',
    styleUrls: ['./svg.component.scss']
})
export class SvgComponent {

    constructor(private ref: ChangeDetectorRef) {
        const that = this;
        this.ref.detach();
        document.addEventListener("__selectionChange", function (e: any) {
            that.selectionChanged(e.detail);
        });
    }

    selectionChanged(data: State) {
        const svgObject = document.getElementById('svg-id');
        svgObject.setAttribute("data", `/assets/svg/${data.svg_path}`);
        svgObject.onload = (event) => {
            console.log('here in onload');
            setTimeout(() => {
                const e = new CustomEvent("__loadedMap", {
                    detail: null
                });
                document.dispatchEvent(e);
            });
        };
    }

}