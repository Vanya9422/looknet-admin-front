const numberWithSpaces = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const zeroPad = (num, places = 2) => String(num).padStart(places, "0");

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getObjectLength = (object) => {
  return Object.values(object).length;
};

const generateErrorMessage = (error) => {
  let errorMessage = "Error text";

  if (error.response?.data?.errors) {
    Object.keys(error.response.data.errors).forEach((errorKey) => {
      if (error.response.data.errors[errorKey]) {
        const errorText = error.response.data.errors[errorKey];
        const formattedErrorText = Array.isArray(errorText)
          ? errorText.join(" ")
          : errorText;

        errorMessage = formattedErrorText;
      }
    });
  } else if (error.response?.statusText) {
    errorMessage = error.response.statusText;
  }

  return errorMessage;
};

export {
  numberWithSpaces,
  numberWithDots,
  zeroPad,
  getRandomArbitrary,
  getRandomInt,
  getObjectLength,
  generateErrorMessage,
};
