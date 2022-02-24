import { Injectable } from '@angular/core';

import { Player } from './player';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl = 'https://team-game.pommine-fillatre.com';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'mode':'no-cors'})
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET players from the server */
  getPlayers(): Observable<Player[]> {
    const url = `${this.apiUrl}/list/all/players`;
    return this.http.get<Player[]>(url)
      .pipe(
        tap(_ => this.log('fetched players')),
        catchError(this.handleError<Player[]>('getPlayers', []))
      );
  }

  /** GET player by id. Will 404 if id not found */
  getPlayer(id: number): Observable<Player> {
    const url = `${this.apiUrl}/get/player/${id}`;
    return this.http.get<Player>(url)
      .pipe(
        tap(_ => this.log(`fetched player id=${id}`)),
        catchError(this.handleError<Player>(`getPlayer id=${id}`))
      );
  }

  /** PUT: update the player on the server */
  updatePlayer(player: Player): Observable<any> {
    const url = `${this.apiUrl}/modify/player/${FormData}`;
    return this.http.put(url, player, this.httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }

  /** GET: start game */
  startGame(): Observable<any> {
    const url = `${this.apiUrl}/game/create`;
    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => this.log(`start game`)),
      catchError(this.handleError<any>('startGame'))
    );
  }

  /** GET: game result */
  gameResult(): Observable<any> {
    const url = `${this.apiUrl}/game/result/${FormData}`;
    return this.http.put(url, this.httpOptions).pipe(
      tap(_ => this.log(`game result`)),
      catchError(this.handleError<any>('gameResult'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /** Log a PlayerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PlayerService: ${message}`);
  }
}
