import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";import{T as o}from"./Tooltip-BQ2ye9zM.js";import{B as e}from"./Button-BScpP696.js";import"./index-yBjzXJbu.js";import"./index-BUSIDwT2.js";const C={title:"Components/Atoms/Tooltip",component:o,parameters:{layout:"centered",docs:{description:{component:"A flexible tooltip component that displays helpful information when users hover over, focus on, or click an element. Supports multiple positions, triggers, and styling variants."}}},argTypes:{children:{control:!1,description:"The element that triggers the tooltip"},content:{control:{type:"text"},description:"The content to display in the tooltip"},position:{control:{type:"select"},options:["top","bottom","left","right","top-start","top-end","bottom-start","bottom-end"],description:"Position of the tooltip relative to the trigger element"},delay:{control:{type:"number",min:0,max:2e3,step:100},description:"Delay in milliseconds before showing the tooltip"},disabled:{control:{type:"boolean"},description:"Whether the tooltip is disabled"},trigger:{control:{type:"select"},options:["hover","click","focus"],description:"Event that triggers the tooltip"},maxWidth:{control:{type:"number",min:100,max:500,step:50},description:"Maximum width of the tooltip in pixels"},offset:{control:{type:"number",min:0,max:20,step:2},description:"Offset distance between tooltip and trigger element"}},tags:["autodocs"]},i={args:{content:"This is a tooltip",position:"top",delay:200,disabled:!1,trigger:"hover",maxWidth:200,offset:8},render:y=>t.jsx(o,{...y,children:t.jsx(e,{children:"Hover me"})})},n={render:()=>t.jsxs("div",{style:{display:"flex",gap:"20px",alignItems:"center"},children:[t.jsx(o,{content:"Top tooltip",position:"top",children:t.jsx(e,{children:"Top"})}),t.jsx(o,{content:"Bottom tooltip",position:"bottom",children:t.jsx(e,{children:"Bottom"})}),t.jsx(o,{content:"Left tooltip",position:"left",children:t.jsx(e,{children:"Left"})}),t.jsx(o,{content:"Right tooltip",position:"right",children:t.jsx(e,{children:"Right"})})]}),parameters:{docs:{description:{story:"Basic tooltip positioning options."}}}},s={render:()=>t.jsxs("div",{style:{display:"flex",gap:"20px",alignItems:"center"},children:[t.jsx(o,{content:"Hover to see this tooltip",trigger:"hover",children:t.jsx(e,{children:"Hover"})}),t.jsx(o,{content:"Click to toggle this tooltip",trigger:"click",children:t.jsx(e,{children:"Click"})}),t.jsx(o,{content:"Focus to see this tooltip",trigger:"focus",children:t.jsx(e,{children:"Focus"})})]}),parameters:{docs:{description:{story:"Different trigger modes: hover, click, and focus."}}}},r={render:()=>t.jsxs("div",{style:{maxWidth:"600px",margin:"0 auto",padding:"24px"},children:[t.jsx("h2",{children:"Component Documentation"}),t.jsx("h3",{children:"Key Props"}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("code",{children:"content"})," - Tooltip content (ReactNode)"]}),t.jsxs("li",{children:[t.jsx("code",{children:"position"})," - Position: 'top', 'bottom', 'left', 'right' (default: 'top')"]}),t.jsxs("li",{children:[t.jsx("code",{children:"trigger"})," - Trigger: 'hover', 'click', 'focus' (default: 'hover')"]}),t.jsxs("li",{children:[t.jsx("code",{children:"delay"})," - Delay in milliseconds (default: 200)"]}),t.jsxs("li",{children:[t.jsx("code",{children:"disabled"})," - Disable tooltip (boolean)"]})]}),t.jsx("h3",{children:"Usage Examples"}),t.jsx("pre",{style:{backgroundColor:"#f5f5f5",padding:"16px",borderRadius:"8px",overflow:"auto"},children:`// Basic usage
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// With custom position
<Tooltip content="Bottom tooltip" position="bottom">
  <Button>Custom</Button>
</Tooltip>

// Click trigger
<Tooltip content="Click to toggle" trigger="click">
  <Button>Click me</Button>
</Tooltip>`})]}),parameters:{docs:{description:{story:"Documentation for the Tooltip component."}}}};var l,c,p;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    content: "This is a tooltip",
    position: "top",
    delay: 200,
    disabled: false,
    trigger: "hover",
    maxWidth: 200,
    offset: 8
  },
  render: args => <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
}`,...(p=(c=i.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var d,a,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "20px",
    alignItems: "center"
  }}>
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>

      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>

      <Tooltip content="Left tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>

      <Tooltip content="Right tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Basic tooltip positioning options."
      }
    }
  }
}`,...(m=(a=n.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var g,h,u;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "20px",
    alignItems: "center"
  }}>
      <Tooltip content="Hover to see this tooltip" trigger="hover">
        <Button>Hover</Button>
      </Tooltip>

      <Tooltip content="Click to toggle this tooltip" trigger="click">
        <Button>Click</Button>
      </Tooltip>

      <Tooltip content="Focus to see this tooltip" trigger="focus">
        <Button>Focus</Button>
      </Tooltip>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Different trigger modes: hover, click, and focus."
      }
    }
  }
}`,...(u=(h=s.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var x,f,T;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "24px"
  }}>
      <h2>Component Documentation</h2>

      <h3>Key Props</h3>
      <ul>
        <li>
          <code>content</code> - Tooltip content (ReactNode)
        </li>
        <li>
          <code>position</code> - Position: 'top', 'bottom', 'left', 'right'
          (default: 'top')
        </li>
        <li>
          <code>trigger</code> - Trigger: 'hover', 'click', 'focus' (default:
          'hover')
        </li>
        <li>
          <code>delay</code> - Delay in milliseconds (default: 200)
        </li>
        <li>
          <code>disabled</code> - Disable tooltip (boolean)
        </li>
      </ul>

      <h3>Usage Examples</h3>
      <pre style={{
      backgroundColor: "#f5f5f5",
      padding: "16px",
      borderRadius: "8px",
      overflow: "auto"
    }}>
        {\`// Basic usage
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// With custom position
<Tooltip content="Bottom tooltip" position="bottom">
  <Button>Custom</Button>
</Tooltip>

// Click trigger
<Tooltip content="Click to toggle" trigger="click">
  <Button>Click me</Button>
</Tooltip>\`}
      </pre>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Documentation for the Tooltip component."
      }
    }
  }
}`,...(T=(f=r.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};const D=["Default","Positions","Triggers","ComponentDocs"];export{r as ComponentDocs,i as Default,n as Positions,s as Triggers,D as __namedExportsOrder,C as default};
