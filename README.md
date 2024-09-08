# Community SaaS API

Welcome to the Community SaaS API! This API is designed to handle user authentication, role management, community management, and member management. Below are the available routes and their descriptions.

## Base URL

The base URL for this API is:

```
https://community-saas.vercel.app/v1
```

## Endpoints

### Home Route

- **Endpoint:** `/v1`
- **Method:** `GET`
- **Description:** This is the default home page for the API. It responds with a message indicating the API is active.

**Example Response:**

```json
{
  "message": "The sedulous hyena ate the antelope!"
}
```

### User Authentication Routes

- **Endpoint:** `/v1/auth`
- **Description:** This handles all user authentication-related routes, including login, registration, and logout. Specific route details are within `userRouter`.

### Role Management Routes

- **Endpoint:** `/v1/role`
- **Description:** This handles all routes related to role management, such as creating, updating, or deleting roles. Specific route details are within `roleRouter`.

### Community Management Routes

- **Endpoint:** `/v1/community`
- **Description:** This handles all routes related to community management, such as creating, updating, or deleting communities. Specific route details are within `communityRouter`.

### Member Management Routes

- **Endpoint:** `/v1/member`
- **Description:** This handles all routes related to member management, such as adding, updating, or removing members from communities. Specific route details are within `memberRouter`.

## Usage

To use this API, append any of the above routes to the base URL. For example:

```
https://community-saas.vercel.app/v1/auth
```

## Deployment Link

You can access the live deployment of the API at:

```
https://community-saas.vercel.app/v1
```
