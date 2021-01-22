export const headersGenerator = token => {
  if (token) return {
    "Content-Type": "application/json",
    "Authorization": `Token ${token}`
  }
  return {
    "Content-Type": "application/json"
  }
}
