{
  "name": "Review",
  "type": "object",
  "properties": {
    "client_name": {
      "type": "string"
    },
    "rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5
    },
    "comment": {
      "type": "string"
    },
    "is_visible": {
      "type": "boolean",
      "default": true
    }
  },
  "required": [
    "client_name",
    "rating",
    "comment"
  ]
}
