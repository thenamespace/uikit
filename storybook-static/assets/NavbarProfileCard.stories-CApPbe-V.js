import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{I as b}from"./Icon-CxnGDPwQ.js";import{T as n}from"./Text-DmuCryDF.js";import"./index-yBjzXJbu.js";import"./createLucideIcon-8R-gbQYJ.js";import"./index-BUSIDwT2.js";const o=({imageUrl:t,name:s,address:g,onLogout:f})=>e.jsxs("div",{className:"ns-navbar-profile",children:[e.jsx("img",{src:t,alt:s,className:"ns-navbar-profile-avatar"}),e.jsxs("div",{className:"ns-navbar-profile-info",children:[e.jsx(n,{color:"primary",size:"md",children:s}),e.jsx(n,{color:"grey",size:"sm",children:g})]}),e.jsx("button",{className:"ns-navbar-profile-action",onClick:f,children:e.jsx(b,{name:"logout",size:18})})]});o.__docgenInfo={description:"",methods:[],displayName:"NavbarProfileCard",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},name:{required:!0,tsType:{name:"string"},description:""},address:{required:!0,tsType:{name:"string"},description:""},onLogout:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const j={title:"Components/NavbarProfileCard",component:o,parameters:{layout:"centered",docs:{description:{component:`
# NavbarProfileCard

A compact profile card for navigation bars, showing avatar, name, address, and a logout action.
        `}}},argTypes:{imageUrl:{control:"text",description:"Avatar image URL"},name:{control:"text",description:"Profile name"},address:{control:"text",description:"Wallet address"},onLogout:{action:"logout",description:"Logout callback"}}},u=t=>e.jsx(o,{...t}),r={render:u,args:{imageUrl:"https://avatars.githubusercontent.com/u/123456?v=4",name:"Artii.eth",address:"0x1234567890123456789012345678901234567890"},parameters:{docs:{description:{story:"Default NavbarProfileCard with sample data."}}}},a={render:u,args:{imageUrl:"https://avatars.githubusercontent.com/u/789012?v=4",name:"Jane.eth",address:"0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",onLogout:()=>alert("Logged out!")},parameters:{docs:{description:{story:"NavbarProfileCard with logout action."}}}};var i,d,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: Template,
  args: {
    imageUrl: "https://avatars.githubusercontent.com/u/123456?v=4",
    name: "Artii.eth",
    address: "0x1234567890123456789012345678901234567890"
  },
  parameters: {
    docs: {
      description: {
        story: "Default NavbarProfileCard with sample data."
      }
    }
  }
}`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var m,l,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: Template,
  args: {
    imageUrl: "https://avatars.githubusercontent.com/u/789012?v=4",
    name: "Jane.eth",
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    onLogout: () => alert("Logged out!")
  },
  parameters: {
    docs: {
      description: {
        story: "NavbarProfileCard with logout action."
      }
    }
  }
}`,...(p=(l=a.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const L=["Default","WithLogout"];export{r as Default,a as WithLogout,L as __namedExportsOrder,j as default};
