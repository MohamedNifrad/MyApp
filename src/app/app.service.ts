import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _httpClient: HttpClient)
  {
  }

  getRanges(): Observable<number[]>
  {
    return this._httpClient.get<number[]>('https://raw.githubusercontent.com/MohamedNifrad/MohamedNifrad.github.io/master/range.json');
  }

  getCharges(): Observable<number[]>
  {
    return this._httpClient.get<number[]>('https://raw.githubusercontent.com/MohamedNifrad/MohamedNifrad.github.io/master/charges.json');
  }

  getFixedAmount(): Observable<number>
  {
    return this._httpClient.get<number>('https://raw.githubusercontent.com/MohamedNifrad/MohamedNifrad.github.io/master/fixed_amount.json');
  }
}
