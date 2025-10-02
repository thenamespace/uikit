import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{C as x}from"./ChainIcon-DSKpsAIN.js";import{T as c}from"./Text-DmuCryDF.js";import{c as v}from"./createLucideIcon-8R-gbQYJ.js";import"./index-yBjzXJbu.js";import"./index-BUSIDwT2.js";/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],C=v("clock",y),h=({children:a,className:t="",...s})=>e.jsx("div",{className:`ns-card ${t}`,...s,children:a});h.__docgenInfo={description:"",methods:[],displayName:"Card",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{defaultValue:{value:'""',computed:!1},required:!1}}};const i=({name:a,imageUrl:t,expires:s,chain:N})=>e.jsxs(h,{className:"ens-name-card",children:[e.jsxs("div",{className:"ens-card-image-container",children:[e.jsx("img",{src:t,alt:a,className:"ens-card-image"}),e.jsx("div",{className:"ens-card-badge",children:e.jsx(x,{chain:N??"eth",size:25})})]}),e.jsxs("div",{className:"ens-card-body",children:[e.jsx(c,{weight:"bold",children:a}),e.jsxs("div",{className:"ens-card-expiry",children:[e.jsx(C,{size:14,className:"ens-expiry-icon"}),e.jsxs(c,{size:"sm",children:["Expires ",s]})]})]})]});i.__docgenInfo={description:"",methods:[],displayName:"ENSNameCard",props:{name:{required:!0,tsType:{name:"string"},description:""},imageUrl:{required:!0,tsType:{name:"string"},description:""},expires:{required:!0,tsType:{name:"string"},description:""},chain:{required:!1,tsType:{name:"union",raw:"ChainName | undefined",elements:[{name:"union",raw:`| "eth"
| "arb"
| "base"
| "bitcoin"
| "matic"
| "op"
| "sol"
| "zora"
| "celo"`,elements:[{name:"literal",value:'"eth"'},{name:"literal",value:'"arb"'},{name:"literal",value:'"base"'},{name:"literal",value:'"bitcoin"'},{name:"literal",value:'"matic"'},{name:"literal",value:'"op"'},{name:"literal",value:'"sol"'},{name:"literal",value:'"zora"'},{name:"literal",value:'"celo"'}]},{name:"undefined"}]},description:""}}};const _={title:"Components/ENSNameCard",component:i,parameters:{layout:"centered",docs:{description:{component:`
# ENSNameCard

A card component for displaying ENS name details, including avatar, name, expiry, and chain badge.
        `}}},argTypes:{name:{control:"text",description:"ENS name"},imageUrl:{control:"text",description:"Avatar image URL"},expires:{control:"text",description:"Expiry date"},chain:{control:"text",description:"Chain name (e.g. eth, arb, base)"}}},g=a=>e.jsx(i,{...a}),r={render:g,args:{name:"artii.eth",imageUrl:"https://avatars.githubusercontent.com/u/123456?v=4",expires:"2026-12-31",chain:"eth"},parameters:{docs:{description:{story:"Default ENSNameCard with sample data."}}}},n={render:g,args:{name:"jane.eth",imageUrl:"https://avatars.githubusercontent.com/u/789012?v=4",expires:"2027-05-20",chain:"arb"},parameters:{docs:{description:{story:"ENSNameCard with custom chain badge."}}}};var o,m,d;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: Template,
  args: {
    name: "artii.eth",
    imageUrl: "https://avatars.githubusercontent.com/u/123456?v=4",
    expires: "2026-12-31",
    chain: "eth"
  },
  parameters: {
    docs: {
      description: {
        story: "Default ENSNameCard with sample data."
      }
    }
  }
}`,...(d=(m=r.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var l,p,u;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    name: "jane.eth",
    imageUrl: "https://avatars.githubusercontent.com/u/789012?v=4",
    expires: "2027-05-20",
    chain: "arb"
  },
  parameters: {
    docs: {
      description: {
        story: "ENSNameCard with custom chain badge."
      }
    }
  }
}`,...(u=(p=n.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};const w=["Default","WithCustomChain"];export{r as Default,n as WithCustomChain,w as __namedExportsOrder,_ as default};
