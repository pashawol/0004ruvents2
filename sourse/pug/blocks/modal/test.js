(function () {
  let isFormLocked = false;
  let reCaptcha;
  let isCaptchaReady;
  const formType = "deal";
  const contractorType = "human";
  const formId = "mpe4da3b7fbbce2345d7772b0674a318d5";
  const formRootElement = document.querySelector("#" + formId);
  const submitButton = formRootElement.querySelector(".form .form__button");
  const restartButton = formRootElement.querySelector(".form__restart");
  const phoneInputs = formRootElement.querySelectorAll(
    '.form__item [type="tel"]'
  );
  const successText = formRootElement.querySelector(".success");
  const formElement = formRootElement.querySelector(".form");
  const formError = formRootElement.querySelector(
    ".form .form__item.form__error"
  );
  const useCaptcha = false;
  const formData = {
    "contractor.firstName": {
      name: "contractor.firstName",
      value: null,
      validators: [requiredValidator],
      type: "input",
      isLogicField: false,
      logicHandler: function () {},
      settings: {},
    },
    "contractor.phone": {
      name: "contractor.phone",
      value: null,
      validators: [requiredValidator, phoneValidator],
      type: "phone",
      isLogicField: false,
      logicHandler: function () {},
      settings: {},
    },
    "contractor.email": {
      name: "contractor.email",
      value: null,
      validators: [requiredValidator, emailValidator],
      type: "email",
      isLogicField: false,
      logicHandler: function () {},
      settings: {},
    },
  };
  const elementInitializers = [];
  initForm();
  function initForm() {
    phoneInputs.forEach((element) =>
      element.addEventListener("input", phoneInputHandler, false)
    );
    restartButton.addEventListener("click", clearForm);
    submitButton.onclick = submitHandler;
    initFields();
    elementInitializers.forEach((initializer) => initializer.init());
  }
  function initFields() {
    Object.values(formData).map((item) => {
      if (item.isLogicField) {
        item.value = item.logicHandler();
        return;
      }
      switch (item.type) {
        case "email":
        case "phone":
          const contactElement = formRootElement.querySelector(
            ".form__item.item__" + item.name.replace(".", "_") + " .form__input"
          );
          contactElement.oninput = function () {
            setField(item.name, {
              contentType: "ContactInfo",
              type: item.type,
              value: contactElement.value.trim(),
            });
          };
          break;
        case "input":
          const inputElement = formRootElement.querySelector(
            ".form__item.item__" + item.name.replace(".", "_") + " .form__input"
          );
          inputElement.oninput = function () {
            setField(item.name, inputElement.value);
          };
          break;
        case "float":
          const floatElement = formRootElement.querySelector(
            ".form__item.item__" + item.name.replace(".", "_") + " .form__input"
          );
          floatElement.oninput = function () {
            setField(item.name, parseFloat(floatElement.value));
          };
          break;
        case "checkbox":
          const checkboxElement = formRootElement.querySelector(
            ".form__item.item__" +
              item.name.replace(".", "_") +
              " .form__checkbox_hidden"
          );
          checkboxElement.oninput = function () {
            setField(item.name, checkboxElement.checked);
          };
          break;
      }
    });
  }
  function clearForm() {
    successText.style.display = "none";
    successText.querySelector("p").innerHTML = "";
    formElement.style.display = "block";
    Object.keys(formData).forEach((key) => (formData[key].value = null));
    elementInitializers.forEach((item) => item.clear());
    formRootElement
      .querySelectorAll(".form .form__input")
      .forEach((input) => (input.value = ""));
    unLockButton();
  }
  function showFormError(text) {
    formError.style.display = "block";
    formError.innerHTML = text;
    unLockButton();
  }
  function showFieldError(field, message) {
    if (!field || !formData[field]) {
      showFormError(message);
      return;
    }
    formRootElement
      .querySelector(".form .item__" + field.replace(".", "_"))
      ?.classList.add("error");
    const errField = formRootElement.querySelector(
      ".form .item__" + field.replace(".", "_") + " .form__error"
    );
    if (errField) {
      errField.innerHTML = message;
      errField.style.display = "block";
    } else {
      showFormError(message);
    }
  }
  function handleErrors(errors) {
    errors.forEach((err) => {
      showFieldError(err.field, err.message);
    });
    unLockButton();
  }
  function hideError() {
    formError.style.display = "none";
    formRootElement
      .querySelectorAll(".form .error")
      .forEach((element) => element.classList.remove("error"));
    formRootElement
      .querySelectorAll(".form .form__error")
      .forEach((errorField) => {
        errorField.style.display = "none";
        errorField.innerHTML = "";
      });
  }
  function showSuccess(text) {
    formElement.style.display = "none";
    successText.style.display = "block";
    successText.querySelector("p").innerHTML = text;
    unLockButton();
  }
  function setField(fieldName, value) {
    hideError();
    formData[fieldName].value = value;
  }
  function getContentTypeForContractor(contractorType) {
    return contractorType === "human" ? "ContractorHuman" : "ContractorCompany";
  }
  async function submitHandler() {
    if (isFormLocked) {
      return;
    }
    lockButton();
    const fields = Object.values(formData);
    const isValid =
      fields
        .map(
          (item) =>
            item.validators
              .map((validator) => {
                const validateError = validator(item.value);
                if (validateError) {
                  showFieldError(item.name, validateError);
                }
                return !validateError;
              })
              .filter(Boolean).length === item.validators.length
        )
        .filter(Boolean).length === fields.length;
    const contactInfo = [];
    if (isValid) {
      const request = fields.reduce((dataObj, item) => {
        if (["email", "phone"].includes(item.type)) {
          if (item.value?.value?.trim()) {
            contactInfo.push(item.value);
          }
          return dataObj;
        }
        if (item.name.startsWith("contractor.")) {
          if (!dataObj.contractor) {
            dataObj.contractor = {
              contentType: getContentTypeForContractor(contractorType),
            };
          }
          dataObj.contractor[item.name.replace("contractor.", "")] = item.value;
        } else {
          dataObj[item.name] = item.value;
        }
        return dataObj;
      }, {});
      if (formType === "deal") {
        request.contentType = "Deal";
        if (!!request.contractor) {
          request.contractor.contactInfo = contactInfo;
        }
      } else {
        request.contentType = getContentTypeForContractor(contractorType);
        request.contactInfo = contactInfo;
      }
      sendRequest(request);
    } else {
      unLockButton();
    }
  }
  function lockButton() {
    isFormLocked = true;
    submitButton.classList.add("form__button_disabled");
    submitButton.onclick = null;
  }
  function unLockButton() {
    isFormLocked = false;
    submitButton.classList.remove("form__button_disabled");
    submitButton.onclick = submitHandler;
  }
  function phoneInputHandler(e) {
    e.target.value = e.target.value.replace(/[^\d()\-+]/g, "");
  }
  function requiredValidator(value) {
    return !value ? "Поле обязательно для заполнения" : "";
  }
  function emailValidator(contactInfo) {
    return contactInfo &&
      contactInfo.value &&
      !contactInfo.value.match(/.+@.+\..+/i)
      ? "Некорректный email"
      : "";
  }
  function phoneValidator(contactInfo) {
    return contactInfo &&
      contactInfo.value &&
      !contactInfo.value.match(/^\+?[\d()\-\s]+$/)
      ? "Некорректный номер телефона"
      : "";
  }
  function sendRequest(request) {
    const reqParams = useCaptcha
      ? "?" + JSON.stringify({ token: reCaptcha.getToken() })
      : "";
    fetch(
      "https://ruvents.megaplan.ru/api/v3/customLeadForm/5/process/deal" +
        reqParams,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data?.meta?.status !== 200) {
          if (!data?.meta?.errors || data?.meta?.status > 500) {
            throw new Error();
          }
          handleErrors(data.meta.errors);
          return;
        }
        showSuccess("Благодарим за обращение. Мы скоро с Вами свяжемся");
      })
      .catch(() => {
        showFormError("При отправке формы произошла ошибка. Попробуйте позже.");
      });
  }
})();
