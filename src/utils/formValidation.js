const nameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9\s.]*(?:[a-zA-Z0-9]))?$/;
const emailRegex = /^[a-z0-9._%+!$&*=^|~#%'`?{}\/-]+@[a-z0-9-]+\.[a-z]{2,16}$/i;
const phoneRegex = /^(\+[0-9]{1,3}[6-9][0-9]{9}|[6-9][0-9]{9})$/;
const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg|jfif)$/i;
const videoRegex =
  /\.(mp4|mov|avi|mkv|webm|flv|wmv|mpeg|mpg|m4v|3gp|3g2|ogg)$/i;

const validateName = (name) => {
  return nameRegex.test(name.trim());
};

const validateEmail = (email) => {
  return emailRegex.test(email);
};

const validatePhoneNo = (number) => {
  return phoneRegex.test(number);
};

const validatePdfFile = (pdfFile) => {
  if (pdfFile === undefined) return false;
  if (pdfFile.type !== "application/pdf") return false;
  return true;
};

const validateImageAndVideoFile = (file) => {
  if (!file) return false;
  let splittedExtArray = file.name.split(".");

  return (
    imageRegex.test(`.${splittedExtArray[splittedExtArray.length - 1]}`) ||
    videoRegex.test(`.${splittedExtArray[splittedExtArray.length - 1]}`)
  );
};

export {
  validateEmail,
  validateName,
  validatePhoneNo,
  validatePdfFile,
  validateImageAndVideoFile,
};
