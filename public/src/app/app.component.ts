import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";
import { ToastrService } from "ngx-toastr";
import { ERROR_MESSAGE } from "./global/settings";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  cusomListData: any;

  constructor(private appService: AppService, private toastr: ToastrService) {}

  ngOnInit() {
    this.appService.getCustomList().subscribe(
      (response: any) => {
        if (response) {
          if (response.error === false) {
            localStorage.setItem(
              "customFieldNames",
              JSON.stringify(response.data)
            );
          }
        }
      },
      error => {
        this.toastr.error(
          ERROR_MESSAGE.ERROR_MESSAGE_TEXT,
          ERROR_MESSAGE.ERROR_MESSAGE_HEADING
        );
      }
    );
  }
}
