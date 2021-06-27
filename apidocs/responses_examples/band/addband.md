# Add Band

Used for adding a new band.

**URL** : `/bands/register/`

**Method** : `POST`

```json
{
  "Authorization": "token"
}
```

**Input**

```json
{
  "name": "band name",
  "musicGenre": "music genre",
  "responsible": "responsible"
}
```

**Example**

```json
{
  "name": "Coldplay",
  "musicGenre": "Alternative Rock",
  "responsible": "Chris Martin"
}
```

---

## Success Response

**Code** : `201 CREATED`

**Retorno**

```json
{
  "message": "Band successfully registered"
}
```

---

## Error Response

**Condition** : If band name, music genre or responsible is missing.

**Status Code** : `400 BAD REQUEST`

**Output** :

```json
{
  "error": "Missing input"
}
```
