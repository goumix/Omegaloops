export interface UploadProgress {
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  message?: string;
}

export interface UploadResult {
  success: boolean;
  ipfsHash?: string;
  error?: string;
}

class IPFSService {
  private apiKey: string | null = null;
  private apiSecret: string | null = null;
  private jwt: string | null = null;

  constructor() {
    this.initializeConfig();
  }

  private initializeConfig() {
    this.jwt = process.env.NEXT_PUBLIC_PINATA_JWT || null;
    this.apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || null;
    this.apiSecret = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || null;

    if (!this.jwt && (!this.apiKey || !this.apiSecret)) {
      console.warn('Pinata credentials not found in environment variables');
    }
  }

  async uploadFile(
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    if (!this.jwt && (!this.apiKey || !this.apiSecret)) {
      return {
        success: false,
        error: 'Pinata credentials not configured. Please check your environment variables.',
      };
    }

    try {
      // Notify upload start
      onProgress?.({
        progress: 0,
        status: 'uploading',
        message: 'Starting upload...',
      });

      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);

      // Add metadata
      const metadata = {
        name: file.name,
        keyvalues: {
          fileType: file.type,
          fileSize: file.size.toString(),
          uploadedAt: new Date().toISOString(),
        },
      };
      formData.append('pinataMetadata', JSON.stringify(metadata));

      // Update progress
      onProgress?.({
        progress: 25,
        status: 'uploading',
        message: 'Uploading to IPFS...',
      });

      // Prepare headers
      const headers: HeadersInit = {};
      if (this.jwt) {
        headers['Authorization'] = `Bearer ${this.jwt}`;
      } else if (this.apiKey && this.apiSecret) {
        headers['pinata_api_key'] = this.apiKey;
        headers['pinata_secret_api_key'] = this.apiSecret;
      }

      // Upload to Pinata
      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers,
        body: formData,
      });

      // Update progress
      onProgress?.({
        progress: 90,
        status: 'uploading',
        message: 'Finalizing upload...',
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errorData}`);
      }

      const result = await response.json();

      // Verify the upload
      if (result.IpfsHash) {
        onProgress?.({
          progress: 100,
          status: 'completed',
          message: 'Upload completed successfully!',
        });

        return {
          success: true,
          ipfsHash: result.IpfsHash,
        };
      } else {
        throw new Error('No IPFS hash returned from Pinata');
      }

    } catch (error) {
      console.error('IPFS upload failed:', error);

      onProgress?.({
        progress: 0,
        status: 'error',
        message: 'Upload failed. Please try again.',
      });

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown upload error',
      };
    }
  }

  async getFileUrl(ipfsHash: string): Promise<string> {
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  }

  async testConnection(): Promise<boolean> {
    if (!this.jwt && (!this.apiKey || !this.apiSecret)) {
      return false;
    }

    try {
      // Test the connection by trying to get account info
      const headers: HeadersInit = {};
      if (this.jwt) {
        headers['Authorization'] = `Bearer ${this.jwt}`;
      } else if (this.apiKey && this.apiSecret) {
        headers['pinata_api_key'] = this.apiKey;
        headers['pinata_secret_api_key'] = this.apiSecret;
      }

      const response = await fetch('https://api.pinata.cloud/data/testAuthentication', {
        method: 'GET',
        headers,
      });

      return response.ok;
    } catch (error) {
      console.error('Pinata connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const ipfsService = new IPFSService();
