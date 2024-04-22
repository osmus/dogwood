## redirect Type

`object` ([redirect](redirect.md))

# redirect Properties

| Property                | Type     | Required | Nullable       | Defined by                                                                                        |
| :---------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------ |
| [permalink](#permalink) | `string` | Optional | cannot be null | [redirect](redirect-properties-permalink.md "dogwood/redirect.schema.json#/properties/permalink") |
| [redirect](#redirect)   | `string` | Required | cannot be null | [redirect](redirect-properties-redirect.md "dogwood/redirect.schema.json#/properties/redirect")   |
| [title](#title)         | `string` | Optional | cannot be null | [redirect](redirect-properties-title.md "dogwood/redirect.schema.json#/properties/title")         |
| [sign](#sign)           | `string` | Optional | cannot be null | [redirect](redirect-properties-sign.md "dogwood/redirect.schema.json#/properties/sign")           |
| [tagline](#tagline)     | `string` | Optional | cannot be null | [redirect](redirect-properties-tagline.md "dogwood/redirect.schema.json#/properties/tagline")     |

## permalink

The relative URL of the referring page.

`permalink`

* is optional

* Type: `string`

* cannot be null

* defined in: [redirect](redirect-properties-permalink.md "dogwood/redirect.schema.json#/properties/permalink")

### permalink Type

`string`

### permalink Examples

```yaml
/schedule

```

## redirect

The relative or absolute URL of the destination page.

`redirect`

* is required

* Type: `string`

* cannot be null

* defined in: [redirect](redirect-properties-redirect.md "dogwood/redirect.schema.json#/properties/redirect")

### redirect Type

`string`

### redirect Examples

```yaml
/program

```

```yaml
https://example.com/program

```

## title

A title for this link for use in internal labeling (usually not needed).

`title`

* is optional

* Type: `string`

* cannot be null

* defined in: [redirect](redirect-properties-title.md "dogwood/redirect.schema.json#/properties/title")

### title Type

`string`

### title Examples

```yaml
Program

```

## sign



`sign`

* is optional

* Type: `string`

* cannot be null

* defined in: [redirect](redirect-properties-sign.md "dogwood/redirect.schema.json#/properties/sign")

### sign Type

`string`

## tagline



`tagline`

* is optional

* Type: `string`

* cannot be null

* defined in: [redirect](redirect-properties-tagline.md "dogwood/redirect.schema.json#/properties/tagline")

### tagline Type

`string`
