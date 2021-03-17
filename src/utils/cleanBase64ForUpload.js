const BASE_64_SUBSTR = ';base64,';

function cleanBase64ForUpload(base64String) {
  const splitPoint = base64String.indexOf(BASE_64_SUBSTR);
  if (splitPoint < 0) {
    return base64String;
  }
  return base64String.substring(splitPoint + BASE_64_SUBSTR.length);
}

export default cleanBase64ForUpload;
