export class MyUploadAdapter {
  loader: any
  xhr: any

  constructor(loader: any) {
    this.loader = loader
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file: any) =>
        new Promise((resolve, reject) => {
          this._initRequest()
          this._initListeners(resolve, reject, file)
          this._sendRequest(file)
        })
    )
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest())
    xhr.open('POST', 'https://musitix-api.onrender.com/admin/activities/upload_image', true)
    xhr.responseType = 'json'
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(
    resolve: { (value: unknown): void; (arg0: { default: any }): void },
    reject: {
      (reason?: any): void
      (arg0: string | undefined): any
    },
    file: { name: any }
  ) {
    const xhr = this.xhr
    const loader = this.loader
    const genericErrorText = `Couldn't upload file: ${file.name}.`

    xhr.addEventListener('error', () => reject(genericErrorText))
    xhr.addEventListener('abort', () => reject())
    xhr.addEventListener('load', () => {
      const response = xhr.response

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.

      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error || xhr.status !== 200) {
        let errorMessage = ''
        if (response.message)
          //後端自訂
          errorMessage = response.message
        else errorMessage = response && response.error ? response.error.message : genericErrorText
        return reject(errorMessage)
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: response.data
      })
    })

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener(
        'progress',
        (evt: { lengthComputable: any; total: any; loaded: any }) => {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total
            loader.uploaded = evt.loaded
          }
        }
      )
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file: string | Blob) {
    // Prepare the form data.
    const data = new FormData()

    data.append('upload', file)
    this.xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('Token')}`)

    // Send the request.
    this.xhr.send(data)
  }
}
