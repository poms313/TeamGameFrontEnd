import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersComponent } from './players/players.component';
import { HomeComponent } from './home/home.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { GameResultComponent } from './game-result/game-result.component';
import { StartGameComponent } from './start-game/start-game.component';
import { DeletePlayerComponent } from './delete-player/delete-player.component';
import { AddPlayerComponent } from './add-player/add-player.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'players', component: PlayersComponent },
  { path: 'details/:id', component: PlayerDetailsComponent },
  { path: 'start/game', component: StartGameComponent },
  { path: 'delete/player/:id', component: DeletePlayerComponent },
  { path: 'game/result/:test', component: GameResultComponent },
  { path: 'add/player', component: AddPlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
