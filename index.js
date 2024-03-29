// Student Id: C0913139
// Student Name: Ananta Poudel

// Car class having `honk` method
class Car {
  constructor(brand, model, year, color, price, gas) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.price = price;
    this.gas = gas;
  }

  honk() {
    console.log(
      `Tuut tuut \n Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}, Color: ${this.color}, Price: $${this.price}, Gas: ${this.gas} liters`
    );
    return `<div class="car-info">
      <p><strong>Brand:</strong> ${this.brand}</p>
      <p><strong>Model:</strong> ${this.model}</p>
      <p><strong>Year:</strong> ${this.year}</p>
      <p><strong>Color:</strong> ${this.color}</p>
      <p><strong>Price:</strong> $${this.price}</p>
      <p><strong>Gas:</strong> ${this.gas} liters</p>
      </div>`;
  }
}

// List of cars initialized using car class
const cars = [
  new Car("Honda", "CR-V", 2023, "Red", 50000, 45),
  new Car("Ford", "F-150", 2020, "Black", 25000, 30),
  new Car("BMW", "X5", 2022, "Green", 60000, 65),
  new Car("Mazda", "CX-5", 2019, "White", 15000, 60),
  new Car("Audi", "Q7", 2018, "Silver", 52000, 47),
  new Car("Kia", "Forte", 2020, "Blue", 21000, 56),
];

// Initial state of cars, log and display in HTML
const startingCards = document.getElementById("starting");
for (const car of cars) {
  const carDiv = document.createElement("div");
  carDiv.classList.add("car");
  carDiv.innerHTML = car.honk();
  startingCards.appendChild(carDiv);
}

// Simulation of cars taking 7 turns
const noOfTurns = 7;
const raceResultsDiv = document.getElementById("race-result");
let outOfGasCar = [];
for (let turn = 1; turn <= noOfTurns; turn++) {
  // Each turn title and separation
  const turnDiv = document.createElement("div");
  turnDiv.classList.add("turn");
  const turnHeader = document.createElement("h2");
  turnHeader.textContent = `Turn ${turn}:`;
  turnDiv.appendChild(turnHeader);

  // Collection of cards for each turn
  const turnCardsDiv = document.createElement("div");
  turnCardsDiv.classList.add("turn-cards");
  for (const carIndex in cars) {
    if (outOfGasCar.includes(carIndex)) continue;
    const car = cars[carIndex];
    let gasLoss = 5;
    if (car.year < 2024) {
      gasLoss += 2024 - car.year;
    }
    car.gas -= gasLoss;
    const carDiv = document.createElement("div");
    carDiv.classList.add("car");
    const remainingGas = Math.max(car.gas, 0);
    carDiv.innerHTML = `
              ${car.honk()}
              <p class="remaining-gas">Remaining Gas: ${remainingGas} liters</p>
          `;
    if (car.gas <= 0) {
      const gasFinishedMessage = document.createElement("p");
      gasFinishedMessage.classList.add("gas-finished");
      gasFinishedMessage.textContent = "⛽ Out of Gas";
      carDiv.appendChild(gasFinishedMessage);
      outOfGasCar.push(carIndex);
    }
    turnCardsDiv.appendChild(carDiv);
  }
  turnDiv.appendChild(turnCardsDiv);
  raceResultsDiv.appendChild(turnDiv);
}
