export const errorTransform = errorObj => {
  const errorsArr = [];
  for (const key in errorObj) {
    for (let i = 0; i < errorObj[key].length; i++) {
      errorsArr.push(`${key} ${errorObj[key][i]}`);
    }
  }
  return errorsArr;
}
