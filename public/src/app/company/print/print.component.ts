import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements AfterViewInit {
  @Input() allProjectsData = [];
  @Input() customColumnsName :any;
  private style: HTMLStyleElement;
  constructor() { }


  ngAfterViewInit(){
    var divToPrint=document.getElementById("printTable");
    var newWin= window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }
}
