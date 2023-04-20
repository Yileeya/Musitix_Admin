interface ErrorObject {
  status?: number
  message?: string
}

export function consoleError(error: ErrorObject): void {
  let errorMessage = ''

  if (error.status && error.message) {
    errorMessage = `${error.status}: ${error.message}`
  } else if (error.message) {
    errorMessage = error.message
  } else {
    errorMessage = 'An unknown error has occurred.'
  }
  console.log(errorMessage)
}
