import { Console } from "@woowacourse/mission-utils";
import Validator from "../utils/Validator.js";

class InputView {
  static async purchaseAmountInput() {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          "구입금액을 입력해 주세요.\n"
        );
        Validator.validatePurchaseAmount(input);
        return Number(input);
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  static async winningNumbersInput() {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          "\n당첨 번호를 입력해 주세요.\n"
        );
        const numbers = input.split(",").map((num) => Number(num.trim()));
        Validator.validateWinningNumbers(numbers);
        return numbers;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  static async bonusNumberInput(winningNumbers) {
    while (true) {
      try {
        const input = await Console.readLineAsync(
          "\n보너스 번호를 입력해주세요.\n"
        );
        const bonusNumber = Number(input);
        Validator.validateBonusNumber(bonusNumber, winningNumbers);
        return bonusNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export default InputView;