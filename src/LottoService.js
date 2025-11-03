import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class LottoService {
  static generateLottos(count) {
    const lottos = [];
    for (let i = 0; i < count; i++) {
      const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      lottos.push(new Lotto(numbers));
    }
    return lottos;
  }

  static calculateResults(lottos, winningNumbers, bonusNumber) {
    const result = {
      3: 0,
      4: 0,
      5: 0,
      "5+bonus": 0,
      6: 0,
    };
    lottos.forEach((lotto) => {
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

  static calculateProfitRate(results, purchaseAmount) {
    const PRIZE = {
      3: 5000,
      4: 50000,
      5: 1500000,
      "5+bonus": 30000000,
      6: 2000000000,
    };
    const totalPrize = Object.keys(results).reduce(
      (sum, key) => sum + results[key] * PRIZE[key],
      0
    );
    return Math.round((totalPrize / purchaseAmount) * 100 * 100) / 100;
  }
}

export default LottoService;
