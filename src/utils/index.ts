import { resolve } from 'path'

// ** Convert full name to language specific
export const toFullName = (lastName: string, middleName: string, firstName: string, language: string) => {
  if (language === 'vi') {
    return `${lastName ? lastName : ''} ${middleName ? middleName : ''} ${firstName ? firstName : ''}`.trim()
  }

  // Default is English
  return `${firstName ? firstName : ''} ${middleName ? middleName : ''} ${lastName ? lastName : ''}`.trim()
}

// ** Convert file to base64
export const convertToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = error => {
      reject(error)
    }
  })

export const separationFullName = (fullName: string, language: string) => {
  const result = {
    lastName: '',
    middleName: '',
    firstName: ''
  }

  const arrFullName = fullName.trim().split(' ')?.filter(Boolean)

  if (arrFullName.length === 1) {
    if (language === 'vi') {
      result.firstName = arrFullName.join()
    } else if (language === 'en') {
      result.lastName = arrFullName.join()
    }
  } else if (arrFullName.length === 2) {
    if (language === 'vi') {
      result.lastName = arrFullName[0]
      result.firstName = arrFullName[1]
    } else if (language === 'en') {
      result.firstName = arrFullName[0]
      result.lastName = arrFullName[1]
    }
  } else if (arrFullName.length >= 3) {
    if (language === 'vi') {
      result.lastName = arrFullName[0]
      result.middleName = arrFullName[1]
      result.firstName = arrFullName.slice(2).join(' ')
    } else if (language === 'en') {
      result.firstName = arrFullName[0]
      result.middleName = arrFullName[1]
      result.lastName = arrFullName.slice(2).join(' ')
    }
  }

  return result
}
