import { Console, Random } from "@woowacourse/mission-utils";

class App {
  LottoNumbers = [];

  async run() {
    const purchaseAmount = await Console.readLineAsync(
      "구입금액을 입력해 주세요.\n"
    );
    const lottoAmount = this.amountToLottoCount(purchaseAmount);
    this.printLottoNumber(lottoAmount);
    const winningNumbersInput = await Console.readLineAsync(
      "당첨 번호를 입력해 주세요.\n"
    );
    const winningNumbers = winningNumbersInput
      .split(",")
      .map((num) => Number(num));
    this.validateWinningNumbers(winningNumbers);
  }

  amountToLottoCount(purchaseAmount) {
    if (isNaN(purchaseAmount)) {
      throw new Error("[ERROR] 숫자만 입력해 주세요.");
    }
    if (purchaseAmount > 0 && purchaseAmount % 1000 !== 0) {
      throw new Error("[ERROR] 구입금액은 1,000원 단위로 입력해 주세요.");
    }
    return purchaseAmount / 1000;
  }

  printLottoNumber(lottoCount) {
    Console.print(`\n${lottoCount}개를 구매했습니다.`);
    let count = lottoCount;
    while (count > 0) {
      const lottoNumber = this.generateLottoNumber();
      Console.print(`[${lottoNumber.join(", ")}]`);
      this.LottoNumbers.push(lottoNumber);
      count--;
    }
  }

  generateLottoNumber() {
    return Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
  }

  validateWinningNumbers(winningNumbers) {
    if (winningNumbers.length !== 6) {
      throw new Error("[ERROR] 당첨 번호 6개를 입력해 주세요.");
    }
    if (winningNumbers.some((num) => isNaN(num))) {
      throw new Error("[ERROR] 숫자만 입력해 주세요.");
    }
    if (winningNumbers.some((num) => num < 1 || num > 45)) {
      throw new Error("[ERROR] 1 ~ 45 사이의 숫자를 입력해주세요.");
    }
    if (new Set(winningNumbers).size !== winningNumbers.length) {
      throw new Error("[ERROR] 중복된 숫자가 있습니다.");
    }
  }
}

export default App;
