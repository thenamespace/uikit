import { useEffect, useMemo, useState } from "react";
import "./ImageRecords.css";
import { Button, Icon, Text } from "@/components/atoms";
import { Dropdown, Modal } from "@/components/molecules";

type ImageRecordType = "avatar" | "header";

interface ImageActionItem {
  id: string;
  label: string;
  onSelect: () => void;
}

interface ImageRecordProps {
  avatar?: string;
  header?: string;
  onAvatarAdded: (value: string) => void;
  onHeaderAdded: (value: string) => void;
  onAvatarUploadRequested?: () => void;
  onAvatarManualUrlRequested?: () => void;
  onHeaderUploadRequested?: () => void;
  onHeaderManualUrlRequested?: () => void;
}

const MOBILE_BREAKPOINT_QUERY = "(max-width: 600px)";

const commonBgStyles = {
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const getManualActionLabel = (isSet: boolean): string => {
  return isSet ? "Edit URL" : "Enter URL";
};

export const ImageRecords = ({
  avatar,
  header,
  onAvatarAdded,
  onHeaderAdded,
  onAvatarUploadRequested,
  onAvatarManualUrlRequested,
  onHeaderUploadRequested,
  onHeaderManualUrlRequested,
}: ImageRecordProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActions, setMobileActions] = useState<{
    record: ImageRecordType;
    actions: ImageActionItem[];
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT_QUERY);
    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);
    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  const avatarStyles = avatar
    ? {
        backgroundImage: `url(${avatar})`,
        ...commonBgStyles,
      }
    : {};

  const headerStyles = header
    ? {
        backgroundImage: `url(${header})`,
        ...commonBgStyles,
      }
    : {};

  const headerRecordSet = header !== undefined;
  const avatarRecordSet = avatar !== undefined;

  const requestAvatarManualUrl = () => {
    if (onAvatarManualUrlRequested) {
      onAvatarManualUrlRequested();
      return;
    }
    onAvatarAdded("");
  };

  const requestHeaderManualUrl = () => {
    if (onHeaderManualUrlRequested) {
      onHeaderManualUrlRequested();
      return;
    }
    onHeaderAdded("");
  };

  const avatarActions = useMemo<ImageActionItem[]>(() => {
    const actions: ImageActionItem[] = [];
    if (onAvatarUploadRequested) {
      actions.push({
        id: "upload",
        label: "Upload image",
        onSelect: onAvatarUploadRequested,
      });
    }
    actions.push({
      id: "manual-url",
      label: getManualActionLabel(avatarRecordSet),
      onSelect: requestAvatarManualUrl,
    });
    return actions;
  }, [
    onAvatarUploadRequested,
    onAvatarManualUrlRequested,
    onAvatarAdded,
    avatarRecordSet,
  ]);

  const headerActions = useMemo<ImageActionItem[]>(() => {
    const actions: ImageActionItem[] = [];
    if (onHeaderUploadRequested) {
      actions.push({
        id: "upload",
        label: "Upload image",
        onSelect: onHeaderUploadRequested,
      });
    }
    actions.push({
      id: "manual-url",
      label: getManualActionLabel(headerRecordSet),
      onSelect: requestHeaderManualUrl,
    });
    return actions;
  }, [
    onHeaderUploadRequested,
    onHeaderManualUrlRequested,
    onHeaderAdded,
    headerRecordSet,
  ]);

  const openMobileActions = (
    record: ImageRecordType,
    actions: ImageActionItem[]
  ) => {
    if (actions.length === 0) {
      return;
    }
    setMobileActions({ record, actions });
  };

  const handleActionSelected = (action: ImageActionItem) => {
    action.onSelect();
    setMobileActions(null);
  };

  const renderActionTrigger = (
    record: ImageRecordType,
    recordSet: boolean,
    actions: ImageActionItem[]
  ) => {
    const title = recordSet ? `Change ${record}` : `Add ${record}`;

    if (isMobile) {
      return (
        <button
          type="button"
          className={`ns-image-action-plus ${recordSet ? "ns-image-action-plus--set" : ""}`}
          title={title}
          aria-label={title}
          onClick={() => openMobileActions(record, actions)}
        >
          <Icon name="plus" size={16} />
        </button>
      );
    }

    return (
      <Dropdown
        placement="top"
        align="end"
        trigger={
          <div
            className={`ns-image-action-plus ${recordSet ? "ns-image-action-plus--set" : ""}`}
            title={title}
            aria-label={title}
          >
            <Icon name="plus" size={16} />
          </div>
        }
      >
        <div className="ns-image-actions-menu">
          {actions.map(action => (
            <button
              key={`${record}-${action.id}`}
              type="button"
              className="ns-image-actions-menu-item"
              onClick={() => action.onSelect()}
            >
              {action.label}
            </button>
          ))}
        </div>
      </Dropdown>
    );
  };

  return (
    <div className="ns-image-records">
      <div style={headerStyles} className="ns-cover-record-cont">
        <div className="ns-top-grad"></div>
        <div className="ns-bot-grad"></div>

        {!headerRecordSet && (
          <div className="ns-header-record-placeholder" aria-hidden="true">
            <Icon color="white" name="image" size={22} />
          </div>
        )}

        <div className="ns-header-action-anchor">
          {renderActionTrigger("header", headerRecordSet, headerActions)}
        </div>

        <div
          style={avatarStyles}
          className={`ns-avatar-record-cont ${avatarRecordSet ? "ns-avatar-record-cont--set" : ""}`}
        >
          {!avatarRecordSet && (
            <div className="ns-avatar-record-placeholder" aria-hidden="true">
              <Icon color="grey" name="image" size={28} />
            </div>
          )}

          <div className="ns-avatar-action-anchor">
            {renderActionTrigger("avatar", avatarRecordSet, avatarActions)}
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!mobileActions}
        onClose={() => setMobileActions(null)}
        size="sm"
        className="ns-image-actions-sheet"
        footer={
          <Button
            variant="outline"
            className="ns-image-actions-sheet__close-btn"
            onClick={() => setMobileActions(null)}
          >
            Close
          </Button>
        }
      >
        <div className="ns-image-actions-sheet__content">
          <Text size="sm" weight="medium">
            {mobileActions?.record === "avatar" ? "Avatar image" : "Header image"}
          </Text>
          <div className="ns-image-actions-sheet__list">
            {mobileActions?.actions.map(action => (
              <button
                key={`mobile-${mobileActions.record}-${action.id}`}
                type="button"
                className="ns-image-actions-sheet__item"
                onClick={() => handleActionSelected(action)}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
