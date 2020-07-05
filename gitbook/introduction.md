# Introduction

### Introduction

FlowJV is a library that uses a flow-based approach to JSON validation. Unlike other JSON Schemas, FlowJV takes a radical approach in defining the data requirements as a series of steps taken from top to bottom. It provides a unified schema for both UI and validation.

FlowJV provides a suite of packages for you to validate the data and to create a UI for collecting the data.

1. `flowjv` is the core validation engine. Given a valid flowSchema \(schema in `flowjv` is called `flowSchema`\), `flowjv` provides utilities for traversing the schema.
2. `flowjv-react` is the official UI binding provided alongside `flowjv`. It exports a React Component \(FlowJVForm\) that creates a form out of the schema defined. It takes care of UI, UX, and validations.









