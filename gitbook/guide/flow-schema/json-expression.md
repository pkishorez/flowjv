---
description: Serializable format for javascript expression!
---

# JSON Expression

Logic defined in Flow Schema can be a normal javascript function as below.

```javascript
{
    logic: ({data, ref})=>validate(data.anything, ref),
    err: "A descriptive validation error message"
}
```

It's very easy, and something we're so familiar with. But the code above is not serializable. This means we can not store the schema somewhere in a database or a file to dynamically retrieve it later.

This also prevents us from using tools that can dynamically generate flow schema.

To get over this `flowjv` also provides a utility called `JSONExpression`. With this, we can write a subset of javascript expressions as a JSON representation.

{% hint style="info" %}
JSON Expression is not a one-to-one mapping with Javascript expression. There are a lot of things that are not possible with JSON expression yet. The ability to extend JSON expression is under work.
{% endhint %}

JSON expression is just a JSON representation of prefix notation of a Javascript expression!

![Basic JS expression to JSON expression](../../.gitbook/assets/basic.gif)

Rules of JSON Expression.

1. JSON Expression is always represented in an array.
2. The Array contains at least 2 elements.
3. 1st element in the array denotes the operation to be performed.
4. The rest of the elements are the operands/parameters to the operation.

Ex: `["+", 1,2,3]`

Here `+` denotes the operation performed on `1,2,3` elements.

Every element after the 1st element itself can be another JSON expression!

To represent JSON expression in typescript form:

`[ IOperand, ...IJSONExpression[]]`

string/number/boolean itself is a valid JSON Expression!

![Composite JS expression to JSON expression](../../.gitbook/assets/composite.gif)

{% hint style="info" %}
JSON Expression is not mandatory for using `flowjv`. But using provides a lot of benefits. Serialization, performance to name a few.
{% endhint %}

You can look into all possible operators `JSONExpression` provides in the [source code](https://github.com/pkishorez/flowjv/blob/master/packages/flowjv/src/jsonexpression/index.ts) for now. We'll move that to documentation later.

