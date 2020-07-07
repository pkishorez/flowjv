# Introduction

### Introduction

FlowJV is a library that uses a flow-based approach to JSON validation. Unlike other JSON Schemas, FlowJV takes a radical approach in defining the data requirements as a series of steps taken from top to bottom. It provides a unified schema for both UI and validation.

FlowJV provides a suite of packages for you to validate the data and to create a UI for collecting it.

The packages include:

1. `flowjv` the core validation engine. Given a valid flowSchema \(schema in `flowjv` is called `flowSchema`\), `flowjv` provides a function for validating data against it. `flowjv` also provides utilities for traversing the schema.
2. `flowjv-react` the official UI binding provided alongside `flowjv`. It makes use of utilities provided in `flowjv` for a React Component \(`FlowJVForm`\) that creates a form out of the schema defined. It takes care of UI, UX, and validations.









