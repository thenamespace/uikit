import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, SelectRecordsForm } from "../src";
import "../src/styles/theme.css";
import { EnsRecords, EnsTextRecord } from "../src/types";

const _texts: EnsTextRecord[] = [
  {
    key: "name",
    value: "test",
  },
  {
    key: "description",
    value: "hello",
  },
];

function TestApp() {
  const [records, setRecords] = useState<EnsRecords>({
    texts: [..._texts],
    addresses: [],
  });

  const handleRecordsUpdated = (newRecords: EnsRecords) => {
    setRecords(newRecords);
  };

  return (
    <div>
      Hello there
      <SelectRecordsForm
        records={records}
        onRecordsUpdated={handleRecordsUpdated}
      />
      <Button
        onClick={() => {
          console.log(records);
        }}
      >
        Print
      </Button>
    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<TestApp />);
}
