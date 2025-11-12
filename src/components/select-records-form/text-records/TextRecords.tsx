import { EnsTextRecord } from "@/types";
import {
  SupportedTextRecord,
  supportedTexts,
  TextRecordCategory,
} from "@/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, Input, Text, Textarea } from "@/components/atoms";
import { capitalize } from "@/utils";

interface TextRecordsProps {
  initialTexts: EnsTextRecord[];
  texts: EnsTextRecord[];
  onTextsChanged: (texts: EnsTextRecord[]) => void;
  category: TextRecordCategory;
  searchFilter?: string;
}

export const TextRecords = ({
  texts,
  onTextsChanged,
  category,
  initialTexts,
  searchFilter,
}: TextRecordsProps) => {
  const existingTextsMap = useMemo(() => {
    const map: Record<string, EnsTextRecord> = {};
    texts.forEach(txt => {
      map[txt.key] = txt;
    });
    return map;
  }, [texts]);

  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

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

  // Helper function to extract username from a full URL
  const extractUsername = (url: string, prefix: string): string => {
    if (!prefix || !url) return url; // For Discord and other platforms without prefix
    
    // If it starts with the prefix, extract the username part
    if (url.startsWith(prefix)) {
      return url.slice(prefix.length);
    }
    
    // Try to extract from various URL formats
    try {
      // Handle URLs with or without protocol
      const urlToParse = url.startsWith('http://') || url.startsWith('https://') 
        ? url 
        : `https://${url}`;
      
      const urlObj = new URL(urlToParse);
      const pathname = urlObj.pathname;
      
      // For Twitter/X, GitHub, Telegram - extract from pathname
      if (prefix.includes('x.com') || prefix.includes('twitter.com') || prefix.includes('github.com') || prefix.includes('t.me')) {
        const username = pathname.replace(/^\//, '').split('/')[0];
        return username || url;
      }
      
      // For YouTube with @ handle
      if (prefix.includes('youtube.com/@')) {
        const match = pathname.match(/^\/@(.+)/);
        if (match) {
          return match[1].split('/')[0]; // Get just the handle, ignore any additional path
        }
        // Fallback: try to extract from pathname
        const username = pathname.replace(/^\//, '').split('/')[0];
        return username || url;
      }
    } catch {
      // If URL parsing fails, return as is (might be partial input)
    }
    
    return url;
  };

  // Helper function to form full link from username
  const formFullLink = (input: string, prefix: string): string => {
    if (!prefix) return input; // For Discord and other platforms without prefix
    
    // If it's already a full URL, return as is
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return input;
    }
    
    // If it starts with the prefix, return as is
    if (input.startsWith(prefix)) {
      return input;
    }
    
    // Otherwise, prepend the prefix
    return prefix + input;
  };

  const handleTextChanged = (key: string, value: string) => {
    const record = supportedTexts.find(r => r.key === key);
    const prefix = record?.socialRecordPrefix || "";
    
    // For social records, form the full link from username
    let finalValue = value;
    if (record?.category === TextRecordCategory.Social && prefix) {
      finalValue = formFullLink(value, prefix);
    }
    
    const _texts = [...texts];
    for (const text of _texts) {
      if (text.key === key) {
        text.value = finalValue;
      }
    }
    onTextsChanged(_texts);
  };

  const handleTextAdded = (key: string) => {
    const initialText = initialTexts.find(txt => txt.key === key);
    onTextsChanged([...texts, { key, value: initialText?.value || "" }]);
    setLastAddedKey(key);
  };

  const handleRemoveText = (key: string) => {
    onTextsChanged(texts.filter(text => text.key !== key));
  };

  const filterSuggestions = (record: SupportedTextRecord): boolean => {
    if (searchFilter && searchFilter.length > 0) {
      const lowercase = searchFilter.toLocaleLowerCase();
      const label = record.label || "";

      return (
        record.key.toLocaleLowerCase().includes(lowercase) ||
        label.toLocaleLowerCase().includes(lowercase)
      );
    }
    return true;
  };

  const filteredItems: SupportedTextRecord[] = useMemo(() => {
    const shownTextCategory = [category];
    if (category === TextRecordCategory.General) {
      // We also show image records under general
      shownTextCategory.push(TextRecordCategory.Image);
    }

    return supportedTexts.filter(
      record =>
        filterSuggestions(record) && shownTextCategory.includes(record.category)
    );
  }, [searchFilter]);

  if (filteredItems.length === 0) {
    return <></>;
  }

  const recordsInOrder = useMemo(() => {
    const shownTextCategory = [category];
    if (category === TextRecordCategory.General) {
      shownTextCategory.push(TextRecordCategory.Image);
    }
    
    return texts
      .map(text => {
        const record = supportedTexts.find(r => r.key === text.key);
        return record && shownTextCategory.includes(record.category) ? { text, record } : null;
      })
      .filter((item): item is { text: EnsTextRecord; record: SupportedTextRecord } => {
        if (!item) return false;
        // Apply search filter if present
        if (searchFilter && searchFilter.length > 0) {
          const lowercase = searchFilter.toLocaleLowerCase();
          const label = item.record.label || "";
          return (
            item.record.key.toLocaleLowerCase().includes(lowercase) ||
            label.toLocaleLowerCase().includes(lowercase)
          );
        }
        return true;
      });
  }, [texts, category, searchFilter]);

  return (
    <div className="ns-text-records">
      <Text className="ns-mb-2" weight="bold">
        {capitalize(category)}
      </Text>
      {recordsInOrder
        .map(({ text, record }) => {
          const current = text;
          const prefix = record.socialRecordPrefix || "";
          
          // For social records, display username instead of full link in input
          // but store the full link in the value
          const displayValue = 
            record.category === TextRecordCategory.Social && prefix && current.value
              ? extractUsername(current.value, prefix)
              : current.value;

          // Check if this is a social record with prefix (should show split input)
          const isSocialWithPrefix = 
            record.category === TextRecordCategory.Social && 
            prefix && 
            prefix.length > 0;

          const isDescription = record.key === "description";

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
                {isDescription ? (
                  <Textarea
                    size="sm"
                    ref={(el: HTMLTextAreaElement | null) => {
                      inputRefs.current[record.key] = el;
                    }}
                    style={{ width: "100%", flex: 1, height: 70 }}
                    onChange={e => handleTextChanged(record.key, e.target.value)}
                    prefix={<Icon name={record.icon} size={18} color="grey" />}
                    value={current.value}
                    placeholder={record.placeholder}
                    rows={4}
                  />
                ) : (
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
                )}
                <div
                  onClick={() => handleRemoveText(record.key)}
                  className="ns-close-icon ns-ms-1"
                  style={{ marginTop: isDescription ? "8px" : "0" }}
                >
                  <Icon name="x" size={14} />
                </div>
              </div>
            </div>
          );
        })}
      <div className="row g-2">
        {filteredItems
          .filter(
            record =>
              existingTextsMap[record.key] === undefined &&
              record.category !== TextRecordCategory.Image &&
              filterSuggestions(record)
          )
          .map(record => (
            <div key={record.key} className="col col-lg-3 col-sm-6 col-6">
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
