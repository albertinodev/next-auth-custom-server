import { v4 as uuid } from 'uuid'

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export const signInRequest = async (signInRequestData) => {
  //const { email, password } = signInRequestData; Destruct email and password

  await delay()

  return {
    token: uuid(),
    user: {
      name: 'Name Surname',
      email: 'username@provider.com',
      avatar_url: 'https://i.picsum.photos/id/237/200/200'
    }
  }
}


export const recoverUserInformation = async(token) => {
  //Get user by toke and return
  await delay()

  return {
    user: {
      name: 'Name Surname',
      email: 'username@provider.com',
      avatar_url: 'https://i.picsum.photos/id/237/200/200'
    }
  }
}