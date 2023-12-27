import validator from "card-validator";

export default class CardValidator {
  constructor(numberInput, yearInput, monthInput, cvvInput, emailInput, btn) {
    this.numberInput = numberInput;
    this.yearInput = yearInput;
    this.monthInput = monthInput;
    this.cvvInput = cvvInput;
    this.emailInput = emailInput;
    this.btn = btn;
    this.validObj = {
      cardNumb: false, cardMonth: false, cardYear: false, cardCvv: false, email: false
    };

  }

  validCheck(element, state) {

    this.validObj[element.id] = state
    if (state) {
      element.style.borderColor = 'green';
    } else {
      element.style.borderColor = 'red';
    }

    let check = false
    for (const key in this.validObj) {
      console.log(this.validObj)
      if (!this.validObj[key]) {
        this.btn.setAttribute('disabled', 'disabled');
        return
      }
    }
    console.log(1)
    this.btn.removeAttribute('disabled');
  }

  numberSeparation() {this.numberInput.value = this.numberInput.value
      .replace(/\s/g, '') // Удаляем все пробелы
      .replace(/(\d{4})/g, (match, group) => `${group} `) // Добавляем пробел после каждой группы 4х цифр
      .trim();
  }



  isNumberValid() {
    this.validCheck(this.numberInput, validator.number(this.numberInput.value).isValid)
  }

  isExpiryDateValid() {
    const expiryDate = `${this.monthInput.value.trim()} ${this.yearInput.value.trim()}`;
    const currentYear = new Date().getFullYear()
    this.validCheck(this.monthInput, validator.expirationDate(expiryDate, currentYear + 5).isValid)
    this.validCheck(this.yearInput, validator.expirationDate(expiryDate, currentYear + 5).isValid)
  }

  isCvvValid() {
    this.validCheck(this.cvvInput, validator.cvv(this.cvvInput.value.trim()).isValid)
  }

  isEmailValid() {
    const emailReg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    this.validCheck(this.emailInput, emailReg.test(this.emailInput.value.trim()));
  }
}
