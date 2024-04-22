## person Type

`object` ([person](person.md))

# person Properties

| Property                       | Type     | Required | Nullable       | Defined by                                                                                        |
| :----------------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------ |
| [title](#title)                | `string` | Required | cannot be null | [person](person-properties-title.md "dogwood/person.schema.json#/properties/title")               |
| [pronouns](#pronouns)          | `string` | Optional | cannot be null | [person](person-properties-pronouns.md "dogwood/person.schema.json#/properties/pronouns")         |
| [updated](#updated)            | `string` | Optional | cannot be null | [person](person-properties-updated.md "dogwood/person.schema.json#/properties/updated")           |
| [roles](#roles)                | `array`  | Optional | cannot be null | [person](person-properties-roles.md "dogwood/person.schema.json#/properties/roles")               |
| [image](#image)                | `string` | Optional | cannot be null | [person](person-properties-image.md "dogwood/person.schema.json#/properties/image")               |
| [image\_remote](#image_remote) | `string` | Optional | cannot be null | [person](person-properties-image_remote.md "dogwood/person.schema.json#/properties/image_remote") |
| [cover](#cover)                | `string` | Optional | cannot be null | [person](person-properties-cover.md "dogwood/person.schema.json#/properties/cover")               |
| [caption](#caption)            | `string` | Optional | cannot be null | [person](person-properties-caption.md "dogwood/person.schema.json#/properties/caption")           |
| [linkedin](#linkedin)          | `string` | Optional | cannot be null | [person](person-properties-linkedin.md "dogwood/person.schema.json#/properties/linkedin")         |
| [twitter](#twitter)            | `string` | Optional | cannot be null | [person](person-properties-twitter.md "dogwood/person.schema.json#/properties/twitter")           |
| [github](#github)              | `string` | Optional | cannot be null | [person](person-properties-github.md "dogwood/person.schema.json#/properties/github")             |
| [osm](#osm)                    | `string` | Optional | cannot be null | [person](person-properties-osm.md "dogwood/person.schema.json#/properties/osm")                   |
| [website](#website)            | `string` | Optional | cannot be null | [person](person-properties-website.md "dogwood/person.schema.json#/properties/website")           |
| [wikipedia](#wikipedia)        | `string` | Optional | cannot be null | [person](person-properties-wikipedia.md "dogwood/person.schema.json#/properties/wikipedia")       |
| [mastodon](#mastodon)          | `string` | Optional | cannot be null | [person](person-properties-mastodon.md "dogwood/person.schema.json#/properties/mastodon")         |
| [medium](#medium)              | `string` | Optional | cannot be null | [person](person-properties-medium.md "dogwood/person.schema.json#/properties/medium")             |

## title

The person's full display name or designation.

`title`

* is required

* Type: `string`

* cannot be null

* defined in: [person](person-properties-title.md "dogwood/person.schema.json#/properties/title")

### title Type

`string`

### title Examples

```yaml
Darla Dogson

```

```yaml
Darla

```

```yaml
darla_dog_1985

```

## pronouns

The person's pronouns.

`pronouns`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-pronouns.md "dogwood/person.schema.json#/properties/pronouns")

### pronouns Type

`string`

### pronouns Examples

```yaml
she/her

```

```yaml
they/them

```

```yaml
he/they

```

## updated



`updated`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-updated.md "dogwood/person.schema.json#/properties/updated")

### updated Type

`string`

### updated Constraints

**date time**: the string must be a date time string, according to [RFC 3339, section 5.6](https://tools.ietf.org/html/rfc3339 "check the specification")

## roles



`roles`

* is optional

* Type: `object[]` ([role](person-properties-roles-role.md))

* cannot be null

* defined in: [person](person-properties-roles.md "dogwood/person.schema.json#/properties/roles")

### roles Type

`object[]` ([role](person-properties-roles-role.md))

## image



`image`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-image.md "dogwood/person.schema.json#/properties/image")

### image Type

`string`

## image\_remote



`image_remote`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-image_remote.md "dogwood/person.schema.json#/properties/image_remote")

### image\_remote Type

`string`

## cover



`cover`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-cover.md "dogwood/person.schema.json#/properties/cover")

### cover Type

`string`

## caption



`caption`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-caption.md "dogwood/person.schema.json#/properties/caption")

### caption Type

`string`

## linkedin



`linkedin`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-linkedin.md "dogwood/person.schema.json#/properties/linkedin")

### linkedin Type

`string`

## twitter



`twitter`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-twitter.md "dogwood/person.schema.json#/properties/twitter")

### twitter Type

`string`

## github



`github`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-github.md "dogwood/person.schema.json#/properties/github")

### github Type

`string`

## osm



`osm`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-osm.md "dogwood/person.schema.json#/properties/osm")

### osm Type

`string`

## website



`website`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-website.md "dogwood/person.schema.json#/properties/website")

### website Type

`string`

## wikipedia



`wikipedia`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-wikipedia.md "dogwood/person.schema.json#/properties/wikipedia")

### wikipedia Type

`string`

## mastodon



`mastodon`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-mastodon.md "dogwood/person.schema.json#/properties/mastodon")

### mastodon Type

`string`

## medium



`medium`

* is optional

* Type: `string`

* cannot be null

* defined in: [person](person-properties-medium.md "dogwood/person.schema.json#/properties/medium")

### medium Type

`string`
