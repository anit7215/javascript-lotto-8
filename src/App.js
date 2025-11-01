import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const purchaseAmount = await Console.readLineAsync(
      "구입금액을 입력해 주세요.\n"
    );
    Console.print(this.amountToLottoCount(purchaseAmount));
  }

  amountToLottoCount(purchaseAmount) {
    if (purchaseAmount > 0 && purchaseAmount % 1000 !== 0)
      return "[ERROR] 구입금액은 1,000원 단위로 입력해 주세요.";
    return purchaseAmount / 1000;
  }
}

export default App;
