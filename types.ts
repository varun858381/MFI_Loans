
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum OnboardingStatus {
  PRE_SCREENING = 'PRE_SCREENING',
  KYC_PENDING = 'KYC_PENDING',
  VCIP_PENDING = 'VCIP_PENDING',
  REVIEW_REQUIRED = 'REVIEW_REQUIRED',
  COMPLETED = 'COMPLETED'
}

export interface Customer {
  id: string;
  type: 'INDIVIDUAL' | 'LEGAL_ENTITY';
  pan: string;
  name: string;
  kin?: string; // CKYCR KIN
  riskRating: RiskLevel;
  status: OnboardingStatus;
  onboardedDate: string;
  income?: number;
  occupation?: string;
}

export interface LoanApplication {
  id: string;
  customerId: string;
  amount: number;
  tenor: number;
  interestRate: number;
  apr: number;
  status: 'APPLIED' | 'SANCTIONED' | 'DISBURSED' | 'REJECTED';
  kfsGenerated: boolean;
}

export interface AMLAlert {
  id: string;
  customerId: string;
  type: 'CTR' | 'STR' | 'NTR';
  amount: number;
  timestamp: string;
  description: string;
  status: 'OPEN' | 'INVESTIGATING' | 'REPORTED' | 'CLOSED';
}
