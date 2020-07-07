# Bird View

In a Web Application when data moves from UI to Server for data collection, UI for collection and validation at the server-side is of paramount importance.

![Bird View of a Web Application](../.gitbook/assets/screenshot-2020-07-05-at-10.51.47-pm.png)

Screwing up UI leads to a bad user experience, and screwing up validation at server-side, leads to security threats!

We have tons of libraries solving one or the other. FlowJV aims at unifying them both into a single one!

Doing them both the hard way\(which is the case mostly these days\) screws up developer experience!

### FlowJV

![How flowjv and flow-react fits from UI-Server perspective](../.gitbook/assets/image%20%281%29.png)

FlowJV is a library that uses a flow-based approach to JSON validation. Unlike other JSON Schemas, FlowJV takes a radical approach in defining the data requirements as a series of steps taken from top to bottom. It provides a **unified schema for both UI and validation**.

FlowJV provides a suite of packages for you to validate the data and to create a UI for collecting it.

The packages include:

1. `flowjv` the core validation engine. Given a valid flowSchema \(schema in `flowjv` is called `flowSchema`\), `flowjv` provides a function for validating data against it. `flowjv` also provides utilities for traversing the schema.
2. `flowjv-react` the official UI binding provided alongside `flowjv`. It makes use of utilities provided in `flowjv` for the React Component \(exported as`FlowJVForm`\). The component helps in creating a form out of the schema defined. It takes care of UI, UX, and validations.

