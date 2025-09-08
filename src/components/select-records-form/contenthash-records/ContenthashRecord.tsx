import { Input, Text, Icon } from "@/components/atoms";
import { ContenthashIcon } from "@/components/molecules";
import {
  getSupportedChashByProtocol,
  isContenthashValid,
  SupportedContenthashRecord,
  supportedContenthashRecords,
} from "@/constants";
import { ContenthashProtocol, EnsContenthashRecord } from "@/types";
import { useMemo } from "react";

interface ContenthashRecordProps {
  contenthash?: EnsContenthashRecord;
  onContenthashChanged: (value: EnsContenthashRecord) => void;
  onContenthashRemoved: () => void;
  onContenthashAdded: (protocol: ContenthashProtocol) => void;
}

export const ContenthashRecord = ({
  contenthash,
  onContenthashChanged,
  onContenthashRemoved,
  onContenthashAdded,
}: ContenthashRecordProps) => {
  const isValidInput = useMemo(() => {
    if (contenthash && contenthash.value.length > 0) {
      return isContenthashValid(contenthash.protocol, contenthash.value);
    }

    return true;
  }, [contenthash]);
  const metadata = useMemo<SupportedContenthashRecord | undefined>(() => {
    if (contenthash?.protocol) {
      return getSupportedChashByProtocol(contenthash?.protocol);
    }
  }, [contenthash]);

  const handleContenthashChanged = (
    protocol: ContenthashProtocol,
    value: string
  ) => {
    onContenthashChanged({ protocol, value });
  };

  return (
    <div className="ns-text-records">
      <Text className="ns-mb-2" weight="bold">
        Website
      </Text>
      {!contenthash && (
        <div className="row g-2">
          {supportedContenthashRecords.map(record => (
            <div key={record.protocol} className="col col-lg-3 col-sm-6">
              <div
                className="ns-text-suggestion"
                onClick={() => onContenthashAdded(record.protocol)}
              >
                <ContenthashIcon size={20} protocol={record.protocol} />
                <Text className="ns-mt-1" size="xs" weight="medium">
                  {record.label}
                </Text>
              </div>
            </div>
          ))}
        </div>
      )}
      {contenthash && metadata && (
        <div>
          <Text
            style={{ marginBottom: "4px" }}
            color="grey"
            size="xs"
            weight="medium"
          >
            {metadata.label}
          </Text>
          <div style={{ width: "100%" }} className="d-flex align-items-center">
            <Input
              style={{ width: "100%" }}
              onChange={e =>
                handleContenthashChanged(contenthash.protocol, e.target.value)
              }
              prefix={
                <ContenthashIcon protocol={contenthash.protocol} size={18} />
              }
              value={contenthash.value}
              placeholder={`${contenthash.protocol}://`}
            />
            <div
              onClick={() => onContenthashRemoved()}
              className="ns-close-icon ns-ms-1"
            >
              <Icon name="x" size={18} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
