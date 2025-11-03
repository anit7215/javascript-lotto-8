import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";
import Lotto from "./Lotto.js";
import { Random } from "@woowacourse/mission-utils";

class App {
  LottoNumbers = [];

  async run() {
    const purchaseAmount = await InputView.purchaseAmountInput();
    const lottoCount = purchaseAmount / 1000;

    this.generateLottos(lottoCount);
    OutputView.printLottoNumber(this.LottoNumbers);

    const winningNumbers = await InputView.winningNumbersInput();
    const bonusNumber = await InputView.bonusNumberInput(winningNumbers);

    const results = this.calculateResults(winningNumbers, bonusNumber);
    const profitRate = this.calculateProfitRate(results, purchaseAmount);

    OutputView.printStatistics(results, profitRate);
  }

  generateLottos(count) {
    for (let i = 0; i < count; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      this.LottoNumbers.push(new Lotto(numbers));
    }
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
      const matchCount = lotto.countMatches(winningNumbers);
      const bonusMatch = lotto.hasBonus(bonusNumber);

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
    for (const key in results) totalPrize += results[key] * PRIZE[key];
    return Math.round((totalPrize / purchaseAmount) * 100 * 100) / 100;
  }
}

export default App;
