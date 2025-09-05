import { Text } from "@/components/atoms"
import { getSupportedTextMap, SupportedTextRecord } from "@/constants"
import { EnsRecords } from "@/types"
import { EnsRecordsDiff, getEnsRecordsDiff } from "@/utils"
import { useMemo } from "react"

interface RecordDiffProps {
    oldRecords: EnsRecords,
    newRecords: EnsRecords
}

const textMap: Record<string, SupportedTextRecord> = getSupportedTextMap();

export const RecordDiff = ({oldRecords, newRecords}: RecordDiffProps) => {

    const diff:EnsRecordsDiff = useMemo(() => {
        return getEnsRecordsDiff(oldRecords, newRecords);
    },[oldRecords, newRecords])

    const { textsAdded, textsModified, textsRemoved} = diff;

    return <div className="ns-record-diff">
        <div>
            <Text>Texts added</Text>
        </div>
    </div>
}