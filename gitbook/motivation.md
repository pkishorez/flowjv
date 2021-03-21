# Foot Notes

Just like a river flows, as a boat sail, everything goes with the flow. If one goes against it, it only makes things hard.

Life is just like that. One who knows it lives and one who does not suffers!

The idea of _flow_ is very simple yet very powerful and elegant!

FlowJV is inspired by the very same metaphor.

Defining a schema as a flow gives us a lot of advantages.

1. It allows us to validate data from top to bottom. Hence, it's deterministic and logical to know if data is valid or not at the earliest!
2. It opens up possibilities to create UI bindings.

FlowJV is heavily inspired by

* JSON Schema
* JSON Logic

### JSON Schema

JSON Schema is great at validating data. It's a de-facto standard in the world of JSON.

One problem with it is \(or by the design of JSON Schema itself\), JSON Schema is a snapshot of what the data should adhere to. When it comes to binding UI for validation, it poses a problem. There is a library developed for that of course! \([https://github.com/rjsf-team/react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)\). But it's very limited and did not go well with my requirements at least.

### JSON Logic

JSON logic is a JSON representation of the JavaScript expression. [http://jsonlogic.com/](http://jsonlogic.com/)

It allows you to have a serializable representation of logic within JSON which helps in serializing schema within a database or a file!

For specific requirements of FlowJV, JSON Logic is redefined as **`JSON Expression`**.

{% hint style="info" %}
Edit: It turns out Mapbox already has the same concept as JSON Expression. [https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/)

This yet again reinforces that no idea in this world is original! There's always something that's already done 😄
{% endhint %}

