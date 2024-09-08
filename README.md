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
      "id": 1,
      "text": "hi , i'm going up",
      "videoUrls": [
        {
          "id": 1,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723396334/signs/videos/elzxdqcxkjyn8nq0bzhu.mp4",
          "rating": "60%"
        }
      ]
    },
    {
      "id": 2,
      "text": "hello",
      "videoUrls": [
        {
          "id": 2,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723399367/signs/videos/i7nwoyc6puti8i0qh8ni.mp4",
          "rating": "60%"
        },
        {
          "id": 3,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723400415/signs/videos/i3ogcxl7pkxzibh9howx.mp4",
          "rating": 0
        },
        {
          "id": 1,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723396334/signs/videos/elzxdqcxkjyn8nq0bzhu.mp4",
          "rating": 0
        }
      ]
    },
    {
      "id": 3,
      "text": " trying  agagin",
      "videoUrls": [
        {
          "id": 1,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723396334/signs/videos/elzxdqcxkjyn8nq0bzhu.mp4",
          "rating": 0
        }
      ]
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
      "videoId":"1",
      "text":" trying  agagin"
    }
  ```
- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "status": true,
      "message": "text created successfully",
      "data": {
        "id": 3,
        "videoId": 1,
        "text": " trying  agagin",
        "updatedAt": "2024-08-11T18:00:15.624Z",
        "createdAt": "2024-08-11T18:00:15.624Z",
        "userId": null
      }
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
      "status": true,
      "message": "texts fetched successfully",
      "data": [
        {
          "id": 1,
          "text": "hi , i'm going up",
          "videoUrls": [
            {
              "id": 1,
              "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723396334/signs/videos/elzxdqcxkjyn8nq0bzhu.mp4",
              "rating": "60%"
            }
          ]
        },
        {
          "id": 2,
          "text": "hello",
          "videoUrls": [
            {
              "id": 2,
              "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723399367/signs/videos/i7nwoyc6puti8i0qh8ni.mp4",
              "rating": "60%"
            },
            {
              "id": 3,
              "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723400415/signs/videos/i3ogcxl7pkxzibh9howx.mp4",
              "rating": "0%"
            },
            {
              "id": 4,
              "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723403669/signs/videos/sollidqddlhqjd02a5lu.mp4",
              "rating": "0%"
            },
            {
              "id": 1,
              "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723396334/signs/videos/elzxdqcxkjyn8nq0bzhu.mp4",
              "rating": "0%"
            }
          ]
        },
        {
          "id": 3,
          "text": " trying  agagin",
          "videoUrls": [
            {
              "id": 1,
              "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723396334/signs/videos/elzxdqcxkjyn8nq0bzhu.mp4",
              "rating": "0%"
            }
          ]
        }
      ]
    }
    ```


---
#### **. Video Controller**

- **Endpoint:**  
  `GET /text`

- **Description:**  
  Get all the texts you created personally.

- **Response:**
  - **Success (200 OK):**
    ```json
  {
    "status": true,
    "message": "texts retrieved successfully",
    "data": []
  }
    ```

---

#### **10. Video Controller**

- **Endpoint:**  
  `GET /video/:id`

- **Description:**  
  Get video by id.

- **Response:**
  - **Success (200 OK):**
    ```json
  {
    "status": true,
    "message": "text retrieved successfully",
    "data": [
      {
        "id": 1,
        "text": "hi , i'm going up",
        "videoUrls": [
          {
            "id": 1,
            "videoUrl": null,
            "rating": "0%"
          },
          {
            "id": 2,
            "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1724318048/signs/videos/a6u5cwf5hlmyccmyhuvt.mp4",
            "rating": "0%"
          },
          {
            "id": 3,
            "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1724318808/signs/videos/j45kenurczoffpkif7n6.mp4",
            "rating": "0%"
          },
          {
            "id": 11,
            "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1724765295/signs/videos/tr0l35jgeios9yy2v7qp.mp4",
            "rating": "0%"
          }
        ]
      }
    ]
  }
    ```

---

#### **7. Video Controller**

- **Endpoint:**  
  `POST /video`

- **Description:**  
  Creates a new video entry in the system.

  ```json
  ##### Body
  ##### Form data

  ```json
  | field name | value |
  |----------|----------|
  | text    | HEllo testing | 
  | video    | 'WIN_20240730_04_17_11_Pro.mp4'  |

  ```

- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "status": true,
      "message": "video created successfully",
      "data": {
        "id": 5,
        "textId": 2,
        "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723405161/signs/videos/zgheo1nodhgviejuhee4.mp4",
        "updatedAt": "2024-08-11T19:39:26.501Z",
        "createdAt": "2024-08-11T19:39:26.501Z",
        "userId": null
      }
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
      "status": true,
      "message": "videos fetched successfully",
      "data": [
        {
          "id": 1,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723396334/signs/videos/elzxdqcxkjyn8nq0bzhu.mp4",
          "texts": [
            {
              "id": 3,
              "text": " trying  agagin",
              "rating": "0%"
            },
            {
              "id": 2,
              "text": "hello",
              "rating": "0%"
            },
            {
              "id": 1,
              "text": "hi , i'm going up",
              "rating": "60%"
            }
          ]
        },
        {
          "id": 2,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723399367/signs/videos/i7nwoyc6puti8i0qh8ni.mp4",
          "texts": [
            {
              "id": 2,
              "text": "hello",
              "rating": "60%"
            }
          ]
        },
        {
          "id": 3,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723400415/signs/videos/i3ogcxl7pkxzibh9howx.mp4",
          "texts": [
            {
              "id": 2,
              "text": "hello",
              "rating": "0%"
            }
          ]
        },
        {
          "id": 4,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723403669/signs/videos/sollidqddlhqjd02a5lu.mp4",
          "texts": [
            {
              "id": 2,
              "text": "hello",
              "rating": "0%"
            }
          ]
        },
        {
          "id": 5,
          "videoUrl": "https://res.cloudinary.com/dhq33r9pa/video/upload/v1723405161/signs/videos/zgheo1nodhgviejuhee4.mp4",
          "texts": [
            {
              "id": 2,
              "text": "hello",
              "rating": "0%"
            }
          ]
        }
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
#### **9. Video Controller**

- **Endpoint:**  
  `GET /video`

- **Description:**  
  Get all the videos you created personally.

- **Response:**
  - **Success (200 OK):**
    ```json
  {
    "status": true,
    "message": "videos retrieved successfully",
    "data": []
  }
    ```

---

#### **10. Video Controller**

- **Endpoint:**  
  `GET /video/:id`

- **Description:**  
  Get video by id.

- **Response:**
  - **Success (200 OK):**
    ```json
  {
    "status": true,
    "message": "videos retrieved successfully",
    "data": [
      {
        "id": 1,
        "videoUrl": null,
        "texts": [
          {
            "id": 1,
            "text": "hi , i'm going up",
            "rating": "0%"
          },
          {
            "id": 12,
            "text": "testing text from front end",
            "rating": "0%"
          }
        ]
      }
    ]
  }
    ```

---

**A. Rate text and video**

- **Endpoint:**  
  `POST /rate`

- **Description:**  
    Rate a video and text

- **Request Payload Format:**
  ```json
    {
      "textId":"1",
      "videoId":"1",
      "ratingNo":3 //ratings are 1-5
    }
  ```
- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "status": true,
      "message": "rating created successfully",
      "data": {
        "id": 2,
        "userId": null,
        "textId": 1,
        "videoId": 1,
        "ratingNo": 3,
        "updatedAt": "2024-08-11T18:45:23.484Z",
        "createdAt": "2024-08-11T18:45:23.484Z"
      }
    }
    ```

---
**B. Get dashboard**

- **Endpoint:**  
  `GET /dashboard`

- **Description:**  
    Get your dashboard info
- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "status": true,
      "message": "profile retrieved successfully",
      "data": {
        "data": {
          "fullname": "josiah ade",
          "userRole": "USER"
        }
      }
    }
    ```

---