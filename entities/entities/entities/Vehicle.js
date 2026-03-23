{
  "name": "Vehicle",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Vehicle name/model"
    },
    "brand": {
      "type": "string",
      "description": "Vehicle brand"
    },
    "year": {
      "type": "number",
      "description": "Year of manufacture"
    },
    "price": {
      "type": "number",
      "description": "Price in MAD"
    },
    "daily_rate": {
      "type": "number",
      "description": "Daily rental rate in MAD"
    },
    "category": {
      "type": "string",
      "enum": [
        "sale",
        "rental"
      ],
      "description": "Sale or rental"
    },
    "fuel_type": {
      "type": "string",
      "enum": [
        "diesel",
        "gasoline",
        "hybrid",
        "electric"
      ],
      "description": "Fuel type"
    },
    "transmission": {
      "type": "string",
      "enum": [
        "manual",
        "automatic"
      ],
      "description": "Transmission type"
    },
    "mileage": {
      "type": "number",
      "description": "Mileage in km"
    },
    "image_url": {
      "type": "string",
      "description": "Main image URL"
    },
    "additional_images": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Additional image URLs"
    },
    "video_url": {
      "type": "string",
      "description": "Primary video URL"
    },
    "additional_videos": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Additional video URLs"
    },
    "description": {
      "type": "string",
      "description": "Vehicle description"
    },
    "features": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Vehicle features list"
    },
    "is_featured": {
      "type": "boolean",
      "default": false,
      "description": "Show in hero section"
    },
    "status": {
      "type": "string",
      "enum": [
        "available",
        "sold",
        "rented",
        "maintenance"
      ],
      "default": "available"
    }
  },
  "required": [
    "name",
    "brand",
    "category"
  ]
}
