import { EnsAddressRecord, EnsTextRecord } from "@/types";
import "./RecordsSelector.css";
import { Icon, IconName, Input, Text } from "@/components/atoms";
import { useState } from "react";
import { LucideIceCream } from "lucide-react";

interface RecordsSelectorProps {
    texts: EnsTextRecord[]
    addresses: EnsAddressRecord[]
    onTextSelected: (record: EnsTextRecord, isRemoved: boolean) => void
    onAddressSelected: (record: EnsAddressRecord, isRemoved: boolean) => void
    onClose: () => void
}

enum SidebarNavItem {
    General = "General",
    Social = "Social",
    Addresses = "Addresses",
    Website = "Website"
}

const navIcons: Record<SidebarNavItem, IconName> = {
    "General": "box",
    "Social": "square-user",
    "Addresses": "pin",
    "Website": "globe"
}

export const RecordsSelector = ({
    onClose
}: RecordsSelectorProps) => {

    const [selectedTexts, setSelectedTexts] = useState<EnsTextRecord[]>([])
    const [selectedAddresses, setSelectedAddresses] = useState<EnsAddressRecord[]>([])
    const [currentNav, setCurrentNav] = useState<SidebarNavItem>(SidebarNavItem.General)

    return <div className="ns-records-selector">
        <div onClick={onClose} className="ns-mb-3 text-center" style={{textAlign: "center"}}>
            <Icon name="x"></Icon>
            <Text size="lg" weight="bold">Add Records</Text>
            <Text color="grey" size="sm" weight="medium">Lorem ipusm doalr sit amer</Text>
        </div>
        <div className="ns-mb-3">
            <Input prefix={<Icon size={18} name="search"/>} placeholder="Search"/>
        </div>
        <div className="ns-records-sidebar row">
            <div className="col-4">
                {Object.keys(SidebarNavItem).map(sideItem => {
                    
                    const item = sideItem as SidebarNavItem;
                    const activeClass = item === currentNav ? "active" : ""
                    
                    return <div onClick={() => setCurrentNav(item)} key={sideItem} className={`sidebar-item d-flex align-items-center ${activeClass}`}>
                    <Icon className="ns-me-1" size={16} name={navIcons[item]}/>
                    <Text size="sm" weight="medium">{item}</Text>
                </div>
                })}
            </div>
            <div className="col-8">
                test
            </div>
        </div>
        Records selector here
    </div>
}