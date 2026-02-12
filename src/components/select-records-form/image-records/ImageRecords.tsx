import "./ImageRecords.css";
import { Icon } from "@/components/atoms";
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
  const manualActionLabel = avatarRecordSet ? "Edit URL" : "Enter URL manually";

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
        )}
        <div
          style={avatarStyles}
          className={`ns-avatar-record-cont ${avatarRecordSet ? "ns-avatar-record-cont--set" : ""}`}
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

          {hasAvatarActions && (
            <div className="ns-avatar-action-anchor">
              <Dropdown
                placement="top"
                align="end"
                trigger={
                  <div
                    className={`ns-avatar-action-plus ${avatarRecordSet ? "ns-avatar-action-plus--set" : ""}`}
                    title={avatarRecordSet ? "Change avatar" : "Add avatar"}
                    aria-label={avatarRecordSet ? "Change avatar" : "Add avatar"}
                  >
                    <Icon name="plus" size={16} />
                  </div>
                }
              >
                <div className="ns-avatar-actions-menu">
                  {onAvatarUploadRequested && (
                    <button
                      type="button"
                      className="ns-avatar-actions-menu-item"
                      onClick={() => onAvatarUploadRequested()}
                    >
                      Upload image
                    </button>
                  )}
                  {onAvatarManualUrlRequested && (
                    <button
                      type="button"
                      className="ns-avatar-actions-menu-item"
                      onClick={() => onAvatarManualUrlRequested()}
                    >
                      {manualActionLabel}
                    </button>
                  )}
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
