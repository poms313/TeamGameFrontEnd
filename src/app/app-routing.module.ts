import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersComponent } from './players/players.component';
import { HomeComponent } from './home/home.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { GameResultComponent } from './game-result/game-result.component';
import { StartGameComponent } from './start-game/start-game.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'players', component: PlayersComponent },
  { path: 'details/:id', component: PlayerDetailsComponent },
  { path: 'start/game', component: StartGameComponent },
  { path: 'game/result/:test', component: GameResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
