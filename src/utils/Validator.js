class Validator {
  static validatePurchaseAmount(purchaseAmount) {
    const amount = Number(purchaseAmount);

    if (isNaN(amount)) {
      throw new Error("[ERROR] 숫자만 입력해 주세요.");
    }
    if (amount <= 0) {
      throw new Error("[ERROR] 구입금액은 양수여야 합니다.");
    }
    if (amount % 1000 !== 0) {
      throw new Error("[ERROR] 구입금액은 1,000원 단위로 입력해 주세요.");
    }
  }

  static validateWinningNumbers(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 당첨 번호 6개를 입력해 주세요.");
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

  static validateBonusNumber(bonusNumber, winningNumbers) {
    if (isNaN(bonusNumber)) {
      throw new Error("[ERROR] 숫자만 입력해 주세요.");
    }
    if (bonusNumber < 1 || bonusNumber > 45) {
      throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.");
    }
  }

  static validateLottoNumbers(numbers) {
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
}

export default Validator;
