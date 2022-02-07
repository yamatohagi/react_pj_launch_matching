const emailValidation = (email) => {
  if (!email) return "メールアドレスを入力してください";

  // const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // if (!regex.test(email)) return "正しいメールアドレスを入力してください";

  return "";
};

const nameValidation = (name) => {
  if (!name) return "名前を入力してください";
  const regex = /[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓1234567890１２３４５６７８９０]+/;
  if (regex.test(name)) return "記号を入れないでください";

  return "";
};
class Validation {
  static formValidate = (type, value) => {
    switch (type) {
      case "email":
        return emailValidation(value);
      case "name":
        return nameValidation(value);
    }
  };
}

export default Validation;
