# Bird View

In a Web Application typically data moves from UI to Server.

The flow comprises of:

1. Data collection \(UI\) and validations \(UX\) at the client
2. Data validation \(Security reasons\) for the data collected at the server-side.

![Typical data flow from client to server.](../.gitbook/assets/screenshot-2020-07-05-at-10.51.47-pm.png)

Screwing up UI leads to a bad user experience, and screwing up validation at the server-side, leads to security threats!

We have tons of libraries solving one or the other. FlowJV aims at unifying them both into a single one!

flowjv is aimed at providing a seamless DX \(developer experience\) in creating an end-to-end solution from collecting data at the frontend to validating the same on the backend!

## FlowJV

![How flowjv and flow-react fits from Client-Server perspective](../.gitbook/assets/image%20%281%29.png)

flowJV is a library that uses a flow-based approach to JSON validation.

Unlike other JSON Schemas, flowJV takes a radical approach in defining the data requirements as a series of steps taken from top to bottom. It provides a **unified schema for both UI and validations**.

FlowJV provides a suite of packages for you to validate the data and to create a UI for collecting it.

The packages include:

1. `flowjv` the core validation engine. Given a valid flowSchema \(schema in `flowjv` is called `flowSchema`\), `flowjv` provides a function for validating data. `flowjv` also provides utilities for compiling schema to get useful insights out of the schema \(which is used in `flowjv-react`\).
2. `flowjv-react` gives us tools to leverage the flow schema to create a form automatically from given data requirements. It takes care of UI, UX, and validations.
3. `flowjv-react-material` is the material-ui binding of `flowjv-react` . It facilitates us to use fllowjv without worrying about any configuration. But if you want a different UI, you can always create one through flowjv-react.

