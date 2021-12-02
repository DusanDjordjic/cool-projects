import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

enum GameStateEnum {
  Pregame,
  Start,
  Check,
  End,
}

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
   * easy -> 5000 - 5 sekundi
   * normal -> 3000 - 3 sekunde
   * hard -> 2000 - 2 sekunde
   * Kliknom na dugem start krece igra
   * u zavisnosti od odabranog nivoa brojevi se pojave i nestanu posle 'x' sekundi
   * igrac treba da popuni polja sa odgovarajucim brojem
   * skiskom na dugme 'proveri' proverava se da li su uneti brojevi tacni i racuna se razultat
   * takodje se igra vraca na pocetno stanje
   */

  /**
   *  ----------------Variables----------------
   */

  // Configracije igre
  configForm = this.fb.group({
    level: 5000,
    size: 3,
  });

  // Niz random generisanih vrednosti
  startGrid: number[] = [];

  // Niz unetih vrednosti
  gameForm: (number | null)[] = this.generateFormItems(
    this.configForm.value.size
  );

  // Trenutno stanje aplikacije
  gameState: GameStateEnum = GameStateEnum.Pregame;

  // Niz koji pokazuje koje je polje tacno uneto a koje ne
  validity: boolean[] = [];

  // Niz ispisa
  logs: string[] = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadConfigFromLocalStorage();
    this.startGrid = this.generateGrid(this.configForm.value.size || 3);
  }

  /**
   * ----------------StartGame----------------
   */
  startGame() {
    // Treba da se prikaze 'check' dugme
    this.gameState = GameStateEnum.Start;

    // Popunjavamo polja
    this.fillFields();
    setTimeout(() => {
      /**
       * updateGameFormSize popuni sve elemente sa null
       * tako da mozemo da iskoristimo kada brisemo elemente
       */
      this.gameState = GameStateEnum.Check;
      this.updateGameFormSize();
    }, this.configForm.value.level);
  }
  /**
   * ----------------CheckValues----------------
   */
  checkValues() {
    // Vratimo da nam sve vrednosti budu brojevi
    this.gameForm = this.gameForm.map((item) => {
      return isNaN(Number(item)) ? null : Number(item);
    });

    /**
     *
     * Proveriti da li i koje se vrednosti poklapaju
     * Postaviti stanje aplikacije na 'end'
     * Obojiti polja koja su dobra u zeleno a koja nisu u crveno
     * npr. [false, true, true false]
     * HTML
     * if(npr[i] && stanje === end) class success
     * if(!npr[i] && stanje === end) class failure
     *
     * */
    this.validity = this.checkValidity(this.startGrid, this.gameForm);

    // Cuvamo zapis o rezultatu
    let log = this.createLog();
    this.logs.push(log);
    // gameState ide na 'end'
    this.gameState = GameStateEnum.End;
  }

  /**
   * Proveravamo da li je i-ta vrednost jednog niza jednaka i-toj vrednosti dugog niza
   * Ako jeste cuvamo 'true', a ako nije 'false'
   * @param arr1
   * @param arr2
   * @returns
   */
  checkValidity(arr1: (number | null)[], arr2: (number | null)[]): boolean[] {
    let validity: boolean[] = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) validity.push(true);
      else validity.push(false);
    }
    return validity;
  }
  /**
   * Popunjavamo polja u formi
   * moramo da kopiramo vrendosti inace ce se
   * povezati pointeri i gameForm ce biti isto sto i startGrid
   */
  fillFields() {
    this.gameForm = Array.from(this.startGrid);
  }

  /**
   * ----------------playAgain----------------
   * Vracamo stanje na pocetno == 0
   */
  playAgain() {
    this.gameState = GameStateEnum.Pregame;

    this.updateGameFormSize();
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
  /**
   * Generisemo niz 'null' vrednosti odgovarajuce duzine
   * @param numberOfFiledsInRow
   * @returns
   */
  generateFormItems(numberOfFiledsInRow: number): number[] {
    return new Array(numberOfFiledsInRow * numberOfFiledsInRow).fill(null);
  }

  // Promena velicine igrice
  sizeChanged() {
    this.updateGameFormSize();
    this.startGrid = this.generateGrid(this.configForm.value.size);
    this.setConfigToLocalStorage();
  }
  // Promena nivoa tezina
  levelChanged() {
    this.setConfigToLocalStorage();
  }
  /**
   * Cuvamo 'config' podatke u localStorage-u
   */
  setConfigToLocalStorage() {
    window.localStorage.setItem('level', this.configForm.value.level || 5000);
    window.localStorage.setItem('size', this.configForm.value.size || 3);
  }
  /**
   * Ucitavamo 'config' podatke iz localStorage-a u nasu aplikaciju
   */
  loadConfigFromLocalStorage() {
    this.configForm.patchValue({
      size: Number(window.localStorage.getItem('size') || 4),
      level: Number(window.localStorage.getItem('level') || 5000),
    });
  }
  /**
   * Menjamo velicinu niza u gameForm
   * tako sto ocistimo niz
   * zatim dodamo onoliko elementa koli nam treba (9, 16, 25)
   */
  updateGameFormSize() {
    this.gameForm = this.generateFormItems(this.configForm.value.size);
  }
  /**
   * Pravimo 'log' to jest string koji treba da opise ostvareni rezultat
   * @returns
   *
   */
  createLog(): string {
    return `Nivo tezine ${this.getLevelString(
      this.configForm.value.level
    )} na mapi ${this.configForm.value.size} * ${
      this.configForm.value.size
    } ostvareno je ${this.getValidCount(this.validity)}/${
      this.validity.length
    } poena.`;
  }
  /**
   * Vraca string koji opisuje nivo tezine
   * koji je trenutno selektovan
   * @param level
   * @returns
   */
  getLevelString(level: number) {
    if (level == 2000) return 'Težak';
    else if (level == 3000) return 'Normalan';
    else if (level == 5000) return 'Lak';
    else return '';
  }
  /**
   * Vraca broj tacnih vrednosti u nizu
   * koristimo da bi proverili 'validity' niz
   * @param arr
   * @returns
   */
  getValidCount(arr: any[]) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) count++;
    }
    return count;
  }
}
