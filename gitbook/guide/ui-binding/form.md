# Form

The Form is a basic building block in the web for collecting data from a user. 

For the very reason, `flowjv-react` provides a specifically a Form component\(`FlowJVForm`\) to help you automatically create form from a Flow Schema.

To use it, you need to import `FlowJVForm` from the package and also should include relevant CSS as below.

```javascript
import { FLOWJVForm } from 'flowjv-react';
import "flowjv-react/dist/main.css";

export ()=>{
    const [value, setValue] = useState({isValid: false, data: {}}};
    return <FlowJVForm schema={flowSchema} value={value} onChange={setValue}/>
}
```

As seen, the component exported: `FlowJVForm` is a controlled component. And that's it! You have a form ready!

## Customization:

Coming soon...

