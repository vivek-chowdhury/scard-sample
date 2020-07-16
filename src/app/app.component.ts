import { SpinnerManagerService } from './core/spinner/spinner-manager.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'scard';
  showSpinner = true;
  constructor(private spinnerManager: SpinnerManagerService) {}

  /**
   * @description This method is invoked when Application is initialized,
   * it is responsible for subscribing to required services to listen to any changes
   * which required application attention.
   *
   */
  ngOnInit(): void {
    this.spinnerManager.showSpinner$.subscribe((value) => {
      this.showSpinner = value;
    });
  }
}
