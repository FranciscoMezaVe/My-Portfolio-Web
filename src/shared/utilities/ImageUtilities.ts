export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('File could not be converted to base64 string.'))
      }
    }

    reader.onerror = () => reject(reader.error)

    reader.readAsDataURL(file)
  })
}
