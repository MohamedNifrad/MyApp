import { Component } from '@angular/core';
import {AppService} from "./app.service";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';

  private charges: number[] = [];
  private range: number[] = [];
  private num: number = 4;
  fixedAmount: number = 0;
  subTotal = 0;
  total = 0;

  inputValue: number | undefined;

  constructor(private _appService: AppService) {
    this.loadRanges();
    this.loadCharges();
    this.loadFixedAmount();
  }

  ngOnInit(): void {
  }

  loadRanges(): void {
    this._appService.getRanges().pipe(
      catchError((error) => {
        // Handle the error here
        console.error('An error occurred while loading ranges:', error);
        return throwError('Failed to load ranges');
      })
    ).subscribe(res => {
      this.range = res;
      console.log(this.range);
    });
  }

  loadCharges(): void {
    this._appService.getCharges().pipe(
      catchError((error) => {
        // Handle the error here
        console.error('An error occurred while loading charges:', error);
        return throwError('Failed to load charges');
      })
    ).subscribe(res => {
      this.charges = res;
      console.log(this.charges);
    });
  }

  loadFixedAmount(): void {
    this._appService.getFixedAmount().pipe(
      catchError((error) => {
        // Handle the error here
        console.error('An error occurred while loading fixed amount:', error);
        return throwError('Failed to load fixed amount');
      })
    ).subscribe(res => {
      this.fixedAmount = res;
      console.log(this.fixedAmount);
    });
  }

  clear(): void {
    this.inputValue = undefined;
    this.subTotal = 0;
    this.total = 0;
  }


  calculateBill(): void {
    let units = Number(this.inputValue);
    let bill = 0;

    for (let i = 0; i < this.charges?.length; i++) {
      if (units <= this.range[i]) {
        bill += this.charges[i] * units;
        break;
      } else {
        bill += this.charges[i] * this.range[i];
        units -= this.range[i];
      }
    }
    this.subTotal = bill;
    this.total = this.subTotal + this.fixedAmount;
  }
}
