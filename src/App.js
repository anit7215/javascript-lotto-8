import { Console, Random } from "@woowacourse/mission-utils";
import Validator from "./utils/Validator";

class App {
  LottoNumbers = [];

  async run() {
    const purchaseAmountInput = await Console.readLineAsync(
      "구입금액을 입력해 주세요.\n"
    );
    Validator.validatePurchaseAmount(purchaseAmountInput);
    const lottoAmount = Number(purchaseAmountInput) / 1000;

    this.printLottoNumber(lottoAmount);

    const winningNumbersInput = await Console.readLineAsync(
      "당첨 번호를 입력해 주세요.\n"
    );
    const winningNumbers = winningNumbersInput.split(",").map(Number);

    Validator.validateWinningNumbers(winningNumbers);

    const bonusNumberInput = await Console.readLineAsync(
      "보너스 번호를 입력해주세요.\n"
    );
    const bonusNumber = Number(bonusNumberInput);

    Validator.validateBonusNumber(bonusNumber, winningNumbers);

    const results = this.calculateResults(winningNumbers, bonusNumber);
    const profitRate = this.calculateProfitRate(results, purchaseAmountInput);
    this.printStatistics(results, profitRate);
  }

  printLottoNumber(lottoCount) {
    Console.print(`\n${lottoCount}개를 구매했습니다.`);
    for (let i = 0; i < lottoCount; i++) {
      const lottoNumber = this.generateLottoNumber();
      Console.print(`[${lottoNumber.join(", ")}]`);
      this.LottoNumbers.push(lottoNumber);
    }
  }

  generateLottoNumber() {
    return Random.pickUniqueNumbersInRange(1, 45, 6).sort((a, b) => a - b);
  }

  calculateResults(winningNumbers, bonusNumber) {
    const result = {
      3: 0,
      4: 0,
      5: 0,
      "5+bonus": 0,
      6: 0,
    };

    this.LottoNumbers.forEach((lotto) => {
      const matchCount = lotto.filter((num) =>
        winningNumbers.includes(num)
      ).length;
      const bonusMatch = lotto.includes(bonusNumber);

      if (matchCount === 6) result[6]++;
      else if (matchCount === 5 && bonusMatch) result["5+bonus"]++;
      else if (matchCount === 5) result[5]++;
      else if (matchCount === 4) result[4]++;
      else if (matchCount === 3) result[3]++;
    });

    return result;
  }

  calculateProfitRate(results, purchaseAmount) {
    const PRIZE = {
      3: 5000,
      4: 50000,
      5: 1500000,
      "5+bonus": 30000000,
      6: 2000000000,
    };
    let totalPrize = 0;
    for (const key in results) {
      totalPrize += results[key] * PRIZE[key];
    }
    const profitRate = (totalPrize / purchaseAmount) * 100;
    return Math.round(profitRate * 100) / 100;
  }

  printStatistics(results, profitRate) {
    Console.print("\n당첨 통계");
    Console.print("---");
    Console.print(`3개 일치 (5,000원) - ${results[3]}개`);
    Console.print(`4개 일치 (50,000원) - ${results[4]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${results[5]}개`);
    Console.print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${results["5+bonus"]}개`
    );
    Console.print(`6개 일치 (2,000,000,000원) - ${results[6]}개`);
    Console.print(`총 수익률은 ${profitRate.toFixed(1)}%입니다.`);
  }
}

export default App;
