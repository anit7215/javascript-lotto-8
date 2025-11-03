import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";
import LottoService from "./LottoService.js";

class App {
  async run() {
    const purchaseAmount = await InputView.purchaseAmountInput();
    const lottoCount = purchaseAmount / 1000;

    const LottoNumbers = LottoService.generateLottos(lottoCount);
    OutputView.printLottoNumber(LottoNumbers);

    const winningNumbers = await InputView.winningNumbersInput();
    const bonusNumber = await InputView.bonusNumberInput(winningNumbers);

    const results = LottoService.calculateResults(LottoNumbers, winningNumbers, bonusNumber);
    const profitRate = LottoService.calculateProfitRate(results, purchaseAmount);

    OutputView.printStatistics(results, profitRate);
  }
}

export default App;
