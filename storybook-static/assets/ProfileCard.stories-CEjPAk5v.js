import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{I as r}from"./Icon-CxnGDPwQ.js";import{T as s}from"./Text-DmuCryDF.js";import{B as a}from"./Button-BScpP696.js";import"./index-yBjzXJbu.js";import"./createLucideIcon-8R-gbQYJ.js";import"./index-BUSIDwT2.js";const p=({bannerUrl:m,avatarUrl:E,name:b,username:W,bio:A,address:L,followers:k,following:F,ownedBy:_,expires:R,records:O,website:u,subnames:M,profit:V,volume:I})=>e.jsxs("div",{className:"ns-profile-card",children:[e.jsxs("div",{className:"ns-profile-info",children:[e.jsxs("div",{className:"ns-profile-banner",children:[e.jsx("img",{src:m,alt:"banner"}),e.jsxs("div",{className:"ns-profile-avatar",children:[e.jsx("img",{src:E,alt:b}),e.jsx("div",{className:"ns-avatar-badge",children:e.jsx("img",{src:"https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",alt:"chain icon",className:"ns-avatar-badge-icon"})})]})]}),e.jsxs("div",{className:"ns-profile-body",children:[e.jsx(s,{color:"primary",weight:"bold",children:b}),e.jsxs("div",{className:"ns-username-container",children:[e.jsx(s,{size:"xl",weight:"bold",children:W}),e.jsx("span",{className:"ns-edit-btn",children:e.jsx(r,{name:"edit",size:16})})]}),e.jsx(s,{size:"md",className:"ns-profile-bio",children:A}),e.jsxs("div",{className:"ns-profile-socials",children:[e.jsxs("div",{className:"ns-address-box",children:[e.jsx(s,{color:"grey",className:"ns-address-text",size:"sm",children:"0x1234...abcd"}),e.jsx(r,{name:"copy",size:16})]}),e.jsx(a,{children:e.jsx(r,{name:"twitter",color:"#000000",size:16})}),e.jsx(a,{children:e.jsx(r,{name:"telegram",color:"#000000",size:16})}),e.jsx(a,{children:e.jsx(r,{name:"globe",color:"#000000",size:16})}),e.jsx(a,{children:e.jsx(r,{name:"github",color:"#000000",size:16})})]}),e.jsx("div",{className:"ns-profile-stats",children:e.jsxs("div",{className:"ns-stats-row",children:[e.jsxs(s,{size:"sm",children:[k," Followers"]}),e.jsx(s,{children:"•"}),e.jsxs(s,{size:"sm",children:[F," Following"]}),e.jsx(a,{size:"sm",variant:"outline",children:"Follow"})]})})]})]}),e.jsxs("div",{className:"ns-profile-section ns-profile-links",children:[e.jsxs("div",{className:"ns-extra-item",children:[e.jsxs(s,{size:"sm",children:["Owned by ",_]}),e.jsx("button",{className:"ns-extra-btn",children:e.jsx(r,{name:"check-circle",size:16})})]}),e.jsxs("div",{className:"ns-extra-item",children:[e.jsxs(s,{size:"sm",children:["Expires ",R]}),e.jsx(r,{name:"info",size:16})]}),e.jsxs("div",{className:"ns-extra-item",children:[e.jsx(s,{size:"sm",children:L}),e.jsx(r,{name:"map-pin",size:16})]}),u&&e.jsxs("div",{className:"ns-extra-item",children:[e.jsx(s,{size:"sm",children:u}),e.jsx("a",{href:u,target:"_blank",rel:"noreferrer",children:e.jsx(r,{name:"globe",size:16})})]})]}),e.jsxs("div",{className:"ns-profile-footer",children:[e.jsxs("div",{className:"ns-footer-item",children:[e.jsx(s,{className:"ns-footer-label",children:M}),e.jsx(s,{className:"ns-footer-text",children:"Subnames"})]}),e.jsx(s,{className:"ns-footer-dot",children:"•"}),e.jsxs("div",{className:"ns-footer-item",children:[e.jsx(s,{className:"ns-footer-label",children:V}),e.jsx(s,{className:"ns-footer-text",children:"Profit"})]}),e.jsx(s,{className:"ns-footer-dot",children:"•"}),e.jsxs("div",{className:"ns-footer-item",children:[e.jsx(s,{className:"ns-footer-label",children:I}),e.jsx(s,{className:"ns-footer-text",children:"Volume"})]})]})]});p.__docgenInfo={description:"",methods:[],displayName:"ProfileCard",props:{bannerUrl:{required:!0,tsType:{name:"string"},description:""},avatarUrl:{required:!0,tsType:{name:"string"},description:""},name:{required:!0,tsType:{name:"string"},description:""},username:{required:!0,tsType:{name:"string"},description:""},bio:{required:!0,tsType:{name:"string"},description:""},address:{required:!0,tsType:{name:"string"},description:""},followers:{required:!0,tsType:{name:"number"},description:""},following:{required:!0,tsType:{name:"number"},description:""},ownedBy:{required:!0,tsType:{name:"string"},description:""},expires:{required:!0,tsType:{name:"string"},description:""},records:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},website:{required:!1,tsType:{name:"string"},description:""},subnames:{required:!0,tsType:{name:"number"},description:""},profit:{required:!0,tsType:{name:"number"},description:""},volume:{required:!0,tsType:{name:"number"},description:""}}};const Z={title:"Components/ProfileCard",component:p,parameters:{layout:"centered",docs:{description:{component:`
# ProfileCard

A user profile card component for displaying ENS profile information, including avatar, banner, username, bio, address, stats, and social links.

## Features
- Banner and avatar
- Username, bio, and address
- Social and copy actions
- Stats and extra info
- Responsive layout
        `}}},argTypes:{bannerUrl:{control:"text",description:"Banner image URL"},avatarUrl:{control:"text",description:"Avatar image URL"},name:{control:"text",description:"Full name"},username:{control:"text",description:"Username"},bio:{control:"text",description:"Profile bio"},address:{control:"text",description:"Wallet address"},followers:{control:"number",description:"Number of followers"},following:{control:"number",description:"Number of following"},ownedBy:{control:"text",description:"Owner address or name"},expires:{control:"text",description:"Expiry date"},records:{control:"object",description:"ENS records"},website:{control:"text",description:"Website URL"},subnames:{control:"number",description:"Subnames count"},profit:{control:"number",description:"Profit value"},volume:{control:"number",description:"Volume value"}}},n=m=>e.jsx(p,{...m}),t={render:n,args:{bannerUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb",avatarUrl:"https://avatars.githubusercontent.com/u/123456?v=4",name:"Artii",username:"artii.eth",bio:"Web3 builder, ENS enthusiast, and open source contributor.",address:"0x1234567890123456789012345678901234567890",followers:1200,following:300,ownedBy:"artii.eth",expires:"2026-12-31",records:["description","url","avatar"],website:"https://artii.eth.limo",subnames:5,profit:2.5,volume:100},parameters:{docs:{description:{story:"Default ProfileCard with sample data."}}}},o={render:n,args:{bannerUrl:"https://images.unsplash.com/photo-1465101046530-73398c7f28ca",avatarUrl:"https://avatars.githubusercontent.com/u/789012?v=4",name:"Jane Doe",username:"jane.eth",bio:"Decentralized identity explorer.",address:"0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",followers:800,following:150,ownedBy:"jane.eth",expires:"2027-05-20",records:["description","avatar"],website:"https://jane.eth.limo",subnames:2,profit:1.2,volume:50},parameters:{docs:{description:{story:"ProfileCard with custom user data."}}}},i={render:n,args:{bannerUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb",avatarUrl:"",name:"No Avatar User",username:"noavatar.eth",bio:"This user has no avatar set.",address:"0x0000000000000000000000000000000000000000",followers:0,following:0,ownedBy:"noavatar.eth",expires:"2028-01-01",records:[],website:"",subnames:0,profit:0,volume:0},parameters:{docs:{description:{story:"ProfileCard with no avatar and zero stats."}}}},c={render:n,args:{bannerUrl:"https://images.unsplash.com/photo-1465101046530-73398c7f28ca",avatarUrl:"https://avatars.githubusercontent.com/u/789012?v=4",name:"Long Bio User",username:"longbio.eth",bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet cursus, enim erat dictum urna, nec cursus enim erat euismod nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam euismod, nunc ut laoreet cursus, enim erat dictum urna, nec cursus enim erat euismod nunc.",address:"0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",followers:10,following:5,ownedBy:"longbio.eth",expires:"2029-12-31",records:["description"],website:"https://longbio.eth.limo",subnames:1,profit:.1,volume:1},parameters:{docs:{description:{story:"ProfileCard with a very long bio."}}}},d={render:n,args:{bannerUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb",avatarUrl:"https://avatars.githubusercontent.com/u/123456?v=4",name:"No Website",username:"noweb.eth",bio:"No website provided.",address:"0x1234567890123456789012345678901234567890",followers:100,following:50,ownedBy:"noweb.eth",expires:"2027-07-07",records:["description"],website:void 0,subnames:3,profit:.5,volume:10},parameters:{docs:{description:{story:"ProfileCard with no website link."}}}},l={render:n,args:{bannerUrl:"https://images.unsplash.com/photo-1465101046530-73398c7f28ca",avatarUrl:"https://avatars.githubusercontent.com/u/789012?v=4",name:"Popular User",username:"popular.eth",bio:"This user is very popular!",address:"0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",followers:1e5,following:1e3,ownedBy:"popular.eth",expires:"2030-01-01",records:["description","avatar"],website:"https://popular.eth.limo",subnames:10,profit:100,volume:1e3},parameters:{docs:{description:{story:"ProfileCard with a large number of followers and subnames."}}}};var h,f,x;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: Template,
  args: {
    bannerUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    avatarUrl: "https://avatars.githubusercontent.com/u/123456?v=4",
    name: "Artii",
    username: "artii.eth",
    bio: "Web3 builder, ENS enthusiast, and open source contributor.",
    address: "0x1234567890123456789012345678901234567890",
    followers: 1200,
    following: 300,
    ownedBy: "artii.eth",
    expires: "2026-12-31",
    records: ["description", "url", "avatar"],
    website: "https://artii.eth.limo",
    subnames: 5,
    profit: 2.5,
    volume: 100
  },
  parameters: {
    docs: {
      description: {
        story: "Default ProfileCard with sample data."
      }
    }
  }
}`,...(x=(f=t.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var g,v,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: Template,
  args: {
    bannerUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    avatarUrl: "https://avatars.githubusercontent.com/u/789012?v=4",
    name: "Jane Doe",
    username: "jane.eth",
    bio: "Decentralized identity explorer.",
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    followers: 800,
    following: 150,
    ownedBy: "jane.eth",
    expires: "2027-05-20",
    records: ["description", "avatar"],
    website: "https://jane.eth.limo",
    subnames: 2,
    profit: 1.2,
    volume: 50
  },
  parameters: {
    docs: {
      description: {
        story: "ProfileCard with custom user data."
      }
    }
  }
}`,...(w=(v=o.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var j,y,N;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: Template,
  args: {
    bannerUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    avatarUrl: "",
    // No avatar
    name: "No Avatar User",
    username: "noavatar.eth",
    bio: "This user has no avatar set.",
    address: "0x0000000000000000000000000000000000000000",
    followers: 0,
    following: 0,
    ownedBy: "noavatar.eth",
    expires: "2028-01-01",
    records: [],
    website: "",
    subnames: 0,
    profit: 0,
    volume: 0
  },
  parameters: {
    docs: {
      description: {
        story: "ProfileCard with no avatar and zero stats."
      }
    }
  }
}`,...(N=(y=i.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};var U,T,z;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: Template,
  args: {
    bannerUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    avatarUrl: "https://avatars.githubusercontent.com/u/789012?v=4",
    name: "Long Bio User",
    username: "longbio.eth",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet cursus, enim erat dictum urna, nec cursus enim erat euismod nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam euismod, nunc ut laoreet cursus, enim erat dictum urna, nec cursus enim erat euismod nunc.",
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    followers: 10,
    following: 5,
    ownedBy: "longbio.eth",
    expires: "2029-12-31",
    records: ["description"],
    website: "https://longbio.eth.limo",
    subnames: 1,
    profit: 0.1,
    volume: 1
  },
  parameters: {
    docs: {
      description: {
        story: "ProfileCard with a very long bio."
      }
    }
  }
}`,...(z=(T=c.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var P,B,C;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: Template,
  args: {
    bannerUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    avatarUrl: "https://avatars.githubusercontent.com/u/123456?v=4",
    name: "No Website",
    username: "noweb.eth",
    bio: "No website provided.",
    address: "0x1234567890123456789012345678901234567890",
    followers: 100,
    following: 50,
    ownedBy: "noweb.eth",
    expires: "2027-07-07",
    records: ["description"],
    website: undefined,
    subnames: 3,
    profit: 0.5,
    volume: 10
  },
  parameters: {
    docs: {
      description: {
        story: "ProfileCard with no website link."
      }
    }
  }
}`,...(C=(B=d.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var q,S,D;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: Template,
  args: {
    bannerUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    avatarUrl: "https://avatars.githubusercontent.com/u/789012?v=4",
    name: "Popular User",
    username: "popular.eth",
    bio: "This user is very popular!",
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    followers: 100000,
    following: 1000,
    ownedBy: "popular.eth",
    expires: "2030-01-01",
    records: ["description", "avatar"],
    website: "https://popular.eth.limo",
    subnames: 10,
    profit: 100,
    volume: 1000
  },
  parameters: {
    docs: {
      description: {
        story: "ProfileCard with a large number of followers and subnames."
      }
    }
  }
}`,...(D=(S=l.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};const $=["Default","WithCustomData","NoAvatar","LongBio","MissingWebsite","ManyFollowers"];export{t as Default,c as LongBio,l as ManyFollowers,d as MissingWebsite,i as NoAvatar,o as WithCustomData,$ as __namedExportsOrder,Z as default};
