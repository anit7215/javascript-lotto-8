import Validator from "../src/utils/Validator.js";

describe("Validator 테스트", () => {
  describe("구입 금액 검증", () => {
    test.each([["1000j"], ["-1000"], ["1500"]])(
      "구입 금액이 유효하지 않으면 예외가 발생한다.",
      (input) => {
        expect(() => {
          Validator.validatePurchaseAmount(input);
        }).toThrow("[ERROR]");
      }
    );
  });

  describe("당첨 번호 검증", () => {
    test.each([
      [[1, 2, 3, 4, 5]],
      [[1, 2, 3, 4, 5, 5]],
      [[1, 2, 3, 4, 5, 46]],
      [[1, 2, 3, 4, 5, "a"]],
    ])("당첨 번호가 유효하지 않으면 예외가 발생한다.", (numbers) => {
      expect(() => {
        Validator.validateWinningNumbers(numbers);
      }).toThrow("[ERROR]");
    });
  });

  describe("보너스 번호 검증", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    test.each([["a"], ["46"], ["6"]])(
      "보너스 번호가 유효하지 않으면 예외가 발생한다.",
      (input) => {
        expect(() => {
          Validator.validateBonusNumber(input, winningNumbers);
        }).toThrow("[ERROR]");
      }
    );
  });
});
