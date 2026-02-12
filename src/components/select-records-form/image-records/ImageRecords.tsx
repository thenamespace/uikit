import "./ImageRecords.css";
import { Icon, Text } from "@/components/atoms";
import { Dropdown } from "@/components/molecules";

interface ImageRecordProps {
  avatar?: string;
  header?: string;
  onAvatarAdded: (value: string) => void;
  onHeaderAdded: (value: string) => void;
  onAvatarUploadRequested?: () => void;
  onAvatarManualUrlRequested?: () => void;
}

const commonBgStyles = {
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export const ImageRecords = ({
  avatar,
  header,
  onAvatarAdded,
  onHeaderAdded,
  onAvatarUploadRequested,
  onAvatarManualUrlRequested,
}: ImageRecordProps) => {
  let avatarStyles = {};
  if (avatar && avatar.length > 0) {
    avatarStyles = {
      backgroundImage: `url(${avatar})`,
      ...commonBgStyles,
    };
  }

  let headerStyles = {};
  if (header && header.length > 0) {
    headerStyles = {
      backgroundImage: `url(${header})`,
      ...commonBgStyles,
    };
  }

  let headerRecordSet = header !== undefined;
  let avatarRecordSet = avatar !== undefined;
  const hasAvatarActions =
    !!onAvatarUploadRequested || !!onAvatarManualUrlRequested;
  const actionButtonLabel = avatarRecordSet ? "Change avatar" : "Add avatar";

  return (
    <div className="ns-image-records">
      <div style={headerStyles} className="ns-cover-record-cont">
        <div className="ns-top-grad"></div>
        <div className="ns-bot-grad"></div>
        {!headerRecordSet && (
          <div
            style={{ zIndex: 10 }}
            onClick={e => {
              e.stopPropagation();
              if (!headerRecordSet) {
                onHeaderAdded("");
              }
            }}
            className="ns-header-handle"
          >
            <Icon color="white" name="rotate-circle"></Icon>
          </div>

          // We will allow this when we start supporting avatar uploads
          // <Dropdown
          //   trigger={
          //     <div className="ns-header-handle">
          //       <Icon color="white" name="rotate-circle"></Icon>
          //     </div>
          //   }
          // >
          //   <div className="ns-upload-options">
          //     <Text
          //       onClick={e => {
          //         e.stopPropagation();
          //         if (!headerRecordSet) {
          //           onHeaderAdded("");
          //         }
          //       }}
          //       weight="medium"
          //       className="option"
          //       size="sm"
          //     >
          //       Add Header Record
          //     </Text>
          //     <Text weight="medium" className="option disabled" size="sm">
          //       Upload image
          //     </Text>
          //     <Text weight="medium" className="option disabled" size="sm">
          //       Select NFT
          //     </Text>
          //   </div>
          // </Dropdown>
        )}
        <div
          style={avatarStyles}
          className="ns-avatar-record-cont"
        >
          {!avatarRecordSet && hasAvatarActions && (
            <div className="ns-avatar-record-placeholder" aria-hidden="true">
              <Icon color="grey" name="image" size={28} />
            </div>
          )}

          {!avatarRecordSet && !hasAvatarActions && (
            <div
              style={{ zIndex: 10 }}
              onClick={e => {
                e.stopPropagation();
                if (!avatarRecordSet) {
                  onAvatarAdded("");
                }
              }}
              className="ns-image-handle"
              title="Add avatar record manually"
            >
              <Icon color="grey" name="rotate-circle"></Icon>
            </div>
          )}
        </div>
      </div>

      {hasAvatarActions && (
        <div className="ns-avatar-actions-row">
          <Dropdown
            align="center"
            trigger={
              <div className="ns-avatar-action-trigger">
                <Text weight="medium">{actionButtonLabel}</Text>
                <Icon name="chevron-down" size={16} />
              </div>
            }
          >
            <div className="ns-avatar-actions-menu">
              <button
                type="button"
                className="ns-avatar-actions-menu-item"
                onClick={() => onAvatarUploadRequested?.()}
              >
                Upload Image
              </button>
              <button
                type="button"
                className="ns-avatar-actions-menu-item"
                onClick={() => onAvatarManualUrlRequested?.()}
              >
                Add manual URL
              </button>
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
