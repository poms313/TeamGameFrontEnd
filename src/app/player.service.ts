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

  private apiUrl = 'https://team-game.pommine-fillatre.com';  // Change here the URL of web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** players list from the api */
  getPlayers(): Observable<Player[]> {
    const url = `${this.apiUrl}/list/all/players`;
    return this.http.get<Player[]>(url)
      .pipe(
        tap(_ => this.log('fetched players')),
        catchError(this.handleError<Player[]>('getPlayers', []))
      );
  }

  /** player by id */
  getPlayer(id: number): Observable<Player> {
    const url = `${this.apiUrl}/get/player/${id}`;
    return this.http.get<Player>(url)
      .pipe(
        tap(_ => this.log(`fetched player id=${id}`)),
        catchError(this.handleError<Player>(`getPlayer id=${id}`))
      );
  }

  /** update the player */
  updatePlayer(player: Player): Observable<any> {
    const jsonData = JSON.stringify(player);
    const url = `${this.apiUrl}/modify/${jsonData}/`;
    return this.http.get<Player>(url)
      .pipe(
        tap((newPlayer: Player) => this.log(`updated player id=${player.id}`)),
        catchError(this.handleError<any>('updatePlayer'))
      );
  }

  /** start game */
  startGame(): Observable<any> {
    const url = `${this.apiUrl}/game/create`;
    return this.http.get(url, this.httpOptions).pipe(
      tap(_ => this.log(`start game`)),
      catchError(this.handleError<any>('startGame'))
    );
  }

  /** game result */
  gameResult(testData: string) {
    const url = `${this.apiUrl}/result/${testData}`;
    return this.http.get(url, this.httpOptions).pipe(
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
