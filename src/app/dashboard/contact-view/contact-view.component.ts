import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: "app-contact-view",
    templateUrl: "./contact-view.component.html",
    styleUrls: ["./contact-view.component.scss"],
})
export class ContactViewComponent implements OnInit {
    constructor(private dataService: DataService) {
        this.dataService.getStateJSON().subscribe((res) => {});
    }

    ngOnInit() {}
}
