## items Type

`object` ([role](person-properties-roles-role.md))

# items Properties

| Property        | Type     | Required | Nullable       | Defined by                                                                                                                       |
| :-------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| [title](#title) | `string` | Optional | cannot be null | [person](person-properties-roles-role-properties-title.md "dogwood/person.schema.json#/properties/roles/items/properties/title") |
| [at](#at)       | `string` | Required | cannot be null | [person](person-properties-roles-role-properties-at.md "dogwood/person.schema.json#/properties/roles/items/properties/at")       |
| [from](#from)   | `string` | Optional | cannot be null | [person](person-properties-roles-role-properties-from.md "dogwood/person.schema.json#/properties/roles/items/properties/from")   |
| [to](#to)       | `string` | Optional | cannot be null | [person](person-properties-roles-role-properties-to.md "dogwood/person.schema.json#/properties/roles/items/properties/to")       |

## title



`title`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-roles-role-properties-title.md "dogwood/person.schema.json#/properties/roles/items/properties/title")

### title Type

`string`

## at



`at`

* is required

* Type: `string`

* cannot be null

* defined in: [person](person-properties-roles-role-properties-at.md "dogwood/person.schema.json#/properties/roles/items/properties/at")

### at Type

`string`

## from



`from`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-roles-role-properties-from.md "dogwood/person.schema.json#/properties/roles/items/properties/from")

### from Type

`string`

### from Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## to



`to`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-roles-role-properties-to.md "dogwood/person.schema.json#/properties/roles/items/properties/to")

### to Type

`string`

### to Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")
