# Motivation

Just as a river flows, as a boat sail, life goes with the flow. Trying to go against it, only makes things miserable.

This simple idea of _flow_ is simple yet a very powerful one. FlowJV is inspired by this metaphor.

Defining schema as a flow gives a lot of advantages.

1. It allows us to validate data from top to bottom. Hence, it's deterministic and logical to know if data is valid or not at the earliest!
2. It opens up possibilities to create UI bindings. `flowjv-react` provides one such binding for creating a form out of schema.

It's heavily inspired from

* JSON Schema
* JSON Logic

### JSON Schema

JSON Schema is great at validating data. It's a de-facto standard in the world of JSON.

One problem that it poses is \(or by the design of JSON Schema itself\), schema is a snapshot of what the data should adhere to. But when it comes to binding UI for validation, it poses a problem. There is a library developed for that of course! \([https://github.com/rjsf-team/react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)\). But it's very limited and did not go well with my requirements at least.

### JSON Logic

JSON logic is a JSON representation of the JavaScript expression. [http://jsonlogic.com/](http://jsonlogic.com/)

It allows us to have a serialisable representation of logic within JSON which helps us in preserving schema within a database or a file!

For our requirements, we've redefined JSON Logic and named it JSON Expression rather.

