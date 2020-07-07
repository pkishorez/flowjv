---
description: FlowJV in 5 minutes.
---

# Getting Started

## FlowJV in 5 minutes:

Let's suppose, you would like to create a registration form. The data requirements are as follows:

* `name` Name
  * Should be a valid string.
* `age` Age
  * Should be a valid number.
  * Should be between 1 and 100
* `gender` Gender
  * Should be a string, ASAaaaone of `male` \| `female` \| `others`
* `email` Email
  * Should be a valid email id
* `password` Password
  * Should be a string and minimum 5 character length
* `confirmPassword` Confirm Password
  * Should match the password entered
* `isEmployed` Is the user Employed?
  * Should be a boolean
* `yearsOfExp` Years of Experience
  * Should be a valid number. 
  * This field should be displayed only if `isEmployed` is `true`.

Let's set how using `flowjv` we can approach this problem!

### Step 1 - Install the package

```bash
npm install flowjv-react
```

### Step 2 - Create Flow Schema

Just like the JSON schema, `flowjv` works in a similar way. You create a schema, give some data, and `flowJV` validates the data against it and gives you a bunch of errors if invalid.

Next step after installing the package is to create the `flowSchema`.

{% hint style="info" %}
If you are a typescript user, you can use `IFlowSchema` type from `flowjv` for static type checking the schema.
{% endhint %}

{% tabs %}
{% tab title="JavaScript" %}
```javascript
const schema = {
    type: "object",
    properties: []
}
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import {IFlowSchema} from 'flowjv';

const schema: IFlowSchema = {
    type: "object",
    properties: []
};
```
{% endtab %}
{% endtabs %}

### Step 3 - Add properties to the schema

The schema defined in the previous step is for an empty object. Each property in the schema comprises of mandatory props, `key` and `type`. type corresponds to type of value expected.

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
			key: "confirmPassword"
		},
		{ type: "boolean", key: "isEmployed" },
		{ type: "number", key: "yearsOfExp" },
	],
};
```
{% endtab %}

{% tab title="Typescript" %}
```typescript
import { IFlowSchema } from 'flowjv-react';

const schema: IFlowSchema = {
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
			key: "confirmPassword"
		},
		{ type: "boolean", key: "isEmployed" },
		{ type: "number", key: "yearsOfExp" },
	],
};
```
{% endtab %}
{% endtabs %}

### Step 4 - Add Validations

Validations can be added per property basis by adding a `validations`. `validations` itself is an array, containing the logic for validation `logic` and corresponding error message for that validation `err`

Validation logic can be written directly as a function. But, `flowjv` provides a serializable javascript expression format called `JSONExpression`. Using that makes code very readable, schema serializable and can be future-proofed with the tools that come along with `flowjv`.

\(`flowjv-builder` is a web UI for creating schema from within the web. Still in early stage\)

{% hint style="info" %}
The code below uses, basic function notation for logic. The real power of `flowjv` lies in defining logic with JSONExpression.

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
			validations: [{
				logic: ({ref})=>1<=ref && ref<=100,
				err: "Age should be between 1 and 100",
			}],
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
			validations: [{
				logic: ({ref})=>(/emailregex/).test(ref),
				err: "Should be a valid email id.",
			}],
		},
		{
			type: "string",
			key: "password",
			validations: [{
				logic: ({ref}) => 5 <= ref?.length,
				err: "Password should be minimum of 5 character length",
			}]
		},
		{
			type: "string",
			key: "confirmPassword",
			validations: [
				{
					logic: ({ref}) => 5 <= ref?.length,
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
			validations: [{
				logic: [ "<=",
					[1, ["$ref"], 100],
				],
				err: "Age should be between 1 and 100",
			}],
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
			validations: [{
				logic: [
					"str:fmt:email",
					["$ref"],
				],
				err: "Should be a valid email id.",
			}],
		},
		{
			type: "string",
			key: "password",
			validations: [{
				logic: [
					"<=",
					[
						5,
						["str:len", ["$ref"]],
					],
				],
				err: "Password should be minimum of 5 character length",
			}]
		},
		{
			type: "string",
			key: "confirmPassword",
			validations: [
				{
					logic: [
						"===",
						[
							["$ref"],
							["$data", "password"],
						],
					],
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

### Step 5 - Add Flow Logic

The field yearsOfExp is the interesting part here. It should be collected only if the field `isEmployed` is true. To facilitate this, Flow Schema provides some logic constructs within the schema for the logic to flow accordingly. One such construct is defining a property's `type` as `if` which takes `cond`, and if it evaluates to true, it goes through the flow of `true`, and otherwise `false`.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// Showing only relevant part of the schema for readability.
[
    { type: "boolean", key: "isEmployed" },
    { 
        type: "if",
        cond: ["$data", "isEmployed"],
        true: [
            { type: "number", key: "yearsOfExp" }
        ],
        false: []
    }    
]
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
        cond: ({data})=>data?.isEmployed,
        /*
            // In JSON Expression format.
            cond: ["$data", "isEmployed"],
        */
        // When true, add these properties
        true: [
            { type: "number", key: "yearsOfExp" }
        ],
        // Or if condition returns false, add none in this case.
        false: []
    }    
]
```
{% endtab %}
{% endtabs %}

### Step 6 - Finally, UI

Defining the schema is all that's required. After that, you can directly give this schema to `FlowJVForm`, a react component exported from `flowjv-react` package to create a nice UI.

But

We've only described our data requirements. For the schema to be complete, we need to add a bit of UI parts to this schema. 

1. `label` is all that's missing from the schema. Let's add that.
2. Enum type by default renders to select box. Change `uiType` to radio for showing radio Group rather.
3. string type by default renders to textBox. For password, we need the type to be rendered a password field. Add `uiType` to be password.
4. Add a bit of styling too.

{% tabs %}
{% tab title="JavaScript" %}
```javascript
// Showing only relevant part of the schema for readability.
[
    { type: "string", key: "name", label: "Name" },
    { type: "number", key: "age", label: "Age" },
    { type: "enum", uiType: "radio", key: "gender", items: [...], label: "Gender" },
    { type: "string", uiType: "password", key: "password", label: "Password" }
    // ...
]
```
{% endtab %}
{% endtabs %}

### The Result!

{% embed url="https://codesandbox.io/embed/priceless-frog-700u6?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark&view=preview" %}



