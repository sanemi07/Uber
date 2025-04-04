# User Registration API Documentation

## Register User
Creates a new user account and returns an authentication token.

**Endpoint:** `POST /api/auth/register`

### Request Body
```json
{
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "email": "string",
    "password": "string"
}
```

### Validation Rules
- **firstName**: Minimum 3 characters required
- **lastName**: Minimum 3 characters required  
- **email**: Must be a valid email format
- **password**: Minimum 6 characters required

### Example Request
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com", 
    "password": "password123"
}
```

### Responses

#### Success Response
**Code:** 201 Created
```json
{
    "token": "jwt_token_string"
}
```

#### Error Responses

**Code:** 400 Bad Request
```json
{
    "errors": [
        {
            "msg": "Invalid email.",
            "path": "email",
            "location": "body"
        }
    ]
}
```

**Code:** 400 Bad Request
```json
{
    "errors": [
        {
            "msg": "Full name must contain firstName and lastName.",
            "path": "fullName",
            "location": "body" 
        }
    ]
}
```

**Code:** 400 Bad Request
```json
{
    "errors": [
        {
            "msg": "Email already in use.",
            "path": "email",
            "location": "body"
        }
    ]
}
```

## Login User
Authenticates a user and returns a JWT token.

**Endpoint:** `POST /api/auth/login`

### Request Body
```json
{
    "email": "string",
    "password": "string"
}
```

### Validation Rules
- **email**: Must be a valid email format
- **password**: Minimum 6 characters required

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Responses

#### Success Response
**Code:** 200 OK
```json
{
    "token": "jwt_token_string",
    "user": {
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "user_id"
    }
}
```

#### Error Responses

**Code:** 401 Unauthorized
```json
{
    "errors": [
        {
            "msg": "invalid email",
            "path": "email",
            "location": "body"
        }
    ]
}
```

**Code:** 401 Unauthorized
```json
"user does not exist"
```

**Code:** 401 Unauthorized
```json
"incorrect password"
```

## Get User Profile
Returns the profile information of the authenticated user.

**Endpoint:** `GET /api/auth/profile`

### Headers
```json
{
    "Authorization": "Bearer jwt_token_string"
}
```

### Responses

#### Success Response
**Code:** 200 OK
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "user_id"
}
```

#### Error Response
**Code:** 401 Unauthorized
```json
{
    "message": "Authentication required"
}
```

## Logout User
Logs out the currently authenticated user and invalidates the JWT token.

**Endpoint:** `POST /api/auth/logout`

### Headers
```json
{
    "Authorization": "Bearer jwt_token_string"
}
```

### Responses

#### Success Response
**Code:** 201 Created
```json
"user loggedout successfully"
```

#### Error Response
**Code:** 401 Unauthorized
```json
{
    "message": "Authentication required"
}
```

# Captain API Documentation

## Register Captain
Creates a new captain account and returns an authentication token.

**Endpoint:** `POST /api/captains/register`

### Request Body
```json
{
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "email": "string",
    "password": "string",
    "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
    }
}
```

### Validation Rules
- **firstName**: Minimum 3 characters required
- **lastName**: Minimum 3 characters required
- **email**: Must be a valid email format
- **password**: Minimum 6 characters required
- **vehicle.color**: Minimum 3 characters required
- **vehicle.plate**: Minimum 3 characters required
- **vehicle.capacity**: Minimum value of 1
- **vehicle.vehicleType**: Must be one of: "bike", "car", "auto"

### Example Request
```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Driver"
    },
    "email": "john.driver@example.com",
    "password": "password123",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Responses

#### Success Response
**Code:** 201 Created
```json
{
    "token": "jwt_token_string",
    "captain": {
        "fullName": {
            "firstName": "John",
            "lastName": "Driver"
        },
        "email": "john.driver@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive",
        "_id": "captain_id"
    }
}
```

#### Error Response
**Code:** 422 Unprocessable Entity
```json
{
    "errors": [
        {
            "msg": "Invalid email.",
            "path": "email",
            "location": "body"
        }
    ]
}
```

## Login Captain
Authenticates a captain and returns a JWT token.

**Endpoint:** `POST /api/captains/login`

### Request Body
```json
{
    "email": "string",
    "password": "string"
}
```

### Validation Rules
- **email**: Must be a valid email format
- **password**: Minimum 6 characters required

### Example Request
```json
{
    "email": "john.driver@example.com",
    "password": "password123"
}
```

### Responses

#### Success Response
**Code:** 200 OK
```json
{
    "token": "jwt_token_string",
    "captain": {
        "fullName": {
            "firstName": "John",
            "lastName": "Driver"
        },
        "email": "john.driver@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive",
        "_id": "captain_id"
    }
}
```

#### Error Responses
**Code:** 404 Not Found
```json
{
    "message": "Captain not found"
}
```

**Code:** 401 Unauthorized
```json
{
    "message": "Invalid credentials"
}
```

## Get Captain Profile
Returns the profile information of the authenticated captain.

**Endpoint:** `GET /api/captains/profile`

### Headers
```json
{
    "Authorization": "Bearer jwt_token_string"
}
```

### Responses

#### Success Response
**Code:** 200 OK
```json
{
    "captain": {
        "fullName": {
            "firstName": "John",
            "lastName": "Driver"
        },
        "email": "john.driver@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive",
        "_id": "captain_id"
    }
}
```

#### Error Response
**Code:** 401 Unauthorized
```json
{
    "message": "Unauthorized"
}
```

## Logout Captain
Logs out the currently authenticated captain and invalidates the JWT token.

**Endpoint:** `POST /api/captains/logout`

### Headers
```json
{
    "Authorization": "Bearer jwt_token_string"
}
```

### Responses

#### Success Response
**Code:** 201 Created
```json
{
    "message": "captain logged out successfully"
}
```

#### Error Response
**Code:** 401 Unauthorized
```json
{
    "message": "Unauthorized"
}
```