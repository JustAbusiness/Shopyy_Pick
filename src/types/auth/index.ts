export type TLoginAuth = {
    email: string
    password: string
}

export type TRegisterAuth = {
    email: string
    password: string
    confirmPassword: string
}

export type TUpdateAuthMe = {
    email: string
    firstName: string
    middleName: string
    lastName: string
    phoneNumber: string
    addresses: string
    avatar: string
    city: string
    role: string
}    