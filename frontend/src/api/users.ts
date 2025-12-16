import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export interface Country {
  id: number
  name: string
}

export interface Role {
  id: number
  name: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string | null
  country: Country
  role: Role
}

export interface UsersQuery {
  page: number
  limit: number
  sort: string
  order: 'asc' | 'desc'
  search?: string
  countryId?: string
  roleName?: string
}

export const fetchUsers = async (params: UsersQuery) => {
  const queryParams: Record<string, string | number> = {
    _page: params.page,
    _limit: params.limit,
    _sort: params.sort,
    _order: params.order,
  }

  if (params.search) queryParams.q = params.search
  if (params.countryId) queryParams['country.id'] = params.countryId
  if (params.roleName) queryParams['role.name'] = params.roleName

  const res = await api.get<User[]>('/users', {
    params: queryParams,
  })

  return {
    data: res.data,
    total: Number(res.headers['x-total-count']),
  }
}

export const deleteUser = (id: number) => api.delete<void>(`/users/${id}`)

export const fetchCountries = async (): Promise<Country[]> =>
  (await api.get<Country[]>('/countries')).data

export const fetchRoles = async (): Promise<Role[]> =>
  (await api.get<Role[]>('/roles')).data
