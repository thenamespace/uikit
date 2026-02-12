import { useEffect, useMemo, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { ALLOWED_FORMATS, AVATAR_MAX_SIZE } from "@thenamespace/avatar";
import { Button, ShurikenSpinner, Text } from "@/components/atoms";
import { Alert, Modal, ProgressBar } from "@/components/molecules";
import { useAvatarClient } from "@/hooks";
import { getCroppedImageFile } from "./cropImage";
import "./AvatarUploadModal.css";

type UploadState = "idle" | "editing" | "signing" | "uploading";

interface AvatarUploadModalProps {
  isOpen: boolean;
  ensName: string;
  isTestnet?: boolean;
  siweDomain?: string;
  onClose: () => void;
  onUploaded: (data: { url: string; uploadedAt: string }) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getMaxSizeLabel = () => {
  return formatFileSize(AVATAR_MAX_SIZE);
};

const AVATAR_MODAL_LOG_PREFIX = "[AvatarUploadModal]";

export const AvatarUploadModal = ({
  isOpen,
  ensName,
  isTestnet,
  siweDomain,
  onClose,
  onUploaded,
}: AvatarUploadModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [modalStep, setModalStep] = useState<"edit" | "review">("edit");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { uploadAvatar } = useAvatarClient({
    isTestnet,
    domain: siweDomain,
  });

  const isBusy = uploadState === "signing" || uploadState === "uploading";
  const isReviewStep = modalStep === "review";

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    setSelectedFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    setModalStep("edit");
    setUploadState("idle");
    setError(null);
    setUploadProgress(0);
  }, [isOpen]);

  const acceptedTypes = useMemo(() => {
    return ALLOWED_FORMATS.join(",");
  }, []);

  const openFilePicker = () => {
    if (!fileInputRef.current) {
      return;
    }
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleFileSelected = (file?: File) => {
    if (!file) {
      return;
    }

    setError(null);

    if (!ALLOWED_FORMATS.includes(file.type)) {
      setError("Unsupported file type. Please use JPEG, PNG, GIF, or WebP.");
      return;
    }

    if (file.size > AVATAR_MAX_SIZE) {
      setError(`Image is too large. Maximum size is ${getMaxSizeLabel()}.`);
      return;
    }

    setSelectedFile(file);
    setModalStep("edit");
    setUploadState("editing");
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please choose an image first.");
      return;
    }
    if (!croppedAreaPixels) {
      setError("Please wait for the image cropper to load.");
      return;
    }

    setError(null);
    setUploadProgress(0);
    setUploadState("signing");
    console.info(`${AVATAR_MODAL_LOG_PREFIX} sign+upload started`, {
      ensName,
      isTestnet: !!isTestnet,
      siweDomain: siweDomain || window.location.hostname,
      selectedFile: {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      },
      croppedAreaPixels,
    });

    try {
      const croppedFile = await getCroppedImageFile(selectedFile, croppedAreaPixels);
      console.info(`${AVATAR_MODAL_LOG_PREFIX} cropped file ready`, {
        name: croppedFile.name,
        type: croppedFile.type,
        size: croppedFile.size,
      });
      const result = await uploadAvatar({
        ensName,
        file: croppedFile,
        onProgress: (progress) => {
          setUploadState("uploading");
          setUploadProgress(Math.max(0, Math.min(100, Math.round(progress))));
        },
      });
      console.info(`${AVATAR_MODAL_LOG_PREFIX} upload result`, result);

      onUploaded({
        url: result.url,
        uploadedAt: result.uploadedAt,
      });
      onClose();
    } catch (err) {
      console.error(`${AVATAR_MODAL_LOG_PREFIX} upload error`, err);
      setUploadState("editing");
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload avatar.";
      setError(errorMessage);
    }
  };

  const handleContinue = () => {
    if (!selectedFile) {
      setError("Please choose an image first.");
      return;
    }
    if (!croppedAreaPixels) {
      setError("Please wait for the image cropper to load.");
      return;
    }
    setError(null);
    setModalStep("review");
  };

  const handleBackToEdit = () => {
    if (isBusy) {
      return;
    }
    setError(null);
    setModalStep("edit");
    setUploadState("editing");
  };

  const footer = (
    <div className="ns-avatar-upload-modal__footer">
      {!isReviewStep && (
        <>
          <Button
            className="ns-avatar-upload-modal__footer-btn"
            variant="outline"
            onClick={onClose}
            disabled={isBusy}
          >
            Cancel
          </Button>
          <Button
            className="ns-avatar-upload-modal__footer-btn"
            disabled={!selectedFile || isBusy}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </>
      )}

      {isReviewStep && (
        <>
          <Button
            className="ns-avatar-upload-modal__footer-btn"
            variant="outline"
            onClick={handleBackToEdit}
            disabled={isBusy}
          >
            Back
          </Button>
          <Button
            className="ns-avatar-upload-modal__footer-btn"
            disabled={!selectedFile || isBusy}
            onClick={handleUpload}
          >
            {uploadState === "signing"
              ? "Check wallet..."
              : uploadState === "uploading"
                ? "Uploading..."
                : "Sign & Upload"}
          </Button>
        </>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      isDismissDisabled={isBusy}
      footer={footer}
      className="ns-avatar-upload-modal-wrapper"
    >
      <div className="ns-avatar-upload-modal">
        <div className="ns-avatar-upload-modal__heading">
          <Text size="lg" weight="bold">
            {isReviewStep ? "Sign and upload" : "Edit image"}
          </Text>
        </div>

        {error && (
          <Alert variant="error">
            <Text size="sm">{error}</Text>
          </Alert>
        )}

        <div className="ns-avatar-upload-modal__content">
          <div
            className={`ns-avatar-upload-modal__crop-area ${isReviewStep ? "ns-avatar-upload-modal__crop-area--locked" : ""}`}
          >
            {!previewUrl && (
              <div className="ns-avatar-upload-modal__empty-state">
                <Text size="sm" weight="medium">
                  Choose an image to begin
                </Text>
                <Text size="xs" color="grey">
                  JPG, PNG, GIF, or WebP
                </Text>
              </div>
            )}

            {previewUrl && (
              <Cropper
                image={previewUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={nextCrop => {
                  if (!isReviewStep) {
                    setCrop(nextCrop);
                  }
                }}
                onZoomChange={nextZoom => {
                  if (!isReviewStep) {
                    setZoom(nextZoom);
                  }
                }}
                onCropComplete={(_, croppedPixels) => {
                  if (!isReviewStep) {
                    setCroppedAreaPixels(croppedPixels);
                  }
                }}
                cropShape="round"
                showGrid={!isReviewStep}
              />
            )}
          </div>

          <div className="ns-avatar-upload-modal__controls">
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes}
              onChange={e => {
                handleFileSelected(e.target.files?.[0]);
              }}
              className="ns-avatar-upload-modal__file-input"
            />

            {!isReviewStep && (
              <>
                <Button variant="outline" onClick={openFilePicker} disabled={isBusy}>
                  {selectedFile ? "Replace image" : "Choose image"}
                </Button>

                {previewUrl && (
                  <div className="ns-avatar-upload-modal__zoom">
                    <Text size="xs" color="grey">
                      Zoom
                    </Text>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.01}
                      value={zoom}
                      onChange={e => {
                        setZoom(Number(e.target.value));
                      }}
                      disabled={isBusy}
                    />
                  </div>
                )}
              </>
            )}

            {isReviewStep && (
              <div className="ns-avatar-upload-modal__review-note">
                <Text size="sm" color="grey">
                  Ready to sign a wallet message and upload this avatar.
                </Text>
              </div>
            )}

            {uploadState === "signing" && (
              <div className="ns-avatar-upload-modal__status">
                <ShurikenSpinner size={18} />
                <Text size="xs" color="grey">
                  Waiting for signature...
                </Text>
              </div>
            )}

            {uploadState === "uploading" && (
              <div className="ns-avatar-upload-modal__progress">
                <Text size="xs" color="grey">
                  Uploading... {uploadProgress}%
                </Text>
                <ProgressBar progress={uploadProgress} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
