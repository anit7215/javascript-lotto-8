import { Console, Random } from "@woowacourse/mission-utils";

class App {
  LottoNumbers = [];

  async run() {
    const purchaseAmount = await Console.readLineAsync(
      "구입금액을 입력해 주세요.\n"
    );
    const lottoAmount = this.amountToLottoCount(purchaseAmount);
    this.printLottoNumber(lottoAmount);
  }

  amountToLottoCount(purchaseAmount) {
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
}

export default App;
