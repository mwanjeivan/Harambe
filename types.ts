
export enum CampaignType {
  WEDDING = 'Wedding',
  FUNERAL = 'Funeral',
  EDUCATION = 'Education',
  COMMUNITY = 'Community',
  MEDICAL = 'Medical'
}

export enum PaymentStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  PLEDGED = 'Pledged'
}

export interface MaterialItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  delivered: number;
}

export interface Contributor {
  id: string;
  name: string;
  amount: number;
  status: PaymentStatus;
  date: string;
  phone: string;
  relationship: string;
  photo?: string;
  materialEmoji?: string;
  isDelivered?: boolean;
}

export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  donor: string;
  image: string;
  endTime: string;
  emoji: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  type: CampaignType;
  goal: number;
  raised: number;
  pledged: number;
  deadline: string;
  organizer: string;
  image: string;
  isPublic: boolean;
  location?: {
    lat: number;
    lng: number;
    distance?: number;
  };
  materialPledges?: MaterialItem[];
  contributors?: Contributor[];
}

// Fix: Added tags property to Vendor interface to resolve type errors in CommunityHub.tsx
export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  priceRange: string;
  image: string;
  description: string;
  tags?: string[];
}

export interface User {
  name: string;
  role: 'organizer' | 'contributor' | 'vendor';
  balance: number;
}
