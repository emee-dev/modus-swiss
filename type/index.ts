export interface UploadCareOnChangeEvent {
  progress: number;
  errors: string[]; // Adjust the type if errors have more structure
  group: string | null;
  totalCount: number;
  failedCount: number;
  successCount: number;
  uploadingCount: number;
  status: "success" | "failed" | "uploading" | "idle";
  isSuccess: boolean;
  isUploading: boolean;
  isFailed: boolean;
  allEntries: FileEntry[];
  successEntries: FileEntry[];
  failedEntries: FileEntry[];
  uploadingEntries: FileEntry[];
  idleEntries: FileEntry[];
}

interface FileEntry {
  uuid: string;
  internalId: string;
  name: string;
  size: number;
  isImage: boolean;
  mimeType: string;
  file: Record<string, any>;
  externalUrl: string | null;
  cdnUrlModifiers: string;
  cdnUrl: string;
  fullPath: string | null;
  uploadProgress: number;
  fileInfo: FileInfo;
  metadata: Record<string, any>;
  isSuccess: boolean;
  isUploading: boolean;
  isFailed: boolean;
  isRemoved: boolean;
  errors: string[]; // Adjust if errors have more structure
  status: "success" | "failed" | "uploading" | "idle";
  source: "local" | "remote"; // Adjust if more sources exist
}

interface FileInfo {
  uuid: string;
  name: string;
  size: number;
  isStored: boolean;
  isImage: boolean;
  mimeType: string;
  cdnUrl: string;
  s3Url: string | null;
  originalFilename: string;
  imageInfo: ImageInfo | null;
  videoInfo: VideoInfo | null;
  contentInfo: ContentInfo;
  metadata: Record<string, any>;
  s3Bucket: string | null;
  defaultEffects: any | null;
}

interface ImageInfo {
  dpi: number | null;
  width: number;
  format: string;
  height: number;
  sequence: boolean;
  colorMode: string;
  orientation: string | null;
  geoLocation: string | null;
  datetimeOriginal: string | null;
}

interface VideoInfo {
  // Add appropriate fields if applicable
}

interface ContentInfo {
  mime: {
    mime: string;
    type: string;
    subtype: string;
  };
  image: ImageInfo;
}
