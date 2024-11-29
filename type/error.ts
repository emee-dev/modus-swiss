export interface UploadCareUploadError {
  uuid: string | null;
  internalId: string;
  name: string;
  size: number;
  isImage: boolean;
  mimeType: string;
  file: Record<string, unknown>;
  externalUrl: string | null;
  cdnUrlModifiers: string | null;
  cdnUrl: string | null;
  fullPath: string | null;
  uploadProgress: number;
  fileInfo: FileInfo | null;
  metadata: Record<string, unknown> | null;
  isSuccess: boolean;
  isUploading: boolean;
  isFailed: boolean;
  isRemoved: boolean;
  errors: FileUploadError[];
  status: "idle" | "failed" | "success";
  source: "local" | "remote";
}

interface FileInfo {
  uuid: string | null;
  name: string;
  size: number;
  isStored: boolean;
  isImage: boolean;
  mimeType: string;
  cdnUrl: string | null;
  originalFilename: string;
}

interface FileUploadError {
  type: "NETWORK_ERROR" | string;
  message: string;
  payload: ErrorPayload;
}

interface ErrorPayload {
  entry: Partial<UploadCareUploadError>;
  error: {
    originalProgressEvent: {
      isTrusted: boolean;
    };
    name: string;
    message: string;
  };
}
