import { Item, Items } from './item.model';

export class Population {
  populationSize: number;
  chromosomeSize: number;
  population: Chromosome[] = [];
  items: Items;
  maxWeight: number;
  constructor(items: any, popSize = 0, maxWeight: number = 1) {
    this.populationSize = popSize;
    this.maxWeight = maxWeight;
    this.chromosomeSize = (items && items.length) || 1;
    this.items = (items && new Items(items)) || new Items();
    this.population = this.generatePopulation();
  }
  generatePopulation() {
    let population: Chromosome[] = [];
    while (population.length <= this.populationSize) {
      let currentChromosome = new Chromosome(this.chromosomeSize);

      for (let i = 0; i < this.chromosomeSize; i++) {
        currentChromosome.generateGene(this.items.items[i].maxCount);
      }
      let { fitness, weight } = calculateFitness(
        currentChromosome,
        this.items,
        this.maxWeight
      );
      if (fitness !== 0) {
        currentChromosome.fitness = fitness;
        currentChromosome.weight = weight;
        population.push(currentChromosome);
      }
    }

    console.log('generatepopulation: population', population);
    return population;
  }
}

export class Chromosome {
  size: number;
  genes: number[] = [];
  fitness: number = 0;
  weight: number = 0;
  constructor(size: number) {
    this.size = size;
  }
  generateGene(max: number) {
    let gene = Math.floor(Math.random() * (max + 1));
    this.genes.push(gene);
  }
}

function calculateFitness(
  chromosome: Chromosome,
  items: Items,
  maxWeight: number
) {
  let fitness = 0;
  let weight = 0;

  chromosome.genes.forEach((gene, index) => {
    fitness += items.items[index].value * gene;
    weight += items.items[index].weight * gene;
  });
  if (weight > maxWeight) fitness = 0;

  return { fitness, weight };
}
