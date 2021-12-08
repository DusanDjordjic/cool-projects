import { Bag } from './bag.model';
import { Item } from './item.model';

export class Population {
  populationSize: number;
  chromosomeSize: number;
  population: Chromosome[] = [];
  constructor(items: Item[], bag: Bag, popSize = 0, chroSize = 0) {
    this.populationSize = popSize;
    this.chromosomeSize = chroSize;
    this.population = this.generatePopulation(items, bag);
  }
  generatePopulation(items: Item[], bag: Bag) {
    let population: Chromosome[] = [];
    for (let i = 0; i < this.populationSize; i++) {
      let currentChromosome = new Chromosome(this.chromosomeSize);
      currentChromosome.calculateFitness(items, bag.maxWeight);
      while (currentChromosome.fintess <= 0) {
        currentChromosome = new Chromosome(this.chromosomeSize);
        currentChromosome.calculateFitness(items, bag.maxWeight);
      }
      population.push(currentChromosome);
    }

    return population;
  }
  printPopulation(items: Item[]) {
    let out = '';
    for (let i = 0; i < this.populationSize; i++) {
      let currentChromosome = this.population[i];
      out += `${i}: `;
      for (let j = 0; j < currentChromosome.size; j++) {
        let currentGene = currentChromosome.values[j];
        if (currentGene) out += items[j].name + ', ';
      }
      out += '\n';
    }
    console.log(out);
  }

  calculateFitess(items: Item[], bag: Bag) {
    for (let i = 0; i < this.populationSize; i++) {
      let currentChromosome = this.population[i];
      currentChromosome.calculateFitness(items, bag.maxWeight);
      console.log(currentChromosome.fintess);
    }
  }
  calculateTotalFitness() {
    return this.population.reduce((prev, curr) => prev + curr.fintess, 0);
  }
  generateNewPopulation() {
    let totalFitness = this.calculateTotalFitness();
    let chances: number[] = [];
    let prevChance = 0;
    let newPopulation: Chromosome[] = [];
    for (let i = 0; i < this.population.length; i++) {
      let currentChromosome = this.population[i];
      currentChromosome.calculateChanceOfReproduction(totalFitness);
      prevChance += currentChromosome.chanceOfReproduction;
      console.log(currentChromosome.chanceOfReproduction);

      chances.push(prevChance);
    }
  }
}

export class Chromosome {
  values: boolean[] = [];
  size: number;
  fintess: number;
  chanceOfReproduction: number;

  constructor(size: number = 0) {
    this.size = size;
    this.fintess = 0;
    this.chanceOfReproduction = 0;
    this.generateChromosome();
  }
  generateChromosome() {
    for (let i = 0; i < this.size; i++) {
      let r = Math.random();
      if (r >= 0.5) this.values.push(true);
      else this.values.push(false);
    }
  }
  calculateFitness(items: Item[], maxWeight: number = 9) {
    let value = 0;
    let weight = 0;

    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i]) {
        value += items[i].value;
        weight += items[i].weight;
      }
    }

    if (weight > maxWeight) value = 0;

    this.fintess = value;
  }
  calculateChanceOfReproduction(totalFitness: number) {
    this.chanceOfReproduction =
      Math.round((this.fintess / totalFitness) * 100) / 100;
  }
}
