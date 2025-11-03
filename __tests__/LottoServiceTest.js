import Lotto from "../src/Lotto.js";
import LottoService from "../src/LottoService.js";

describe("LottoService 테스트", () => {
  test("당첨 결과를 계산한다.", () => {
    const lottos = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 4, 5, 7]),
      new Lotto([1, 2, 3, 4, 5, 8]),
      new Lotto([1, 2, 3, 4, 8, 9]),
      new Lotto([1, 2, 3, 8, 9, 10]),
      new Lotto([10, 11, 12, 13, 14, 15]),
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const results = LottoService.calculateResults(
      lottos,
      winningNumbers,
      bonusNumber
    );

    expect(results).toEqual({
      3: 1,
      4: 1,
      5: 1,
      "5+bonus": 1,
      6: 1,
    });
  });

  test("수익률은 소수점 둘째 자리에서 반올림한다.", () => {
    const results = { 3: 1, 4: 0, 5: 0, "5+bonus": 0, 6: 0 };
    const purchaseAmount = 8000;
    const profitRate = LottoService.calculateProfitRate(
      results,
      purchaseAmount
    );
    expect(profitRate).toBe(62.5);
  });
});
