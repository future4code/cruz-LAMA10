# Login

Used for authenticating users.

**URL** : `/users/login/`

**Method** : `POST`

**Input**

```json
{
  "email": "a valid email",
  "password": "a valid password"
}
```

**Example**

```json
{
  "email": "zulin@mail.com",
  "password": "123Cake!"
}
```

---

## Success Response

**Status Code** : `200 OK`

**Output**

```json
{
  "token": "token"
}
```

---

## Error Response

**Condition** : If email of password is incorrect.

**Status Code** : `400 BAD REQUEST`

**Output** :

```json
{
  "error": "Invalid credentials"
}
```
