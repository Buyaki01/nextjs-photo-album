import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import getUsers from '../getUsers'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
      { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
    ]),
  })
)

describe('getUsers', () => {
  it('should return a list of users when the API call is successful', async () => {
    const users = await getUsers()

    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')

    expect(Array.isArray(users)).toBe(true)

    expect(users.length).toBeGreaterThan(0)
  })
})