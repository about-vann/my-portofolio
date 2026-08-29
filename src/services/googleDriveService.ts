export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  iconLink?: string;
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  owners?: Array<{
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  }>;
  shared?: boolean;
  trashed?: boolean;
}

export interface DriveQuota {
  limit?: string;
  usage?: string;
  usageInDrive?: string;
  usageInDriveTrash?: string;
  user?: {
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  };
}

const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_BASE = 'https://www.googleapis.com/upload/drive/v3';

/**
 * Fetch Google Drive storage quota and user profile info
 */
export async function fetchDriveAbout(accessToken: string): Promise<DriveQuota> {
  const response = await fetch(`${DRIVE_API_BASE}/about?fields=user,storageQuota`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch Drive about: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    limit: data.storageQuota?.limit,
    usage: data.storageQuota?.usage,
    usageInDrive: data.storageQuota?.usageInDrive,
    usageInDriveTrash: data.storageQuota?.usageInDriveTrash,
    user: data.user,
  };
}

/**
 * List files from Google Drive
 */
export async function listDriveFiles(
  accessToken: string,
  options?: {
    pageSize?: number;
    query?: string;
    pageToken?: string;
    orderBy?: string;
  }
): Promise<{ files: DriveFile[]; nextPageToken?: string }> {
  const params = new URLSearchParams();
  params.set('pageSize', String(options?.pageSize || 25));
  params.set(
    'fields',
    'nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime, iconLink, thumbnailLink, webViewLink, webContentLink, owners, shared, trashed)'
  );
  params.set('orderBy', options?.orderBy || 'modifiedTime desc');

  let q = "trashed = false";
  if (options?.query && options.query.trim() !== '') {
    const escapedQuery = options.query.replace(/'/g, "\\'");
    q += ` and (name contains '${escapedQuery}')`;
  }
  params.set('q', q);

  if (options?.pageToken) {
    params.set('pageToken', options.pageToken);
  }

  const response = await fetch(`${DRIVE_API_BASE}/files?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to list files: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    files: data.files || [],
    nextPageToken: data.nextPageToken,
  };
}

/**
 * Upload a File object to Google Drive (Multipart upload)
 */
export async function uploadFileToDrive(
  accessToken: string,
  file: File | Blob,
  fileName: string,
  mimeType: string,
  parentFolderId?: string
): Promise<DriveFile> {
  const metadata: any = {
    name: fileName,
    mimeType: mimeType || 'application/octet-stream',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const reader = new FileReader();
  const fileDataPromise = new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

  const arrayBuffer = await fileDataPromise;
  const metadataString = JSON.stringify(metadata);

  const multipartHeader = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${metadataString}${delimiter}Content-Type: ${mimeType}\r\nContent-Transfer-Encoding: base64\r\n\r\n`;

  // Convert arrayBuffer to base64
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64Data = btoa(binary);

  const multipartBody = multipartHeader + base64Data + closeDelimiter;

  const response = await fetch(
    `${DRIVE_UPLOAD_BASE}/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,webContentLink,modifiedTime`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartBody,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to upload file: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Create a new folder in Google Drive
 */
export async function createDriveFolder(
  accessToken: string,
  folderName: string,
  parentFolderId?: string
): Promise<DriveFile> {
  const metadata: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const response = await fetch(`${DRIVE_API_BASE}/files?fields=id,name,mimeType,webViewLink`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create folder: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Delete a file or folder from Google Drive
 * NOTE: MUST only be called after explicit user confirmation dialog in the UI!
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<boolean> {
  const response = await fetch(`${DRIVE_API_BASE}/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to delete file: ${response.statusText}`);
  }

  return true;
}

/**
 * Helper to format byte counts into human-readable strings
 */
export function formatBytes(bytes?: string | number, decimals = 1): string {
  if (!bytes) return '0 B';
  const b = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(b) || b === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(b) / Math.log(k));
  return `${parseFloat((b / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
