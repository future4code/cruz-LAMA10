# Get shows

Used for getting shows by week day.

**URL** : `/shows/getAll`

**Method** : `GET`

```json
{
  "Authorization": "token"
}
```

**Input**

```json
{
  "weekDay": "week day valid"
}
```

**Example**

```json
{
  "weekDay": "DOMINGO"
}
```

---

## Success Response

**Status Code** : `200 OK`

**Output**

```json
{
  "bands": [
    {
      "name": "Coldplay",
      "music_genre": "Alternative Rock"
    }
  ]
}
```

---

## Error Response

**Condition** : If week day is invalid.

**Status Code** : `400 BAD REQUEST`

**Output**:

```json
{
  "error": "Week day is invalid"
}
```
