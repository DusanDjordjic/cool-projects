import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './core/home/home.component';
import { OpenDropdownDirective } from './directives/open-dropdown.directive';
import { MemoryGamePageComponent } from './projects/memory-game/memory-game-page/memory-game-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './projects/calculator/calculator.component';
import { EaRanacComponent } from './projects/ea-ranac/ea-ranac.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    OpenDropdownDirective,
    MemoryGamePageComponent,
    CalculatorComponent,
    EaRanacComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
