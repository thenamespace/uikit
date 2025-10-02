import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{C as n}from"./ChainIcon-DSKpsAIN.js";import"./index-yBjzXJbu.js";const g={title:"Atoms/ChainIcon",component:n,parameters:{layout:"centered",docs:{description:{component:"ChainIcon component for displaying blockchain network icons."}}},args:{chain:"eth",size:24},tags:["autodocs"]},i={render:()=>e.jsxs("div",{style:{maxWidth:"600px",margin:"0 auto",padding:"24px"},children:[e.jsx("h2",{children:"Component Documentation"}),e.jsx("h3",{children:"Key Props"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"chain"})," - Chain name: 'eth', 'arb', 'base', 'bitcoin', 'matic', 'op', 'sol', 'zora'"]}),e.jsxs("li",{children:[e.jsx("code",{children:"size"})," - Icon size in pixels (number, default: 24)"]}),e.jsxs("li",{children:[e.jsx("code",{children:"className"})," - Additional CSS classes (string)"]})]}),e.jsx("h3",{children:"Usage Examples"}),e.jsx("pre",{style:{backgroundColor:"#f5f5f5",padding:"16px",borderRadius:"8px",overflow:"auto"},children:`// Basic chain icon
<ChainIcon chain="eth" />

// With custom size
<ChainIcon chain="arb" size={32} />

// Bitcoin icon
<ChainIcon chain="bitcoin" size={24} />`})]}),parameters:{docs:{description:{story:"Documentation for the ChainIcon component."}}}},s={render:()=>e.jsx("div",{style:{display:"flex",alignItems:"center",gap:"1rem",flexWrap:"wrap"},children:["eth","arb","base","bitcoin","matic","op","sol","zora","celo"].map(o=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(n,{chain:o,size:32}),e.jsx("div",{style:{marginTop:"8px",fontSize:"12px",textTransform:"capitalize"},children:o})]},o))}),parameters:{docs:{description:{story:"All available blockchain icons."}}}},a={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[e.jsx(n,{chain:"eth",size:16}),e.jsx(n,{chain:"eth",size:24}),e.jsx(n,{chain:"eth",size:32}),e.jsx(n,{chain:"eth",size:48})]}),parameters:{docs:{description:{story:"Different chain icon sizes."}}}};var c,r,t;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "600px",
    margin: "0 auto",
    padding: "24px"
  }}>
      <h2>Component Documentation</h2>

      <h3>Key Props</h3>
      <ul>
        <li>
          <code>chain</code> - Chain name: 'eth', 'arb', 'base', 'bitcoin',
          'matic', 'op', 'sol', 'zora'
        </li>
        <li>
          <code>size</code> - Icon size in pixels (number, default: 24)
        </li>
        <li>
          <code>className</code> - Additional CSS classes (string)
        </li>
      </ul>

      <h3>Usage Examples</h3>
      <pre style={{
      backgroundColor: "#f5f5f5",
      padding: "16px",
      borderRadius: "8px",
      overflow: "auto"
    }}>
        {\`// Basic chain icon
<ChainIcon chain="eth" />

// With custom size
<ChainIcon chain="arb" size={32} />

// Bitcoin icon
<ChainIcon chain="bitcoin" size={24} />\`}
      </pre>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Documentation for the ChainIcon component."
      }
    }
  }
}`,...(t=(r=i.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};var l,d,h;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap"
  }}>
      {(["eth", "arb", "base", "bitcoin", "matic", "op", "sol", "zora", "celo"] as const).map(chain => <div key={chain} style={{
      textAlign: "center"
    }}>
          <ChainIcon chain={chain} size={32} />
          <div style={{
        marginTop: "8px",
        fontSize: "12px",
        textTransform: "capitalize"
      }}>
            {chain}
          </div>
        </div>)}
    </div>,
  parameters: {
    docs: {
      description: {
        story: "All available blockchain icons."
      }
    }
  }
}`,...(h=(d=s.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};var p,m,x;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  }}>
      <ChainIcon chain="eth" size={16} />
      <ChainIcon chain="eth" size={24} />
      <ChainIcon chain="eth" size={32} />
      <ChainIcon chain="eth" size={48} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Different chain icon sizes."
      }
    }
  }
}`,...(x=(m=a.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};const C=["ComponentDocs","AllChains","Sizes"];export{s as AllChains,i as ComponentDocs,a as Sizes,C as __namedExportsOrder,g as default};
