import { EnsRecords } from "@/types";
import { useMemo, useState } from "react";
import { SelectRecordsForm } from "../select-records-form/SelectRecordsForm";
import { Button } from "../atoms";
import "./EditRecordsForm.css";
import { convertToMulticallResolverData } from "@/utils/resolver";
import { getEnsRecordsDiff } from "@/utils";

interface EditRecordsFormProps {
  initialRecords?: EnsRecords;
  resolverAddress?: string;
  name: string;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const blankRecords: EnsRecords = {
  texts: [],
  addresses: [],
};

export const EditRecordsForm = ({ initialRecords }: EditRecordsFormProps) => {
  const [records, setRecords] = useState<EnsRecords>(
    initialRecords ? { ...initialRecords } : { texts: [], addresses: [] }
  );

  const areValidAddresses = useMemo(() => {

    return false;
  },[records.addresses])

  const areValidTexts = useMemo(() => {

    return true;
  },[records.texts])

  const isFormValid = areValidTexts && areValidAddresses;

  const updateRecords = async () => {

  }

  const getDiff = () => {
   
  }

  const test = () => {
    console.log("test")
    console.log(records, "RECORDS")
     const old:EnsRecords = initialRecords ? initialRecords : { texts:[], addresses: []};
    const diff = getEnsRecordsDiff(old, records);
    const data = convertToMulticallResolverData("test.eth", diff)
    console.log(data, "DATA!!")
  }



  return (
    <div className="ns-edit-records-form">
      <SelectRecordsForm
        records={records}
        actions={
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <Button onClick={() => test()} size="lg" style={{ width: "100%" }} variant="outline">
              Cancel
            </Button>
            <Button disabled={!isFormValid} size="lg" style={{ width: "100%" }}>
              Update
            </Button>
          </div>
        }
        onRecordsUpdated={records => setRecords(records)}
      />
    </div>
  );
};
