import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { CalculatorComponent } from './projects/calculator/calculator.component';
import { MemoryGamePageComponent } from './projects/memory-game/memory-game-page/memory-game-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'igra-memorije', component: MemoryGamePageComponent },
  { path: 'kalkulator', component: CalculatorComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
