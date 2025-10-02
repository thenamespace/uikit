import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{T as t}from"./Text-DmuCryDF.js";import"./index-yBjzXJbu.js";const T={title:"Atoms/Text",component:t,parameters:{layout:"centered",docs:{description:{component:"Text component with customizable size, weight, and color options."}}},args:{children:"Sample text content"},tags:["autodocs"]},r={render:()=>e.jsxs("div",{style:{maxWidth:"600px",margin:"0 auto",padding:"24px"},children:[e.jsx("h2",{children:"Component Documentation"}),e.jsx("h3",{children:"Key Props"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"size"})," - Text size: 'sm', 'md', 'lg', 'xl' (default: 'md')"]}),e.jsxs("li",{children:[e.jsx("code",{children:"weight"})," - Font weight: 'light', 'regular', 'medium', 'bold' (default: 'regular')"]}),e.jsxs("li",{children:[e.jsx("code",{children:"color"})," - Text color: 'primary', 'grey', 'white' (default: 'primary')"]}),e.jsxs("li",{children:[e.jsx("code",{children:"children"})," - Text content (ReactNode)"]})]}),e.jsx("h3",{children:"Usage Examples"}),e.jsx("pre",{style:{backgroundColor:"#f5f5f5",padding:"16px",borderRadius:"8px",overflow:"auto"},children:`// Basic text
<Text>Hello world</Text>

// With custom styling
<Text size="lg" weight="bold" color="primary">
  Large bold text
</Text>

// Small grey text
<Text size="sm" color="grey">
  Small grey text
</Text>`})]}),parameters:{docs:{description:{story:"Documentation for the Text component."}}}},i={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(t,{size:"sm",children:"Small text"}),e.jsx(t,{size:"md",children:"Medium text"}),e.jsx(t,{size:"lg",children:"Large text"}),e.jsx(t,{size:"xl",children:"Extra large text"})]}),parameters:{docs:{description:{story:"Different text sizes."}}}},o={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:[e.jsx(t,{weight:"light",children:"Light weight text"}),e.jsx(t,{weight:"regular",children:"Regular weight text"}),e.jsx(t,{weight:"medium",children:"Medium weight text"}),e.jsx(t,{weight:"bold",children:"Bold weight text"})]}),parameters:{docs:{description:{story:"Different font weights."}}}};var s,l,n;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "24px"
  }}>
      <h2>Component Documentation</h2>

      <h3>Key Props</h3>
      <ul>
        <li>
          <code>size</code> - Text size: 'sm', 'md', 'lg', 'xl' (default: 'md')
        </li>
        <li>
          <code>weight</code> - Font weight: 'light', 'regular', 'medium',
          'bold' (default: 'regular')
        </li>
        <li>
          <code>color</code> - Text color: 'primary', 'grey', 'white' (default:
          'primary')
        </li>
        <li>
          <code>children</code> - Text content (ReactNode)
        </li>
      </ul>

      <h3>Usage Examples</h3>
      <pre style={{
      backgroundColor: "#f5f5f5",
      padding: "16px",
      borderRadius: "8px",
      overflow: "auto"
    }}>
        {\`// Basic text
<Text>Hello world</Text>

// With custom styling
<Text size="lg" weight="bold" color="primary">
  Large bold text
</Text>

// Small grey text
<Text size="sm" color="grey">
  Small grey text
</Text>\`}
      </pre>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Documentation for the Text component."
      }
    }
  }
}`,...(n=(l=r.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var d,a,x;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  }}>
      <Text size="sm">Small text</Text>
      <Text size="md">Medium text</Text>
      <Text size="lg">Large text</Text>
      <Text size="xl">Extra large text</Text>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Different text sizes."
      }
    }
  }
}`,...(x=(a=i.parameters)==null?void 0:a.docs)==null?void 0:x.source}}};var c,m,g;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  }}>
      <Text weight="light">Light weight text</Text>
      <Text weight="regular">Regular weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Different font weights."
      }
    }
  }
}`,...(g=(m=o.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};const f=["ComponentDocs","Sizes","Weights"];export{r as ComponentDocs,i as Sizes,o as Weights,f as __namedExportsOrder,T as default};
