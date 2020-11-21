class FormValidator {
  constructor(options, validatedForm) {
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._validatedForm = validatedForm;

    this._inputList = Array.from(validatedForm.querySelectorAll(this._inputSelector))
    this._buttonElement = validatedForm.querySelector(this._submitButtonSelector);

    this._formInputs = validatedForm.querySelectorAll('.popup__input');
    this._formButtonSave = validatedForm.querySelector('.popup__button-save');

  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.isValid(inputElement)
        this._toggleButtonState();
      });
    });
  }

  isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }

  }

  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }

  }

  _hasInvalidInput(inputList) {
    return inputList.some((item) => {
      return !item.validity.valid;
    })
  }

  _showInputError(inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._validatedForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };


  _hideInputError(inputElement) {
    // Находим элемент ошибки
    const errorElement = this._validatedForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _validateForm() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this.isValid(inputElement);
    });
  }

  validateForm() {
    this._validateForm();
  }
  
  enableValidation() {
    this._setEventListeners();
  }

  // Очистить поля ввода формы и сделать кнопку неактивной
  prepareClearForm() {
    this._formInputs.forEach((inputElement) => {
      inputElement.value = '';
    });
    this._formButtonSave.classList.add(this._inactiveButtonClass);
  }

}

export default FormValidator;
