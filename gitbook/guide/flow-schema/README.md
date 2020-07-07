# Flow Schema

Everything in FlowJV starts with a Flow Schema, whether it's for creating UI out of it or validating data against it. It's just a fancy term for the schema in flowjv.

Flow Schema describes the data requirements along with validations.

Flow Schema is the similar to JSON Schema, that it expects the specification of how the data should look like. And this specification is completely refined for the specific use cases in the world of the web.

Flow Schema only expects a value of type "`object`". `properties` field comprises the data requirements that this object expects. 

Each property in Flow Schema can be categorized as property describing flow logic or property defining the data requirement.

{% hint style="info" %}
JSON Schema describes a data snapshot. Rules determining what the data should adhere to. But Flow Schema describes data as a flow. As a series of steps.
{% endhint %}

```javascript
{
    type: "object",
    properties: [
        // property1,
        // property2,
        // property3,
        // ...
    ]
}
```

## Properties

An object in javascript is a set of key-value pairs.

And each key-value pair is called a property. The properties defined in Flow Schema maps one on one with the key-value pairs of the data object under validation.

Each property in Flow Schema can be categorized into two types.

1. Property that gathers data
2. Property that describes flow logic

### Gathering data property

Data gathering is nothing but, a property defined in the schema to expect a key-value pair in the data.

Each property in this category defines the key name, type of value expected, and any validations that need to be performed for that property.

Mandatory fields for this type of property are:

* `key`: Name of the key, this property should have
* `type`: Type of value that this property should expect.
* `validations`: List of validations that this property should adhere to.

#### key

The `key` is just a valid string. Nothing fancy here.

#### type

Type of value that a property can expect could be one of

number \| string \| enum \| boolean \| custom

If you want to define a custom type that's not provided in Flow Schema, that type should be made custom. In which case you should handle its validations and type.

#### validations

`validations` is an optional field, a property expects in Flow Schema. Validations describe the list of rules, the property should be validated against. It takes an array of validations.

Each validation is itself an object that contains `logic` and `err`. `logic` describes the logic of the validation, and `err` defines the message that should be shown in case the validation fails.

```javascript
[
    {
        logic: ({data, ref, context})=>{
            // validation logic here.
            return true | false;
        },
        err: "Error Message" },
    }
]
```

`logic` field expects either a [JSON Expression](json-expression.md) or a functional notation that returns either true or false describing if the validation is success or failure respectively.

In the case of functional notation, the function takes an object as a parameter that contains `data`, `ref` and `context` as values in it.

`data` refers to the object that is validated against the schema. `ref` is the property value under validation. [context](context.md) is the object sent at the time of validation.

### Flow Logic Property

If there's a logic based on which we would like to collect or ignore a part of data, flow logic helps. Here the property is defined to be of type `if` or `switch`

#### if

If the property is of type `if` it expects values for `cond`, `true` and `false`.

`cond` is the expression to be executed that takes either a [JSON Expression](json-expression.md) or a function notation same as described in the previous section.

If cond evaluates to `true`, properties defined in `true` will be executed. Otherwise, properties in `false` will be executed.

```javascript
{
    type: "if",
    cond: ["$data", "is_employed"], // Something that executes to true|false
    true: [
        // Properties when is_employed is true.
    ],
    false: [
        // Properties when is_employed is false.
    ]
}
```

#### switch

switch works similar to if. Where here, switch expects values for `cond` and `cases`.

`cond` is the same as `cond` in if, where it refers to the condition except, it expects a value rather than just `true` \| `false`.

`cases` expect an object, mapping each case with a list of properties to be executed if case equals the value executed from `cond`.

```javascript
{
    type: "switch",
    cond: ["$data", "gender"], // which may return one of male|female|others
    cases: {
        male: [
            // List of male specific props
        ],
        female: [
            // List of female specific props
        ],
        others: [
            // List of others specific props
        ],
    }
}
```

## Validations

Validations within the property are also defined as flow: A series of validations, each describing the logic and error message if the validation fails.

```javascript
{
    type: "object",
    properties: [
        // ...rest of the properties
        {key: "anykey", type: "typeofvalue", validations: [
            {
                logic: ()=>{
                    // "Validation1 logic"
                    return true|false // based on validation
                }, 
                err: "Error message if validation1 fails"
            },
            {
                logic: ()=>{
                    // "Validation2 logic"
                    return true|false // based on validation
                }, 
                err: "Error message if validation2 fails"
            },
            // ... rest of the 
        ]}
        // ...rest of the properties
    ]
}
```



