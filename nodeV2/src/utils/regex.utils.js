const regExp = {
  email: /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/,
  number:
    /((?:\+|00)[17](?: |-)?|(?:\+|00)[1-9]\d{0,2}(?: |-)?|(?:\+|00)1-\d{3}(?: |-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |-)[0-9]{3}(?: |-)[0-9]{4})|([0-9]{7}))/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10000}$/,
};

export const regexIsOk = (regexp, value) => regexp.test(value);
export const emailIsValid = (email) => regexIsOk(regExp.email, email);
export const passwordIsValid = (password) =>
  regexIsOk(regExp.password, password);
export const numberIsValid = (number) => regexIsOk(regExp.number, number);
