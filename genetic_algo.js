var data = require('./data.js');

// Parse survey data, replace responses with value
function parseData() {

  var studentList = [];

  for (var i = 0; i < data.classData.length; i++) {
    studentList.push(data.classData[i]['yourName']);

    for (var prop in data.classData[i]) {
      if (prop !== 'yourName' && prop !== 'timestamp') {
        if (data.classData[i][`${prop}`].includes('refuse')) {
          data.classData[i][`${prop}`] = -10;
        } else if (data.classData[i][`${prop}`].includes('especially enjoy')) {
          data.classData[i][`${prop}`] = 10;
        } else {
            data.classData[i][`${prop}`] = 0;
          }
        }
    }
  }
  return studentList;
}


// Generate population of different arrangements
function shuffle(array, populationSize) {
  var population = [];

  for (var i =0; i < populationSize; i++) {
    var origArray = array.slice();
    array.sort(() => Math.random() * 2 - 1);
    population.push(origArray);
  }
  return population;
}


// Group into fours, calculate sum of preferences
function fitness(arrangement) {
  remainder = arrangement.splice(4); // arrangement = [1,2,3,4]

  var sum = 0;
  for (var i = 0; i < arrangement.length; i++) {
    var setOfPreferences = data.classData.filter(function(entry) {
      return entry.yourName === arrangement[i];
    });
    for (var prop in setOfPreferences[0]) {
      if(arrangement.includes(prop)) {
        sum += setOfPreferences[0][prop];
      }
    }
  }
  return sum;
}

function runAlgo() {
  var students = parseData();
  var population = shuffle(students, 5);

  var fitnessScores = [];

  for (var i = 0; i < population.length; i++) {
    fitnessScores.push(fitness(population[i]));
  }
  fitnessScores.sort((a, b) => {return b-a});

  console.log("fitnessScores", fitnessScores);

}

runAlgo();
