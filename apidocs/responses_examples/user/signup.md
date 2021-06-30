# Sign up

Used for creating a new user.

Notice that password must contain at least **6 characters** with at least **one lowercase letter**, **one uppercase letter**, **one number** and **one special character**, that's a strong password, isn't it? :D

**URL** : `/users/signup/`

**Method** : `POST`

**Input**

```json
{
  "email": "a valid email",
  "password": "a valid password",
  "name": "user name"
}
```

**Example**

```json
{
  "name": "zulin",
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

**Condition** : Some field is empty.

**Status Code** : `400 BAD REQUEST`

**Output** :

```json
{
  "error": "All fields must be filled: 'email', 'name', 'password' and 'role'"
}
```

---

**Condition** : Email is invalid.

**Status Code** : `400 BAD REQUEST`

**Output** :

```json
{
  "error": "Invalid email"
}
```

---

**Condition** : Password is invalid.

**Status Code** : `400 BAD REQUEST`

**Output** :

```json
{
  "error": "The password must have at least six characters with at least one lowercase letter, one uppercase letter, one number and one special character"
}
```
