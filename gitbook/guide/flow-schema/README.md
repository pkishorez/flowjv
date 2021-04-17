# Flow Schema

Everything in FlowJV happens using a Flow Schema whether it's for creating UI or validating data. It's just a fancy term for the schema in `flowjv`.

Flow Schema describes the data requirements along with validations and UI configurations.

Flow Schema is similar to JSON Schema, that it expects the specification of how the data should look like. And this specification is completely refined for the specific use cases in the world of the web.

Flow Schema only expects a value of type "`object` at the root level. `properties` field contains the data requirements that this object expects. 

Each entry in the object `properties` can be one of data requirement or flow logic that steers the flow based on a logic.

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

```javascript
{
    "key1": "value1",
    "key2": "value2",
    "key3": "value3",
}
```

The properties defined in Flow Schema map one-to-one with the key-value pairs of the object requirements.

Each entry in an object `properties` can be categorized into two types.

1. Property that collects data
2. Property that steers the flow.

### Data property

Data property collects data.

Each property defines the `key` name of the property, type of value expected, and any validations that the property needs to adhere.

Fields for this type of property are:

* `key`: Name of the key, this property should have
* `type`: Type of value that this property should expect.
* `validations`: \(optional\)List of validations that this property should adhere to.

#### key

The `key` is just a valid string. Nothing fancy here.

#### type

Type of value that the property expects. It could be one of

number \| string \| enum \| boolean \| array \| custom

If you want to define a custom type that's not provided in Flow Schema, that type should be made custom. In which case you should handle its validations and type.

#### validations

Validations describe the list of rules, the property should be validated against. It takes an array of validations.

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

`logic` field expects a [JSON Expression](json-expression.md) that returns either true or false describing if the validation is success or failure respectively.

In the case of functional notation of JSON expression, the function takes an object as a parameter that contains `data`, `ref` and `context` as values in it.

`data` refers to the object that is validated against the schema. `ref` is the property value under validation. [context]() is the object sent at the time of validation.

### Flow Logic constructs

If there's a logic based on which we would like to collect or ignore a part of data, flow logic is there to help us. Here the property is defined to be of type `if` or `switch`

#### if

If the property is of type `if` it expects values for `cond`, `true` and `false`\(optional\)

`cond` is a [JSON Expression](json-expression.md).

If `cond` evaluates to `true`, properties defined in `true` will be collected. Otherwise, properties in `false` will be collected.

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

`switch` works similar to if. It expects `cond` and `cases`

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

Every property in flowSchema can have validations defined. An array of validations, each describing the logic and error message to show if the validation fails.

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



