import { EnsAddressRecord, EnsTextRecord } from "@/types";
import "./RecordsSelector.css";
import { Button, Icon, IconName, Input, Text } from "@/components/atoms";
import { useMemo, useRef, useState } from "react";
import {
    SupportedTextRecord,
    supportedTexts,
    TextRecordCategory,
} from "@/constants";

interface RecordsSelectorProps {
    texts: EnsTextRecord[];
    addresses: EnsAddressRecord[];
    onTextsAdded: (keys: string[]) => void;
    onAddressesAdded: (coins: number[]) => void;
    onClose: () => void;
}

enum SidebarNavItem {
    General = "General",
    Social = "Social",
    Addresses = "Addresses",
    Website = "Website",
}

const navIcons: Record<SidebarNavItem, IconName> = {
    General: "box",
    Social: "square-user",
    Addresses: "pin",
    Website: "globe",
};

export const RecordsSelector = ({ onClose, texts, addresses, onTextsAdded, onAddressesAdded }: RecordsSelectorProps) => {
    const [selectedTextsMap, setSelectedTextsMap] = useState<
        Record<string, boolean>
    >({});
    const [selectedAddressesMap, setSelectedAddressesMap] = useState<
        Record<string, boolean>
    >({});
    const [currentNav, setCurrentNav] = useState<SidebarNavItem>(
        SidebarNavItem.General
    );
    const parentRef = useRef<HTMLDivElement | null>(null);
    const generalCategoryRef = useRef<HTMLDivElement | null>(null);
    const socialCategoryRef = useRef<HTMLDivElement | null>(null);
    const addressesCategoryRef = useRef<HTMLDivElement | null>(null);
    const websiteCategoryRef = useRef<HTMLDivElement | null>(null);

    const textRecordMap = useMemo<
        Record<"General" | "Social", SupportedTextRecord[]>
    >(() => {
        const records: Record<"General" | "Social", SupportedTextRecord[]> = {
            General: supportedTexts.filter(
                txt => txt.category === TextRecordCategory.General
            ),
            Social: supportedTexts.filter(
                txt => txt.category === TextRecordCategory.Social
            ),
        };

        return records;
    }, []);

       const recordsAddedCount = useMemo(() => {
        const addedTexts = Object.keys(selectedTextsMap).length;
        const addedAddrs = Object.keys(selectedAddressesMap).length;

        return addedTexts + addedAddrs;
    },[selectedTextsMap, selectedAddressesMap])

    const handleAddRecords = () => {
        const textKeys = Object.keys(selectedTextsMap);
        if (textKeys.length > 0) {
            onTextsAdded(textKeys);
        }
        const addressKeys = Object.keys(selectedAddressesMap);
        if (addressKeys.length > 0) {
            onAddressesAdded(addressKeys.map(i => parseInt(i)))
        }
        setSelectedTextsMap({})
        setSelectedAddressesMap({});
        onClose();
    }

    const handleNavChanged = (nav: SidebarNavItem) => {
        scrollToNav(nav);
        setCurrentNav(nav);
    };

    const scrollToNav = (nav: SidebarNavItem) => {
        if (nav === SidebarNavItem.General && generalCategoryRef.current) {
            generalCategoryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (nav === SidebarNavItem.Social && socialCategoryRef.current) {
            socialCategoryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (
            nav === SidebarNavItem.Addresses &&
            addressesCategoryRef.current
        ) {
            addressesCategoryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else if (nav === SidebarNavItem.Website && websiteCategoryRef.current) {
            websiteCategoryRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const toggleSelectText = (textKey: string) => {
        const textMap = { ...selectedTextsMap };
        if (textMap[textKey]) {
            delete textMap[textKey];
        } else {
            textMap[textKey] = true;
        }
        setSelectedTextsMap(textMap);
    };

    const isTextSelected = (key: string) => {
        return selectedTextsMap[key];
    };


    return (
        <div className="ns-records-selector">
            <div
                onClick={onClose}
                className="ns-mb-3 text-center"
                style={{ textAlign: "center" }}
            >
                <Icon name="x"></Icon>
                <Text size="lg" weight="bold">
                    Add Records
                </Text>
                <Text color="grey" size="sm" weight="medium">
                    Lorem ipusm doalr sit amer
                </Text>
            </div>
            <div className="ns-mb-3">
                <Input prefix={<Icon size={18} name="search" />} placeholder="Search" />
            </div>
            <div className="ns-records-sidebar row" ref={parentRef}>
                <div className="col-4">
                    {Object.keys(SidebarNavItem).map(sideItem => {
                        const item = sideItem as SidebarNavItem;
                        const activeClass = item === currentNav ? "active" : "";

                        return (
                            <div
                                onClick={() => handleNavChanged(item)}
                                key={sideItem}
                                className={`sidebar-item d-flex align-items-center ${activeClass}`}
                            >
                                <Icon className="ns-me-1" size={16} name={navIcons[item]} />
                                <Text size="sm" weight="medium">
                                    {item}
                                </Text>
                            </div>
                        );
                    })}
                </div>
                <div className="col-8 ns-records-content">
                    <div
                        ref={generalCategoryRef}
                        className="ns-records-selector-category"
                    >
                        <Text className="ns-mb-1" weight="bold">
                            General
                        </Text>
                        <>
                            {textRecordMap.General.map(item => {
                                const isActive = isTextSelected(item.key);
                                return <div
                                    onClick={() => toggleSelectText(item.key)}
                                    className={`ns-text-record d-flex align-items-center ${isActive ? "active" : ""}`}
                                    key={item.key}
                                >
                                    <div className="ns-icon-cont ns-me-1">
                                        <Icon color={isActive ? undefined : "white"} name={item.icon} size={12} />
                                    </div>
                                    <Text weight="medium" color={isActive ? "white" : "primary"} size="sm">
                                        {item.label}
                                    </Text>
                                </div>
                            })}
                        </>
                    </div>
                    <div ref={socialCategoryRef} className="ns-records-selector-category">
                        <Text className="ns-mb-1" weight="bold">
                            Social
                        </Text>
                        <>
                            {textRecordMap.Social.map(item => {
                                const isActive = isTextSelected(item.key);
                                return <div
                                    onClick={() => toggleSelectText(item.key)}
                                    className={`ns-text-record d-flex align-items-center ${isActive ? "active" : ""}`}
                                    key={item.key}
                                >
                                    <div className="ns-icon-cont ns-me-1">
                                        <Icon color={isActive ? undefined : "white"} name={item.icon} size={12} />
                                    </div>
                                    <Text weight="medium" color={isActive ? "white" : "primary"} size="sm">
                                        {item.label}
                                    </Text>
                                </div>
                            })}
                        </>
                    </div>
                    <div
                        ref={addressesCategoryRef}
                        className="ns-records-selector-category"
                    >
                        <Text className="ns-mb-1" weight="bold">
                            Addresses
                        </Text>
                    </div>
                    <div
                        ref={websiteCategoryRef}
                        className="ns-records-selector-category"
                    >
                        <Text className="ns-mb-1" weight="bold">
                            Website
                        </Text>
                    </div>
                </div>
            </div>
            <div className="ns-mt-3">
                <Button
                    style={{ width: "50%" }}
                    size="lg"
                    onClick={() => onClose()}
                    className="pe-2"
                    variant="outline"
                >
                    Cancel
                </Button>
                <Button onClick={() => handleAddRecords()} disabled={recordsAddedCount === 0} style={{ width: "50%" }} size="lg">
                    Add {recordsAddedCount}
                </Button>
            </div>
        </div>
    );
};
