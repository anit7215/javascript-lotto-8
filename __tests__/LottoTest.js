import Lotto from "../src/Lotto";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow("[ERROR]");
  });

  // TODO: 테스트가 통과하도록 프로덕션 코드 구현
  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow("[ERROR]");
  });

  // TODO: 추가 기능 구현에 따른 테스트 코드 작성
  test("번호가 1~45를 벗어나면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow("[ERROR]");
  });
});

describe("로또 당첨 결과 계산 테스트", () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
  const winningNumbers = [1, 2, 3, 7, 8, 9];

  test("당첨 번호와 일치하는 개수를 정확히 계산한다.", () => {
    expect(lotto.countMatches(winningNumbers)).toBe(3);
  });

  test.each([
    [5, true], // 보너스 번호 포함
    [10, false], // 보너스 번호 미포함
  ])(
    "보너스 번호가 포함되어 있는지를 판단한다.",
    (bonusNumber, expected) => {
      expect(lotto.hasBonus(bonusNumber)).toBe(expected);
    }
  );
});
