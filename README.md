# Minimal JSON Server API

## Prerequisites

- Node.js version 16.x or higher
- npm or yarn

## Installation

Install dependencies:

```bash
npm install
```

## Usage

### Single Command (Recommended)

Run seeding and start the server in one command:

```bash
npm run start
```

This will:

1. Generate 1,000 users, 100 countries, and predefined roles
2. Write data to `db.json`
3. Start the JSON Server on port 1008

### Individual Commands

**Generate/Seed Data:**

```bash
npm run seed
```

**Start Server:**

```bash
npm run dev
```

**Clean Database:**

```bash
npm run clean
```

## API Endpoints

Once the server is running, the API will be available at `http://localhost:1008`

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `PATCH /users/:id` - Partially update a user
- `DELETE /users/:id` - Delete a user

### Roles

- `GET /roles` - Get all roles
- `GET /roles/:id` - Get a specific role
- `POST /roles` - Create a new role
- `PUT /roles/:id` - Update a role
- `PATCH /roles/:id` - Partially update a role
- `DELETE /roles/:id` - Delete a role

### Countries

- `GET /countries` - Get all countries
- `GET /countries/:id` - Get a specific country
- `POST /countries` - Create a new country
- `PUT /countries/:id` - Update a country
- `PATCH /countries/:id` - Partially update a country
- `DELETE /countries/:id` - Delete a country

### Query Examples

- `GET /users?country.id=1` - Filter users by country ID
- `GET /users?country.name=United States` - Filter users by country name
- `GET /users?role.name=Administrator` - Filter users by role
- `GET /users?_limit=10` - Limit results
- `GET /users?_page=1&_limit=20` - Pagination (inspect `X-Total-Count` header for totals)
- `GET /users?_sort=lastName&_order=asc` - Sort results

## Testing

### Using curl

```bash
# Get all users
curl http://localhost:1008/users

# Get a specific user
curl http://localhost:1008/users/1

# Get all countries
curl http://localhost:1008/countries

# Delete a user
curl -X DELETE http://localhost:1008/users/1

# Create a new user
curl -X POST http://localhost:1008/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","countryId":1}'
```

### Using Browser

Simply navigate to:

- `http://localhost:1008/users` - View all users
- `http://localhost:1008/countries` - View all countries
- `http://localhost:1008/users/1` - View user with ID 1

## Data Structure

### User

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "avatar": "https://avatars.githubusercontent.com/u/74488724",
  "country": {
    "id": 1,
    "name": "United States"
  },
  "role": {
    "id": 1,
    "name": "Administrator"
  }
}
```

### Country

```json
{
  "id": 1,
  "name": "United States"
}
```

### Role

```json
{
  "id": 1,
  "name": "Administrator"
}
```