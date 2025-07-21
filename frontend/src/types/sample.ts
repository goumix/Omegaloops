export interface Sample {
  id?: number;
  artist: string;
  title: string;
  category: string;
  description: string;
  numberOfCopies: number;
  priceNft: number;
  ipfsHash?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}
