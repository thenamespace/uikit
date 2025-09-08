import { ReactElement, RefObject, useMemo, useRef, useState } from "react";
import {
  ContenthashProtocol,
  EnsAddressRecord,
  EnsContenthashRecord,
  EnsRecords,
  EnsTextRecord,
} from "@/types";
import { Button, Icon, Input, Text } from "../atoms";
import { TextRecords } from "./text-records/TextRecords";
import { AddressRecords } from "./address-record/AddressRecords";
import { ContenthashRecord } from "./contenthash-records/ContenthashRecord";
import "./SelectRecordsForm.css";
import {
  RecordsAddedParams,
  RecordsSelector,
  ScrollToRecordSegment,
} from "./records-selector/RecordsSelector";
import { ImageRecords } from "./image-records/ImageRecords";
import { deepCopy } from "@/utils";
import {
  getSupportedAddressMap,
  getSupportedTextMap,
  supportedTexts,
  TextRecordCategory,
} from "@/constants";

const NAV_TEXTS = "Text Records";
const NAV_ADDRS = "Address Records";
const WEBSITE = "Website";

enum RecordsSidebarItem {
  General = "General",
  Social = "Social",
  Addresses = "Addresses",
  Website = "Website",
}


const navigation_items: string[] = [NAV_TEXTS, NAV_ADDRS, WEBSITE];

export interface SelectRecordsFormProps {
  records: EnsRecords;
  onRecordsUpdated: (records: EnsRecords) => void;
  actions?: ReactElement;
}

export const SelectRecordsForm = ({
  records,
  onRecordsUpdated,
  actions,
}: SelectRecordsFormProps) => {
  const [initialRecords] = useState<EnsRecords>(deepCopy(records));
  const [selectedItem, setSelectedItem] = useState<string>(NAV_TEXTS);
  const [selectRecords, setSelectRecords] = useState<boolean>(false);

  const generalCategoryRef = useRef<HTMLDivElement | null>(null);
  const socialCategoryRef = useRef<HTMLDivElement | null>(null);
  const addressesCategoryRef = useRef<HTMLDivElement | null>(null);
  const websiteCategoryRef = useRef<HTMLDivElement | null>(null);

  const [currentNav, setCurrentNav] = useState<RecordsSidebarItem>(
    RecordsSidebarItem.General
  );

  const handleTextsUpdated = (texts: EnsTextRecord[]) => {
    onRecordsUpdated({ ...records, texts });
  };

  const handleAddressesUpdated = (addresses: EnsAddressRecord[]) => {
    onRecordsUpdated({ ...records, addresses });
  };

  const scrollToCategory = (category: RecordsSidebarItem) => {
    const references: Record<
      RecordsSidebarItem,
      RefObject<HTMLDivElement | null>
    > = {
      General: generalCategoryRef,
      Social: socialCategoryRef,
      Website: websiteCategoryRef,
      Addresses: addressesCategoryRef,
    };

    const currentRef = references[category];

    if (currentRef && currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSidebarChange = (
    nav: RecordsSidebarItem,
    scroll: boolean = true
  ) => {
    setCurrentNav(nav);
    if (scroll) {
      scrollToCategory(nav);
    }
  };

  const handleContenthashAdded = (protocol: ContenthashProtocol) => {
   
    const oldContenthash = initialRecords.contenthash;

    let value = "";
    if (oldContenthash && oldContenthash.protocol === protocol) {
      value = oldContenthash.value;
    }
    onRecordsUpdated({...records, contenthash: { protocol, value }})
    
  }

  const handleRecordsAdded = (params: RecordsAddedParams) => {
    const newTexts = [...records.texts];
    if (params.keys.length > 0) {
      params.keys.forEach(key => {
        // If someone removes text thats initialy existed
        // and readed it, let also set the initial value
        const initialValue = initialRecords.texts.find(txt => txt.key === key);
        newTexts.push({
          key: key,
          value: initialValue ? initialValue.value : "",
        });
      });
    }
    const newAddresses = [...records.addresses];
    if (params.coins.length > 0) {
      params.coins.forEach(coin => {
        const initialValue = initialRecords.addresses.find(
          addr => addr.coinType === coin
        );
        newAddresses.push({
          coinType: coin,
          value: initialValue ? initialValue.value : "",
        });
      });
    }

    let newContenthash = records.contenthash
      ? { ...records.contenthash }
      : undefined;

    if (params.contenthash?.protocol) {
      const value = initialRecords.contenthash?.value || "";
      newContenthash = {
        protocol: params.contenthash.protocol,
        value: value,
      };
    }
    onRecordsUpdated({
      texts: newTexts,
      addresses: newAddresses,
      contenthash: newContenthash,
    });
  };

  const { avatar, header } = useMemo(() => {
    return {
      avatar: records.texts.find(r => r.key === "avatar")?.value,
      header: records.texts.find(r => r.key === "header")?.value,
    };
  }, [records.texts]);

  const handleContenthashUpdated = (contenthash: EnsContenthashRecord) => {
    onRecordsUpdated({ ...records, contenthash });
  };

  const handleContenthashRemoved = () => {
    const _records = { ...records };
    delete _records.contenthash;
    onRecordsUpdated(_records);
  };

  const getRecordCount = (recordNav: string) => {
    if (recordNav === NAV_ADDRS) {
      return records.addresses.length;
    } else if (recordNav === NAV_TEXTS) {
      return records.texts.length;
    }

    return records.contenthash ? 1 : 0;
  };

  // defines whether to scroll
  // to certai record category
  // when records selector is opened
  const getScrollToSegment = (): ScrollToRecordSegment | undefined => {
    if (selectedItem === NAV_ADDRS) {
      return "addresses";
    } else if (selectedItem === WEBSITE) {
      return "website";
    }
  };

  const handleImageRecordAdded = (
    record: "avatar" | "header",
    value: string
  ) => {
    const _texts = records.texts.filter(text => text.key !== record);

    let _value = value;
    if (_value.length === 0) {
      const initialValue = initialRecords.texts.find(txt => txt.key === record);
      _value = initialValue ? initialValue.value : value;
    }

    onRecordsUpdated({
      ...records,
      texts: [..._texts, { key: record, value: _value }],
    });
    setSelectedItem(NAV_TEXTS);
  };

  if (true) {
    return (
      <div className="ns-select-records-form">
        {/* Avatar and header */}
        <div style={{ marginBottom: 50 }}>
          <ImageRecords
            avatar={avatar}
            header={header}
            onAvatarAdded={(value: string) =>
              handleImageRecordAdded("avatar", value)
            }
            onHeaderAdded={(value: string) =>
              handleImageRecordAdded("header", value)
            }
          />
        </div>
        {/* Search Input */}
        <div className="ns-records-content-wrapper">
          <div className="ns-records-content row g-2">
            <div className="col-12 ns-mb-1">
              <Input
                placeholder="Search"
                prefix={<Icon name="search" size={18} />}
              />
            </div>
            {/* Sidebar Navigation */}
            <div className="col col-sm-3 col-12 ns-records-sidebar">
              {Object.keys(RecordsSidebarItem).map(item => {
                return (
                  <div
                    onClick={() =>
                      handleSidebarChange(item as RecordsSidebarItem)
                    }
                    key={item}
                    className={`sidebar-item ${item === currentNav ? "active" : ""}`}
                  >
                    <Text weight="medium" size="sm">
                      {item}
                    </Text>
                  </div>
                );
              })}
            </div>
            {/* Record Container */}
            <div className="col col-sm-9 col-12 ns-records-inner ns-styled-scrollbar">
              {/* General Records */}
              <div ref={generalCategoryRef} className="ns-mb-2">
                <TextRecords
                  texts={records.texts}
                  onTextsChanged={handleTextsUpdated}
                  category={TextRecordCategory.General}
                />
              </div>
              {/* Social Records Records */}
              <div ref={socialCategoryRef} className="ns-mb-2">
                <TextRecords
                  texts={records.texts}
                  onTextsChanged={handleTextsUpdated}
                  category={TextRecordCategory.Social}
                />
              </div>
              {/* Address Records */}
              <div ref={addressesCategoryRef} className="ns-mb-2">
                <AddressRecords
                  addresses={records.addresses}
                  onAddressesChanged={e => handleAddressesUpdated(e)}
                />
              </div>
              {/* Address Records */}
              <div ref={websiteCategoryRef} className="ns-mb-2">
                <ContenthashRecord
                  contenthash={records.contenthash}
                  onContenthashChanged={e => handleContenthashUpdated(e)}
                  onContenthashRemoved={() => handleContenthashRemoved()}
                  onContenthashAdded={(e) => handleContenthashAdded(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ns-select-records-form">
      {!selectRecords && (
        <>
          {/* // cover and avatar */}
          <div style={{ marginBottom: 50 }}>
            <ImageRecords
              avatar={avatar}
              header={header}
              onAvatarAdded={(value: string) =>
                handleImageRecordAdded("avatar", value)
              }
              onHeaderAdded={(value: string) =>
                handleImageRecordAdded("header", value)
              }
            />
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
                  style={{ whiteSpace: "nowrap" }}
                  color={selectedItem === item ? "primary" : "grey"}
                >
                  {item}
                </Text>
                <div className="record-count-badge" style={{ marginLeft: 3 }}>
                  <Text weight="bold" size="sm">
                    {getRecordCount(item)}
                  </Text>
                </div>
              </div>
            ))}
          </div>

          {/* records */}
          <div className="ns-select-records-content">
            {/* {selectedItem === NAV_TEXTS && (
              <TextRecords
                texts={records.texts}
                onTextsChanged={handleTextsUpdated}
              ></TextRecords>
            )} */}
            {selectedItem === NAV_ADDRS && (
              <AddressRecords
                addresses={records.addresses}
                onAddressesChanged={newAddresses =>
                  handleAddressesUpdated(newAddresses)
                }
              />
            )}
            {selectedItem === WEBSITE && (
              <ContenthashRecord
                contenthash={records.contenthash}
                onContenthashChanged={hash => handleContenthashUpdated(hash)}
                onContenthashRemoved={() => handleContenthashRemoved()}
                onContenthashAdded={() => {}}
              />
            )}
            <div
              style={{
                padding: 20,
                paddingTop: 0,
                paddingBottom: actions ? 0 : 20,
              }}
            >
              <Button
                onClick={() => setSelectRecords(true)}
                style={{ width: "100%", padding: "10px" }}
                variant="outline"
              >
                + Add Record
              </Button>
            </div>
            {actions && (
              <div className="ns-mt-2 ns-record-actions">{actions}</div>
            )}
          </div>
        </>
      )}
      {selectRecords && (
        <RecordsSelector
          texts={records.texts}
          addresses={records.addresses}
          contenthash={records.contenthash}
          onClose={() => setSelectRecords(false)}
          segment={getScrollToSegment()}
          onRecordsAdded={params => handleRecordsAdded(params)}
        />
      )}
    </div>
  );
};

export const SocialTextRecords = ({
  texts,
  onTextChanged,
}: {
  texts: EnsTextRecord[];
  onTextChanged: (key: string, value: string) => void;
}) => {
  const socialRecords = useMemo(() => {
    return supportedTexts.filter(
      txt => txt.category === TextRecordCategory.Social
    );
  }, []);

  return (
    <div>
      <Text weight="bold">General</Text>
    </div>
  );
};
