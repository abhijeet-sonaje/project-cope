import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
interface State {
    short_code: string;
    name: string;
    svg_path: string;
    score: number,
    overall: number
}

interface Chart {
    options: ChartOptions,
    labels: Label[],
    type: ChartType,
    legend: Boolean,
    data: ChartDataSets[]
}

declare const $;

@Component({
    selector: 'app-graph-view',
    templateUrl: './graph-view.component.html',
    styleUrls: ['./graph-view.component.scss']
})
export class GraphViewComponent implements OnInit {

    states: State[] = [];
    selectedState: State;

    genders = ["Female", "Male"];
    selectedGender;

    ages = [{
        name: "Less than 10 Years",
        start_value: 0,
        end_value: 10
    }, {
        name: "10 Years to 20 Years",
        start_value: 10,
        end_value: 20
    }, {
        name: "20 Years to 40 Years",
        start_value: 20,
        end_value: 40
    }, {
        name: "40 Years to 60 Years",
        start_value: 40,
        end_value: 60
    }, {
        name: "More than 60 Years",
        start_value: 60,
        end_value: 110
    }];
    selectedAge;

    barchart: Chart = {
        options: {
            responsive: true,
            // We use these empty structures as placeholders for dynamic theming.
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        },
        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        type: 'bar',
        legend: true,
        data: [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ]
    }

    constructor(private dataService: DataService, ) {
        this.dataService.getStateJSON().subscribe((res) => {
            this.states = res.data.map((state) => {
                if (state.district) {
                    delete state.district;
                }
                return state;
            });
            this.selectedState = this.states[0];
        });
    }

    ngOnInit() { }

    stateOnChangeEvent() {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100), 59, 80, (Math.random() * 100), 56, (Math.random() * 100), 40];
        this.barchart.data[0].data = data;
    }

    genderOnChangeEvent() {
        const data = [
            65, Math.round(Math.random() * 100), 80, (Math.random() * 100), 56, 55, Math.round(Math.random() * 100)];
        this.barchart.data[0].data = data;
    }

    ageOnChangeEvent() {
        const data = [
            Math.round(Math.random() * 100), 48, 40, (Math.random() * 100), 86, (Math.random() * 100), 90];
        this.barchart.data[1].data = data;
    }
}
