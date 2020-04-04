import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-graph-view',
    templateUrl: './graph-view.component.html',
    styleUrls: ['./graph-view.component.scss']
})

export class GraphViewComponent implements OnInit {

  parameters = ['State', 'Gender', 'Age']
  parameter1Button = false;
  parameter2Button = false;
  parameter3Button = false;

  parameter1Click(){
    console.log("hi");
    this.parameter1Button = !this.parameter1Button;
  }
  
  parameter2Click(){
    console.log("hi");
    this.parameter1Button = !this.parameter1Button;
  }
  
  parameter3Click(){
    console.log("hi");
    this.parameter1Button = !this.parameter1Button;
  }

  constructor() { }

  ngOnInit() {
  }

}

