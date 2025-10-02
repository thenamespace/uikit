import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{I as r}from"./Input-Bq4XNRC6.js";import"./index-yBjzXJbu.js";import"./index-BUSIDwT2.js";const j={title:"Atoms/Input",component:r,parameters:{layout:"centered",docs:{description:{component:"Input component with support for prefixes, suffixes, and various states."}}},args:{placeholder:"Enter text..."},tags:["autodocs"]},t={render:()=>e.jsxs("div",{style:{maxWidth:"600px",margin:"0 auto",padding:"24px"},children:[e.jsx("h2",{children:"Component Documentation"}),e.jsx("h3",{children:"Key Props"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"prefix"})," - Content before input (string)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"suffix"})," - Content after input (string)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"size"})," - Input size: 'sm', 'md', 'lg' (default: 'md')"]}),e.jsxs("li",{children:[e.jsx("code",{children:"error"})," - Error state (boolean)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"disabled"})," - Disabled state (boolean)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"placeholder"})," - Placeholder text (string)"]})]}),e.jsx("h3",{children:"Usage Examples"}),e.jsx("pre",{style:{backgroundColor:"#f5f5f5",padding:"16px",borderRadius:"8px",overflow:"auto"},children:`// Basic input
<Input placeholder="Enter text..." />

// With prefix
<Input prefix="🔍" placeholder="Search..." />

// With prefix and suffix
<Input prefix="$" suffix="USD" placeholder="0.00" />`})]}),parameters:{docs:{description:{story:"Documentation for the Input component."}}}},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",width:"300px"},children:[e.jsx(r,{prefix:"🔍",placeholder:"Search..."}),e.jsx(r,{prefix:"$",placeholder:"Enter amount"})]}),parameters:{docs:{description:{story:"Inputs with prefix content."}}}},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",width:"300px"},children:[e.jsx(r,{placeholder:"Normal input"}),e.jsx(r,{error:!0,placeholder:"Error state"}),e.jsx(r,{disabled:!0,placeholder:"Disabled input"})]}),parameters:{docs:{description:{story:"Different input states: normal, error, and disabled."}}}};var s,i,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "24px"
  }}>
      <h2>Component Documentation</h2>

      <h3>Key Props</h3>
      <ul>
        <li>
          <code>prefix</code> - Content before input (string)
        </li>
        <li>
          <code>suffix</code> - Content after input (string)
        </li>
        <li>
          <code>size</code> - Input size: 'sm', 'md', 'lg' (default: 'md')
        </li>
        <li>
          <code>error</code> - Error state (boolean)
        </li>
        <li>
          <code>disabled</code> - Disabled state (boolean)
        </li>
        <li>
          <code>placeholder</code> - Placeholder text (string)
        </li>
      </ul>

      <h3>Usage Examples</h3>
      <pre style={{
      backgroundColor: "#f5f5f5",
      padding: "16px",
      borderRadius: "8px",
      overflow: "auto"
    }}>
        {\`// Basic input
<Input placeholder="Enter text..." />

// With prefix
<Input prefix="🔍" placeholder="Search..." />

// With prefix and suffix
<Input prefix="$" suffix="USD" placeholder="0.00" />\`}
      </pre>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Documentation for the Input component."
      }
    }
  }
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var a,p,l;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "300px"
  }}>
      <Input prefix="🔍" placeholder="Search..." />
      <Input prefix="$" placeholder="Enter amount" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Inputs with prefix content."
      }
    }
  }
}`,...(l=(p=n.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var c,x,u;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "300px"
  }}>
      <Input placeholder="Normal input" />
      <Input error placeholder="Error state" />
      <Input disabled placeholder="Disabled input" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Different input states: normal, error, and disabled."
      }
    }
  }
}`,...(u=(x=o.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};const y=["ComponentDocs","WithPrefix","States"];export{t as ComponentDocs,o as States,n as WithPrefix,y as __namedExportsOrder,j as default};
