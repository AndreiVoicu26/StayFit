export const isValidURL = (url) => {
  const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/;
  return urlRegex.test(url);
};
