export const updateObject = (oldObj, updatedValue) => {
  return {
    ...oldObj,
    ...updatedValue
  }
}
