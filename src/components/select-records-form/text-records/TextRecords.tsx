import { EnsTextRecord } from "@/types";
import { supportedTexts, TextRecordCategory } from "@/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, Input, Text } from "@/components";
import { capitalize } from "@/utils";

interface TextRecordsProps {
  texts: EnsTextRecord[];
  onTextsChanged: (texts: EnsTextRecord[]) => void;
  category: TextRecordCategory;
}

export const TextRecords = ({
  texts,
  onTextsChanged,
  category,
}: TextRecordsProps) => {
  const existingTextsMap = useMemo(() => {
    const map: Record<string, EnsTextRecord> = {};
    texts.forEach(txt => {
      map[txt.key] = txt;
    });
    return map;
  }, [texts]);

  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (lastAddedKey && inputRefs.current[lastAddedKey]) {
      inputRefs.current[lastAddedKey]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      inputRefs.current[lastAddedKey]?.focus();
      setLastAddedKey(null);
    }
  }, [texts, lastAddedKey]);

  const handleTextChanged = (key: string, value: string) => {
    const _texts = [...texts];
    for (const text of _texts) {
      if (text.key === key) {
        text.value = value;
      }
    }
    onTextsChanged(_texts);
  };

  const handleTextAdded = (key: string) => {
    onTextsChanged([...texts, { key, value: "" }]);
    setLastAddedKey(key);
  };

  const handleRemoveText = (key: string) => {
    onTextsChanged(texts.filter(text => text.key !== key));
  };

  const supportedRecords = useMemo(() => {
    const shownTextCategory = [category];
    if (category === TextRecordCategory.General) {
      // We also show image records under general
      shownTextCategory.push(TextRecordCategory.Image);
    }

    return supportedTexts.filter(txt =>
      shownTextCategory.includes(txt.category)
    );
  }, []);

  return (
    <div className="ns-text-records">
      <Text className="ns-mb-2" weight="bold">
        {capitalize(category)}
      </Text>
      {supportedRecords
        .filter(record => existingTextsMap[record.key] !== undefined)
        .map(record => {
          const current = existingTextsMap[record.key];

          return (
            <div key={record.key} style={{ marginBottom: 10 }}>
              <Text
                style={{ marginBottom: "4px" }}
                color="grey"
                size="xs"
                weight="medium"
              >
                {record.label}
              </Text>
              <div
                style={{ width: "100%" }}
                className="d-flex align-items-center"
              >
                <Input
                  ref={(el: HTMLInputElement | null) => {
                    inputRefs.current[record.key] = el;
                  }}
                  style={{ width: "100%" }}
                  onChange={e => handleTextChanged(record.key, e.target.value)}
                  prefix={<Icon name={record.icon} size={18} color="grey" />}
                  value={current.value}
                  placeholder={record.placeholder}
                />
                <div
                  onClick={() => handleRemoveText(record.key)}
                  className="ns-close-icon ns-ms-1"
                >
                  <Icon name="x" size={18} />
                </div>
              </div>
            </div>
          );
        })}
      <div className="row g-2">
        {supportedRecords
          .filter(
            record =>
              existingTextsMap[record.key] === undefined &&
              record.category !== TextRecordCategory.Image
          )
          .map(record => (
            <div key={record.key} className="col col-lg-3 col-sm-6">
              <div
                className="ns-text-suggestion"
                onClick={() => handleTextAdded(record.key)}
              >
                <Icon size={18} color="grey" name={record.icon} />
                <Text className="ns-mt-1" size="xs" weight="medium">
                  {record.label}
                </Text>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
