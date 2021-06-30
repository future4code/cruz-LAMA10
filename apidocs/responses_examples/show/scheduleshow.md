# Schedule show

Used for scheduling a new show.

**URL** : `/shows/schedule/`

**Method** : `POST`

```json
{
  "Authorization": "token"
}
```

**Input**

```json
{
  "bandId": "band id",
  "date": "show date as dd/mm/yyyy",
  "endTime": "the hour that show ends",
  "startTime": "the hour that show starts",
  "weekDay": "week day of the show"
}
```

**Example**

```json
{
  "bandId": "band id",
  "date": "30/06/2021",
  "endTime": 10,
  "startTime": 9,
  "weekDay": "DOMINGO"
}
```

---

## Success Response

**Status Code** : `200 OK`

**Output**

```json
{
  "message": "Show scheduled successfully!"
}
```

---

## Error Response

**Condition** : If week day is not SEXTA, SABADO or DOMINGO.

**Status Code** : `400 BAD REQUEST`

**Output** :

```json
{
  "error": "Week day invalid"
}
```

---

**Condition** : If show starts before 8:00 or after 22:00 and ends before 9 or after 23.

**Status Code** : `400 BAD REQUEST`

**Output** :

```json
{
  "error": "Range time invalid"
}
```

---
