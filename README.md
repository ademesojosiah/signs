# Authentication API Documentation

## Base URL

`https://signs-5n09.onrender.com`


## Endpoints

### 1. Sign-Up

#### Endpoint

`POST /auth/signup`

#### Description

Creates a new user account. Expects user input data in the request body and returns a success message with user details and a token.

#### Request

##### Headers

- **Content-Type**: `application/json`

##### Body

```json
{
    "fullname": "string",
    "email": "string",
    "password": "string",
    "role": "string"
}
```

- **fullname** (string): The full name of the user.
- **email** (string): The email address of the user. It should be unique and not already registered.
- **password** (string): The password for the user account. It will be hashed before storing.
- **role** (string): The role assigned to the user (e.g., "user", "admin").

##### Example Request

```sh
curl -X POST https://signs-5n09.onrender.com/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "fullname": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "role": "user"
}'
```

#### Response

##### Status

200 OK

##### Body

```json
{
    "status": "success",
    "message": "user created successfully",
    "data": {
        "id": "number",
        "fullname": "string",
        "email": "string",
        "userRole": "string"
    },
    "token": "string"
}
```

- **status** (string): Status of the response.
- **message** (string): A success message.
- **data** (object):
  - **id** (number): The unique ID of the newly created user.
  - **fullname** (string): The full name of the user.
  - **email** (string): The email address of the user.
  - **userRole** (string): The role assigned to the user.
- **token** (string): JWT token for authentication.

---

### 2. Login

#### Endpoint

`POST /auth/login`

#### Description

Logs in an existing user. Expects user email and password in the request body and returns a success message with user details and a token.

#### Request

##### Headers

- **Content-Type**: `application/json`

##### Body

```json
{
    "email": "string",
    "password": "string"
}
```

- **email** (string): The email address of the user.
- **password** (string): The password for the user account.

##### Example Request

```sh
curl -X POST https://signs-5n09.onrender.com/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "johndoe@example.com",
  "password": "password123"
}'
```

#### Response

##### Status

200 OK

##### Body

```json
{
    "status": "success",
    "message": "login successfully",
    "data": {
        "id": "number",
        "fullname": "string",
        "userRole": "string"
    },
    "token": "string"
}
```

- **status** (string): Status of the response.
- **message** (string): A success message.
- **data** (object):
  - **id** (number): The unique ID of the logged-in user.
  - **fullname** (string): The full name of the user.
  - **userRole** (string): The role assigned to the user.
- **token** (string): JWT token for authentication.

---

## Error Handling Overview

The `ErrorHandler` class distinguishes between trusted errors (operational errors) and critical errors. It provides appropriate responses for trusted errors and handles critical errors by logging them and terminating the process.

## Error Responses

### Trusted Errors

Trusted errors are operational errors that the application expects and handles gracefully. They are typically instances of the `AppError` class. For these errors, the API responds with the specific HTTP status code and error message provided by the `AppError` instance.

#### Response Format

**HTTP Status Code:** `Defined by AppError`  
**Content-Type:** `application/json`

##### Example Response

```json
{
    "status": "error",
    "message": "Error message here"
}
```

- **status** (string): Indicates that there was an error.
- **message** (string): A descriptive error message for the client.

##### Example Trusted Error Responses

- **User Already Exists (Sign-Up)**

    - **Status:** 401 Unauthorized
    - **Body:**
    
    ```json
    {
        "status": "error",
        "message": "User already exists"
    }
    ```

- **User Does Not Exist (Login)**

    - **Status:** 401 Unauthorized
    - **Body:**

    ```json
    {
        "status": "error",
        "message": "User does not exist, Please sign up"
    }
    ```

- **Incorrect Password (Login)**

    - **Status:** 401 Unauthorized
    - **Body:**

    ```json
    {
        "status": "error",
        "message": "Password is incorrect, Please try again"
    }
    ```

### Critical Errors

Critical errors are unexpected errors that indicate a serious problem in the application. These errors are not handled through the API responses but are logged, and the process is terminated to avoid further issues.

#### Response Format

**HTTP Status Code:** `500 Internal Server Error`  
**Content-Type:** `application/json`

##### Example Response

```json
{
    "status": false,
    "message": "Internal server error"
}
```

- **status** (boolean): Indicates that there was a critical error.
- **message** (string): A generic error message for the client.




## This README provides a detailed overview of the `signup` and `login` endpoints, including request and response formats, example requests and headers, and also error handling mechanisms for the `signup` and `login` endpoints, describing trusted and critical errors, showing the response formats.