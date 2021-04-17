# Form

The Form is a basic building block in the web for collecting data from a user. 

For this very reason, `flowjv-react-material` provides specifically a Form component\(`FlowJVForm`\) to help you automatically create a form from a Flow Schema.

To use it, you need to import `FlowJVForm` from the package.

```javascript
import { FLOWJVForm } from 'flowjv-react-material';

export ()=>{
    return <FlowJVForm
        schema={flowSchema}
        initialData={initialData}
        onSubmit={({isValid, data})=>{/*logic*/}}
    />
}
```

## Customization:

Coming soon...

