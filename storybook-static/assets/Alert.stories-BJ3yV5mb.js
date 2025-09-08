import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{A as s}from"./Alert-DZx66M8k.js";import"./index-yBjzXJbu.js";import"./Icon-z_mIe9Ku.js";import"./index-BUSIDwT2.js";const q={title:"Molecules/Alert",component:s,parameters:{layout:"padded"},argTypes:{variant:{control:{type:"select"},options:["error","warning","info","success"]},dismissible:{control:{type:"boolean"}},title:{control:{type:"text"}}}},r={args:{variant:"error",children:"This is an error message that indicates something went wrong.",title:"Error"}},a={args:{variant:"warning",children:"This is a warning message that indicates a potential issue.",title:"Warning"}},i={args:{variant:"info",children:"This is an informational message that provides helpful context.",title:"Information"}},t={args:{variant:"success",children:"This is a success message that indicates something completed successfully.",title:"Success"}},n={args:{variant:"info",children:"This is an alert without a title."}},o={args:{variant:"warning",children:"This is a dismissible alert. Click the X to close it.",title:"Dismissible Alert",dismissible:!0,onClose:()=>alert("Alert closed!")}},l={args:{variant:"info",children:"This is a longer alert message that demonstrates how the component handles multiple lines of text. It should wrap properly and maintain good readability while preserving the visual hierarchy and spacing.",title:"Long Content Example"}},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(s,{variant:"error",title:"Error",children:"This is an error message."}),e.jsx(s,{variant:"warning",title:"Warning",children:"This is a warning message."}),e.jsx(s,{variant:"info",title:"Info",children:"This is an info message."}),e.jsx(s,{variant:"success",title:"Success",children:"This is a success message."})]})};var m,d,h;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    children: 'This is an error message that indicates something went wrong.',
    title: 'Error'
  }
}`,...(h=(d=r.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var g,p,u;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'This is a warning message that indicates a potential issue.',
    title: 'Warning'
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var f,v,T;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    children: 'This is an informational message that provides helpful context.',
    title: 'Information'
  }
}`,...(T=(v=i.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var w,x,y;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'This is a success message that indicates something completed successfully.',
    title: 'Success'
  }
}`,...(y=(x=t.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var A,S,b;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    children: 'This is an alert without a title.'
  }
}`,...(b=(S=n.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var E,C,I;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'This is a dismissible alert. Click the X to close it.',
    title: 'Dismissible Alert',
    dismissible: true,
    onClose: () => alert('Alert closed!')
  }
}`,...(I=(C=o.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var W,j,D;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    children: 'This is a longer alert message that demonstrates how the component handles multiple lines of text. It should wrap properly and maintain good readability while preserving the visual hierarchy and spacing.',
    title: 'Long Content Example'
  }
}`,...(D=(j=l.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var L,k,V;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Alert variant="error" title="Error">
        This is an error message.
      </Alert>
      <Alert variant="warning" title="Warning">
        This is a warning message.
      </Alert>
      <Alert variant="info" title="Info">
        This is an info message.
      </Alert>
      <Alert variant="success" title="Success">
        This is a success message.
      </Alert>
    </div>
}`,...(V=(k=c.parameters)==null?void 0:k.docs)==null?void 0:V.source}}};const z=["Error","Warning","Info","Success","WithoutTitle","Dismissible","LongContent","AllVariants"];export{c as AllVariants,o as Dismissible,r as Error,i as Info,l as LongContent,t as Success,a as Warning,n as WithoutTitle,z as __namedExportsOrder,q as default};
