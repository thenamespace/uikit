import React from "react";

export function DemoPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="demo-panel">
      <div className="demo-panel-header">
        <span className="demo-panel-title">PLAYGROUND</span>
      </div>
      <div className="demo-panel-body">{children}</div>
    </div>
  );
}
