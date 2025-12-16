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
