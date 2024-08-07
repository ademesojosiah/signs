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
- **role** (string): The role assigned to the user (e.g., "USER", "ADMIN").

##### Example Request

```sh
curl -X POST https://signs-5n09.onrender.com/auth/signup \
-H "Content-Type: application/json" \
-d '{
  "fullname": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "role": "USER"
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

### 3. Contact us

#### Endpoint

`POST /contact`

#### Description

send a contact us message

#### Request

##### Headers

- **Content-Type**: `application/json`

##### Body

```json
{
    "email": "string",
    "description": "string"
}
```

- **email** (string): The email address of the user.
- **password** (string): The description of your message.

##### Example Request

```sh
curl -X POST https://signs-5n09.onrender.com/auth/login \
-H "Content-Type: application/json" \
-d '{
     "email": "string",
    "description": "string"
}'
```

#### Response

##### Status

200 OK

##### Body

```json
{
  "status": true,
  "message": "email sent successfully"
}
```
---

### 4. create sign

#### Endpoint

`POST /sign`

#### Description

create a sign

#### Request

##### Headers

- **Content-Type**: `application/json`

##### Body
##### Form data

```json
| field name | value |
|----------|----------|
| text    | HEllo testing | 
| video    | 'WIN_20240730_04_17_11_Pro.mp4'  |

```



- **text** (string): The email address of the user.
- **video** (string): The video path.

##### Example Request
![alt text](../../Downloads/signsImage.JPG)

#### Response

##### Status

200 OK

##### Body

```json
{
  "status": true,
  "message": "Sign created successfully",
  "data": {
    "text": "looking",
    "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1722311967/signs/videos/unhvow8fkbtg4fctbexq.mp4"
  }
}
```
---

### 5. Get all signs

#### Endpoint

`GET /sign/all`

#### Description

get all signs

#### Response

##### Status

200 OK

##### Body

```json
{
  "status": true,
  "message": "Sign fetched successfully",
  "data": [
    {
      "text": "looking",
      "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1722310073/qzyegqkir6ahil8sd8oy.mp4"
    },
    {
      "text": "looking",
      "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1722310514/signs/videos/nsia6tkx3auc4ynw9xh6.mov"
    },
    {
      "text": "looking",
      "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1722311967/signs/videos/unhvow8fkbtg4fctbexq.mp4"
    }
  ]
}
```
---


### API Documentation: Text and Video Controllers

#### **6. Text Controller**

**Purpose:**  
The text controller endpoints handle operations related to textual content in the system.

---

**A. Create Text Entry**

- **Endpoint:**  
  `POST /text`

- **Description:**  
  Creates a new text entry in the system.

- **Request Payload Format:**
  ```json
  {
    "title": "Sample Title",
    "content": "This is the content of the text entry.",
    "author": "Author Name",
    "tags": ["tag1", "tag2"]
  }
  ```

  **Payload Fields:**
  - `title`: (string, required) The title of the text entry.
  - `content`: (string, required) The main content of the text entry.
  - `author`: (string, required) The name of the author.
  - `tags`: (array of strings, optional) An array of tags associated with the text entry.

- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "status": "success",
      "message": "text created successfully",
      "data": {
        "id": "unique_text_id",
        "title": "Sample Title",
        "content": "This is the content of the text entry.",
        "author": "Author Name",
        "tags": ["tag1", "tag2"],
        "createdAt": "timestamp"
      }
    }
    ```
  - **Error (4xx/5xx):**
    ```json
    {
      "status": "error",
      "message": "Validation failed",
      "errors": ["Error details..."]
    }
    ```

---

**B. Get All Text Entries**

- **Endpoint:**  
  `GET /text/all`

- **Description:**  
  Retrieves all text entries stored in the system.

- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "status": "success",
      "message": "texts fetched successfully",
      "data": [
        {
          "id": "unique_text_id",
          "title": "Sample Title",
          "content": "This is the content of the text entry.",
          "author": "Author Name",
          "tags": ["tag1", "tag2"],
          "createdAt": "timestamp"
        },
        // Additional text entries...
      ]
    }
    ```
  - **Error (4xx/5xx):**
    ```json
    {
      "status": "error",
      "message": "Failed to fetch texts",
      "errors": ["Error details..."]
    }
    ```

---

#### **7. Video Controller**

**Purpose:**  
The video controller endpoints manage operations related to video content in the system.

---

**A. Create Video Entry**

- **Endpoint:**  
  `POST /video`

- **Description:**  
  Creates a new video entry in the system.

- **Request Payload Format:**
  ```json
  {
    "title": "Sample Video Title",
    "description": "This is the description of the video.",
    "url": "http://path-to-video.com/video.mp4",
    "tags": ["tag1", "tag2"]
  }
  ```

  **Payload Fields:**
  - `title`: (string, required) The title of the video.
  - `description`: (string, required) A brief description of the video.
  - `url`: (string, required) The URL where the video is hosted.
  - `tags`: (array of strings, optional) An array of tags associated with the video.

- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "status": "success",
      "message": "video created successfully",
      "data": {
        "id": "unique_video_id",
        "title": "Sample Video Title",
        "description": "This is the description of the video.",
        "url": "http://path-to-video.com/video.mp4",
        "tags": ["tag1", "tag2"],
        "createdAt": "timestamp"
      }
    }
    ```
  - **Error (4xx/5xx):**
    ```json
    {
      "status": "error",
      "message": "Validation failed",
      "errors": ["Error details..."]
    }
    ```

---

**B. Get All Video Entries**

- **Endpoint:**  
  `GET /video/all`

- **Description:**  
  Retrieves all video entries stored in the system.

- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "status": "success",
      "message": "videos fetched successfully",
      "data": [
        {
          "id": "unique_video_id",
          "title": "Sample Video Title",
          "description": "This is the description of the video.",
          "url": "http://path-to-video.com/video.mp4",
          "tags": ["tag1", "tag2"],
          "createdAt": "timestamp"
        },
        // Additional video entries...
      ]
    }
    ```
  - **Error (4xx/5xx):**
    ```json
    {
      "status": "error",
      "message": "Failed to fetch videos",
      "errors": ["Error details..."]
    }
    ```

---

### **Summary**

- **Text Entry Validation:** Send a `POST` request to `/text` with text data in JSON format.
- **Video Entry Validation:** Send a `POST` request to `/video` with video data in JSON format.


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

