import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-memory-game-page',
  templateUrl: './memory-game-page.component.html',
  styleUrls: ['./memory-game-page.component.scss'],
})
export class MemoryGamePageComponent implements OnInit {
  /**
   * @opis
   * Generise se 3x3 grid (ubacicemo nacin da se može generisati od 2x2 do 5x5)
   * Izabere se nivo tezine (easy -> hard)
   * nivo oznacava koliko dugo ce brojevi biti vidljivi
   * easy -> 5
   * normal -> 3
   * hard -> 2
   * Kliknom na dugem start krece igra
   * u zavisnosti od odabranog nivoa brojevi se pojave i nestanu posle 'x' sekundi
   * igrac treba da popuni polja sa odgovarajucim brojem
   * skiskom na dugme 'proveri' proverava se da li su uneti brojevi tacni i racuna se razultat
   * takodje se igra vraca na pocetnu vrednost
   */
  /**
   *  ----------------Variables----------------
   */
  numberOfFiledsInRow: number = 3;
  startGrid: number[] = [];

  configForm = this.fb.group({
    level: 5000,
    size: 3,
  });
  // TODO Napraviit enum start, check, end
  isTimeToCheck: boolean = false;

  gameForm: (number | null)[] = this.generateFormItems(
    this.configForm.value.size
  );

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.startGrid = this.generateGrid(this.numberOfFiledsInRow);
  }

  /**
   * ----------------StartGame----------------
   */
  startGame() {
    // Treba da se prikaze 'check' dugme
    this.isTimeToCheck = true;
    // Popunjavamo polja
    this.fillFields();
    setTimeout(() => {
      /**
       * updateGameFormSize popuni sve elemente sa null
       * tako da mozemo da iskoristimo kada brisemo elemente
       */
      this.updateGameFormSize();
    }, this.configForm.value.level);
  }
  checkValues() {
    this.isTimeToCheck = false;
    console.log({
      startGrid: this.startGrid,
      configForm: this.configForm,
      gameForm: this.gameForm,
    });
    // Vratimo da nam sve vrednosti budu brojevi
    this.gameForm = this.gameForm.map((item) => {
      console.log(isNaN(Number(item)));
      return isNaN(Number(item)) ? null : item;
    });
    /**
     * TODO
     * Proveriti da li i koje se vrednosti poklapaju
     * Postaviti stanje aplikacije na 'end'
     * Obojiti polja koja su dobra u zeleno a koja nisu u crveno
     * npr. [false, true, true false]
     * if(npr[i] && stanje === end) class success
     * if(!npr[i] && stanje === end) class failure
     *
     * */
  }
  fillFields() {
    this.gameForm = Array.from(this.startGrid);
  }
  /**
   *
   * @param numberOfFiledsInRow
   * @returns
   *
   * ----------------generateGrid----------------
   * Napravimo niz koji je velicine red X red (3x3 default)
   * mapiramo svaku vrednost na random broj od 1 do 9
   */
  generateGrid(numberOfFiledsInRow: number): number[] {
    return new Array(numberOfFiledsInRow * numberOfFiledsInRow)
      .fill(0)
      .map(() => Math.floor(Math.random() * 9 + 1));
  }
  generateFormItems(numberOfFiledsInRow: number): number[] {
    return new Array(numberOfFiledsInRow * numberOfFiledsInRow).fill(null);
  }

  // Promena velicine igrice
  sizeChanged() {
    console.log('a');

    this.updateGameFormSize();

    this.startGrid = this.generateGrid(this.configForm.value.size);
  }
  /**
   * Menjamo velicinu niza u gameForm
   * tako sto ocistimo niz
   * zatim dodamo onoliko elementa koli nam treba (9, 16, 25)
   */
  updateGameFormSize() {
    this.gameForm = this.generateFormItems(this.configForm.value.size);
  }
}
