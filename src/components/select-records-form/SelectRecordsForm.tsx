import { useState } from "react";
import { EnsAddressRecord, EnsRecords, EnsTextRecord } from "../../types";
import { Button, Text } from "../atoms";
import { TextRecords } from "./text-records/TextRecords";
import { AddressRecords } from "./address-record/AddressRecords";
import { ContenthashRecord } from "./contenthash-records/ContenthashRecord";
import "./SelectRecordsForm.css";
import { RecordsSelector } from "./records-selector/RecordsSelector";

const NAV_TEXTS = "Text Records";
const NAV_ADDRS = "Address Records";
const WEBSITE = "Website";

const navigation_items: string[] = [NAV_TEXTS, NAV_ADDRS, WEBSITE];

export interface SelectRecordsFormProps {
  records: EnsRecords;
  onRecordsUpdated: (records: EnsRecords) => void;
}

export const SelectRecordsForm = ({
  records,
  onRecordsUpdated,
}: SelectRecordsFormProps) => {
  const [selectedItem, setSelectedItem] = useState<string>(NAV_TEXTS);
  const [selectRecords, setSelectRecords] = useState<boolean>(false);

  const handleTextsUpdated = (texts: EnsTextRecord[]) => {
    onRecordsUpdated({ ...records, texts });
  };

  const handleAddressesUpdated = (addresses: EnsAddressRecord[]) => {
    onRecordsUpdated({ ...records, addresses });
  };

  return (
    <div className="ns-select-records-form">
      {!selectRecords && <>
        {/* // cover and avatar */}
        <div className="ns-cover-cont">
          <div className="ns-avatar-cont"></div>
        </div>

        {/* nav items */}
        <div className="ns-select-records-nav d-flex justify-content-around align-items-center">
          {navigation_items.map(item => (
            <div
              key={item}
              onClick={() => setSelectedItem(item)}
              className={`nav-cont d-flex align-items-center justify-content-center ${selectedItem === item ? "active" : ""}`}
            >
              <Text
                size="sm"
                weight="medium"
                color={selectedItem === item ? "primary" : "grey"}
              >
                {item}
              </Text>
            </div>
          ))}
        </div>

        {/* records */}
        <div className="ns-select-records-content">
          {selectedItem === NAV_TEXTS && (
            <TextRecords
              texts={records.texts}
              onTextsChanged={handleTextsUpdated}
            ></TextRecords>
          )}
          {selectedItem === NAV_ADDRS && <AddressRecords />}
          {selectedItem === WEBSITE && <ContenthashRecord />}
          <div className="mt-3">
            <Button onClick={() => setSelectRecords(true)} style={{ width: "100%", padding: "10px" }} variant="outline">+ Add Record</Button>
          </div>
        </div>
      </>}
      {selectRecords && <RecordsSelector texts={records.texts} addresses={records.addresses}
        onClose={() => setSelectRecords(false)} onTextSelected={() => { }} onAddressSelected={() => { }} />}
    </div>
  );
};
