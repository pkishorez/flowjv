---
description: FlowJV in 5 minutes.
---

# Getting Started

## FlowJV in 5 minutes:

Let us create a registration form with flowjv. The data requirements are as follows:

* `name` Name
  * Should be a valid string.
* `age` Age
  * Should be a valid number.
  * Should be between 1 and 100
* `gender` Gender
  * Should be a string, One of `male` \| `female` \| `others`
* `email` Email
  * Should be a valid email id
* `password` Password
  * Should be a string and a minimum of 5 character length
* `confirmPassword` Confirm Password
  * Should match the password entered
* `isEmployed` Is the user Employed?
  * Should be a boolean
* `yearsOfExp` Years of Experience
  * Should be a valid number.
  * This field should be displayed only if `isEmployed` is `true`.

### Step 1 - Install the package

```
npm install flowjv-react-material
```

{% hint style="info" %}
flowjv is a monorepo. flowjv-react-material is the binding flowjv provides by default so we can use it right away without worrying about configuration stuff.
{% endhint %}

### Step 2 - Create Flow Schema

FlowSchema is just a representation of the data requirements we've got. The requirements include data format, validations, and conditional logic.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const schema = {
    type: "object",
    properties: [],
};
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { IUIFlowSchema } from "flowjv-react-material";

const schema: IUIFlowSchema = {
    type: "object",
    properties: [],
};
```
{% endtab %}
{% endtabs %}

### Step 3 - Add properties to the schema

The schema defined in the previous step is for an empty object. Each property in the schema comprises mandatory props, `key` and `type`. type corresponds to the type of value expected and key represents the key of the property in the object.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const schema = {
    type: "object",
    properties: [
        { type: "string", key: "name" },
        { type: "number", key: "age" },
        {
            type: "enum",
            key: "gender",
            items: [
                { value: "male" },
                { value: "female" },
                { value: "others" },
            ],
        },
        { type: "string", key: "email" },
        { type: "string", key: "password" },
        {
            type: "string",
            key: "confirmPassword",
        },
        { type: "boolean", key: "isEmployed" },
        { type: "number", key: "yearsOfExp" },
    ],
};
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { IUIFlowSchema } from "flowjv-react-material";

const schema: IUIFlowSchema = {
    type: "object",
    properties: [
        { type: "string", key: "name" },
        { type: "number", key: "age" },
        {
            type: "enum",
            key: "gender",
            items: [
                { value: "male" },
                { value: "female" },
                { value: "others" },
            ],
        },
        { type: "string", key: "email" },
        { type: "string", key: "password" },
        {
            type: "string",
            key: "confirmPassword",
        },
        { type: "boolean", key: "isEmployed" },
        { type: "number", key: "yearsOfExp" },
    ],
};
```
{% endtab %}
{% endtabs %}

### Step 4 - Add Validations

Validations can be added per property basis by adding a `validations` key. `validations` is an array, containing the `logic` for validation and corresponding validation error message to show on error `err`

Validation logic can be written directly as a function. But, `flowjv` provides a serializable javascript expression format called `JSONExpression`. Using that makes schema readable, serializable, and performant.

{% hint style="info" %}
The code below uses basic function notation for validations. But you can use JSONExpression for it.

You can learn more about JSONExpression [here](guide/flow-schema/json-expression.md).
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const schema = {
    type: "object",
    properties: [
        { type: "string", key: "name" },
        {
            type: "number",
            key: "age",
            validations: [
                {
                    logic: ({ ref }) => 1 <= ref && ref <= 100,
                    err: "Age should be between 1 and 100",
                },
            ],
        },
        {
            type: "enum",
            key: "gender",
            items: [
                { value: "male" },
                { value: "female" },
                { value: "others" },
            ],
        },
        {
            type: "string",
            key: "email",
            validations: [
                {
                    logic: ({ ref }) => /emailregex/.test(ref),
                    err: "Should be a valid email id.",
                },
            ],
        },
        {
            type: "string",
            key: "password",
            validations: [
                {
                    logic: ({ ref }) => 5 <= ref?.length,
                    err: "Password should be minimum of 5 character length",
                },
            ],
        },
        {
            type: "string",
            key: "confirmPassword",
            validations: [
                {
                    logic: ({ ref }) => 5 <= ref?.length,
                    err: "Confirm Password should match the password.",
                },
            ],
        },
        { type: "boolean", key: "isEmployed" },
        { type: "number", key: "yearsOfExp" },
    ],
};
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
const schema: IFlowSchema = {
    type: "object",
    properties: [
        { type: "string", key: "name" },
        {
            type: "number",
            key: "age",
            validations: [
                {
                    logic: ["<=", [1, ["$ref"], 100]],
                    err: "Age should be between 1 and 100",
                },
            ],
        },
        {
            type: "enum",
            key: "gender",
            items: [
                { value: "male" },
                { value: "female" },
                { value: "others" },
            ],
        },
        {
            type: "string",
            key: "email",
            validations: [
                {
                    logic: ["str:fmt:email", ["$ref"]],
                    err: "Should be a valid email id.",
                },
            ],
        },
        {
            type: "string",
            key: "password",
            validations: [
                {
                    logic: ["<=", [5, ["str:len", ["$ref"]]]],
                    err: "Password should be minimum of 5 character length",
                },
            ],
        },
        {
            type: "string",
            key: "confirmPassword",
            validations: [
                {
                    logic: ["===", [["$ref"], ["$data", "password"]]],
                    err: "Confirm Password should match the password.",
                },
            ],
        },
        { type: "boolean", key: "isEmployed" },
        { type: "number", key: "yearsOfExp" },
    ],
};
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Here `ref` represents property under validation.Ï
{% endhint %}

### Step 5 - Add Flow Logic

The field `yearsOfExp` is the interesting part here. It should be collected only if the field `isEmployed` is true. To facilitate this, Flow Schema provides some logic constructs which facilitate logic to flow accordingly \(hence the name flowjv\). One such construct is defining a property's `type` as `if` which takes `cond`, and if it evaluates to `true`, it goes through the flow of `true`, and otherwise `false`.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// Showing only relevant part of the schema for readability.
[
    { type: "boolean", key: "isEmployed" },
    {
        type: "if",
        cond: ({ data }) => data.isEmployed,
        /*
            // In JSON Expression format.
            cond: ["$data", "isEmployed"],
        */
        // When true, collect these properties
        true: [{ type: "number", key: "yearsOfExp" }],
        // when false, go through this flow.
        false: [],
    },
];
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
// Showing only relevant part of the schema for readability.
[
    { type: "boolean", key: "isEmployed" },
    {
        type: "if",
        // Condition
        cond: ({ data }) => data?.isEmployed,
        /*
            // In JSON Expression format.
            cond: ["$data", "isEmployed"],
        */
        // When true, collect these properties
        true: [{ type: "number", key: "yearsOfExp" }],
        // Or if condition returns false, add none in this case.
        false: [],
    },
];
```
{% endtab %}
{% endtabs %}

### Step 6 - Finally, UI

Defining the schema is all that's required. After that, you can directly give this schema to `FlowJVForm` , the react component exported from `flowjv-react-material`. And it takes care of rest!

But

We've only described our data requirements. For the schema to be complete, we need to add a bit of UI parts to this schema. \(As schema in flowjv is common for both UI and data requirements\).

1. Enum type by default renders a select box. Add a UI configuration by using `ui` key to change the enum type view to 'radio' group.
2. string type by default renders to input type `text`. For passwords, we need a password field. For that, we can set `ui` configuration to be password.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// Showing only relevant part of the schema for readability.
[
    { type: "string", key: "name", label: "Name" },
    { type: "number", key: "age", label: "Age" },
    { 
        type: "enum",
        ui: { type: "radio" },
        key: "gender",
        items: [...],
        label: "Gender"
    },
    {
        type: "string",
        ui: { type: "password" },
        key: "password",
        label: "Password"
    }
    // ...
]
```
{% endtab %}
{% endtabs %}

### The Result!

{% embed url="https://codesandbox.io/embed/priceless-frog-700u6?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark&view=preview" caption="" %}

You can open the above code sandbox to play with it.

And yayyy! That is all the core of flowjv is about!

Know about the inception behind flowjv next!

