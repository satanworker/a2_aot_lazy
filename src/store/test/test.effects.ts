// import { environment } from './../../environments/environment';
// import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
// import { Actions, Effect } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import { Location } from '@angular/common';

// @Injectable()
// export class UserEffects {
//     private url: string = 'http://localhost:3000';
//     private headers: Headers;

//     @Effect() getJwt$ = this.actions$
//         .ofType(GET_JWT)
//         .map(action => action.payload)
//         .switchMap(
//         payload => this.http.get(this.url + '/jwt', { headers: this.httpService.headers })
//             .map(
//             res => {
//             }
//             )
//             .catch(e => {
//                 return Observable.of({
//                     type: 'ERROR',
//                     payload: e
//                 });
//             })
//         );
//     constructor(
//         private http: Http,
//         private actions$: Actions,
//         private _location: Location
//     ) {
//         if (environment.production) {
//             this.url = '';
//         }
//         //this.headers = this.httpService.headers;
//     }
// }
