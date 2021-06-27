# Get band details

Used for getting band details.

**URL** : `/bands/`

**Method** : `GET`

```json
{
  "Authorization": "token"
}
```

**Input**

```json
{
  "name": "band name"
}
```

**or**

```json
{
  "id": "band id"
}
```

**Example**

```json
{
  "name": "Coldplay"
}
```

---

## Success Response

**Status Code** : `200 OK`

**Output**

```json
{
  "band": {
    "id": "id",
    "name": "Coldplay",
    "musicGenre": "Alternative Rock",
    "responsible": "Chris Martin"
  }
}
```

---

## Error Response

**Condition** : If band wasn't found.

**Status Code** : `404 NOT FOUND`

**Output**:

```json
{
  "error": "Band not found"
}
```
