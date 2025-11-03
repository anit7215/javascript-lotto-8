class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    if (numbers.some((num) => isNaN(num))) {
      throw new Error("[ERROR] 숫자만 입력해 주세요.");
    }
    if (numbers.some((num) => num < 1 || num > 45)) {
      throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new Error("[ERROR] 중복된 숫자가 있습니다.");
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  countMatches(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;