import { Input, Text, Icon } from "@/components/atoms";
import { ContenthashIcon } from "@/components/molecules";
import {
  getSupportedChashByProtocol,
  isContenthashValid,
  SupportedContenthashRecord,
} from "@/constants";
import { ContenthashProtocol, EnsContenthashRecord } from "@/types";
import { useMemo } from "react";

interface ContenthashRecordProps {
  contenthash?: EnsContenthashRecord;
  onContenthashChanged: (value: EnsContenthashRecord) => void;
  onContenthashRemoved: () => void;
}

export const ContenthashRecord = ({
  contenthash,
  onContenthashChanged,
  onContenthashRemoved,
}: ContenthashRecordProps) => {

  const isValidInput = useMemo(() => {

    if (contenthash && contenthash.value.length > 0) {
      return isContenthashValid(contenthash.protocol, contenthash.value);
    }

    return true;
  },[contenthash])
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
      <div className="ns-records-wrapper">
        {!metadata && (
          <div className="not-found-badge d-flex align-items-center">
            <Icon name="circle-alert" size={16} />
            <Text color="grey" weight="medium" size="sm" className="ns-ms-1">
              No contenthash found
            </Text>
          </div>
        )}
        {metadata && (
          <div className="row">
            <div className="col-4 d-flex align-items-center">
              <ContenthashIcon protocol={metadata.protocol} size={24} />
              <Text weight="medium" size="sm" className="ns-ms-1">
                {metadata.label}
              </Text>
            </div>
            <div className="col-8 d-flex align-items-center">
              <Input
                error={!isValidInput}
                value={contenthash?.value}
                placeholder={`${contenthash?.protocol}://`}
                onChange={e =>
                  handleContenthashChanged(metadata.protocol, e.target.value)
                }
              />
              <div onClick={() => onContenthashRemoved()}>
                <Icon name="x" className="ns-close-icon ns-ms-1" size={18} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
};
