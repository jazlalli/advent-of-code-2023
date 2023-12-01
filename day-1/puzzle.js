const fs = require("fs");
const path = require("path");
const assert = require("node:assert").strict;

process.chdir(__dirname);

const input = fs.readFileSync("input.txt").toString();
const lines = input.split("\n").filter((line) => line !== "\n");

// PART 1
(function () {
  console.group("part 1");

  const sum = getCalibrationValue(lines);

  console.log(sum);

  console.groupEnd();
})();

// PART 2
(function () {
  console.group("part 2");

  const test1 = getCalibrationValue(
    ["two1nine", "xtwone3four"],
    "ReplaceWords"
  );
  assert.equal(test1, 53);

  const test2 = getCalibrationValue(
    ["ninebfour26fivetwone", "85threecnqsscqklhsix"],
    "ReplaceWords"
  );
  assert.equal(test2, 177);

  const sum = getCalibrationValue(lines, "ReplaceWords");

  console.log(sum);

  console.groupEnd();
})();

function getCalibrationValue(input, strategy) {
  const values = input.map((line) => {
    let l = line;
    if (strategy === "ReplaceWords") {
      l = replaceWordsWithDigits(l);
    }

    const numbers = l.replace(/[a-z]/gi, "");

    const calibrationValue =
      numbers.length === 0
        ? 0
        : numbers.length === 1
        ? parseInt(numbers[0] + numbers[0], 10)
        : parseInt(numbers[0] + numbers[numbers.length - 1], 10);

    return calibrationValue;
  });

  return values.reduce((sum, value) => sum + value);
}

function replaceWordsWithDigits(input) {
  let replaced = input;

  const words = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
  };

  const wordRegex = Object.keys(words).join("|");

  let matchedWord = replaced.match(wordRegex);
  while (matchedWord) {
    const replacement = words[matchedWord[0]];
    replaced = replaced.replace(matchedWord[0], replacement);
    matchedWord = replaced.match(wordRegex);
  }

  return replaced;
}
