export interface IBuilding {
  buildingFeatureId: number;
  isLocked: string;
  existancyStatus: string;
  associativePosition: string;
  ownership: string;
  floors: string;
  jamthog: string;
  basement: string;
  use: string;
  age: string;
  rennovation: string;
  rennovationRemarks: string;
  style: string;
  type: string;
  material: string;
  roofType: string;
  roofMaterial: string;
  toiletMode: string;
  toiletType: string;
  roadAccess: string;
  parking: string;
  remarks: string;
}

export interface IUnit {
  id: number;
  buildingFeatureId: number | null;
  isLocked: string | null;
  use: string | null;
  number: string | null;
  floorLevel: string | null;
  bedrooms: number | null;
  ownership: string | null;
  rent: number | null;

  businessName: string | null;
  businessType: string | null;
  businessContact: number | null;
  businessTurnover: string | null;

  institutionName: string | null;
  institutionEstablishmentYear: string | null;
  institutionStaffs: number | null;
  institutionStudents: number | null;
  institutionContact: number | null;

  religiousInstitionName: string | null;
  religiousInstituionEstablishmentYear: string | null;
  religiousInstitutionMonks: number | null;
  religiousInstitutionLopons: number | null;
  religiousInstitutionContact: number | null;

  officeName: string | null;
  officeType: string | null;
  officeEstablishmentYear: string | null;
  officeContact: number | null;

  remarks: string | null;
}

export interface IHousehold {
  buildingFeatureId: number;
  unitId: number;
  zhisar: string;
  zhisarFrom: string;

  membersStayingOut: number;
  membersStayingIn: number;
  khimsaAcres: number;
  kamzhingAcres: number;
  chhuzhingAcres: number;
  yaks: number;
  cows: number;
  horses: number;
  poultry: number;
  vehicles: number;

  tv: string;
  mobile: string;
  lpg: string;
  electricUtensils: string;

  foodCrops: string;
  cashCrops: string;
  incomeSource: string;
  annualIncomeRange: string;
}

export interface IMember {
  householdId: number;
  unitId: number;

  name: string;
  age: number;
  gender: string;
  occupation: string;
  workplace: string;
  travelMode: string;
  educationLevel: string;
}

export const ExistancyStatus: String[] = [
  'Standing',
  'Under Construction',
  'Abandoned/Gungtong',
];

export const AssociativePositions: String[] = [
  'Primary/Main',
  'Secondary/Ancillary',
];
export const OwnerShipTypes: String[] = ['Single', 'Joint'];

export const BuildingHeights: String[] = [
  'G',
  'G+1',
  'G+2',
  'G+3',
  'G+4',
  'G+5',
  'G+6',
];
export const YesNoOptions: String[] = ['Yes', 'No'];
export const ParkingOptions: String[] = ['Designated', 'Onsite'];

export const BuildingUse: String[] = [
  'Residential',
  'Mixed Uses',
  'Commercial',
  'Institution',
  'Religious',
  'Services',
  'Store',
  'Garage',
  'Cowshed',
  'Temporary Camp',
  'Toilet',
  'Kitchen',
  'Others',
];

export const AgeOfStructure: String[] = [
  'Less than Five Years',
  '5-10 Years',
  '10-20 Years',
  '20-30 Years',
  '30-40 Years',
  '50-100 Years',
  'More than 100 Years',
];

export const BuildingStyles: String[] = [
  'Contemporary',
  'Traditional',
  'Composite',
];
export const StructureType: String[] = ['Load Bearing', 'Framed', 'Composite'];

export const PrimaryStructureMaterials: String[] = [
  'Stone Masonry',
  'Rammed Earth',
  'RCC',
  'Ekra',
  'Others(CGI,Ply,Shingles)',
];

export const RoofTypes: String[] = ['Hipped', 'Gable', 'Composite'];

export const RoofMaterials: String[] = ['CGI', 'Shingles', 'Slates', 'Others'];

export const ToiletModes: String[] = ['Attached', 'Detached'];

export const ToiletTypes: String[] = ['Pit Latrine', 'Flush', 'Others'];

//plots
export const DevelopmentStatuses: String[] = [
  'Developed',
  'Undeveloped',
  'Under Development',
  'UnderDeveloped',
];
export const PlotUses: String[] = [
  'Residential',
  'Mixed Uses',
  'Commercial',
  'Wetlands',
  'Kamzhing',
  'Open Spaces',
  'Institutional',
  'Services',
  'Recreational',
];

// /units

export const UnitNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const BedRooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const UnitUses: String[] = [
  'Residential',
  'Commercial',
  'Institution',
  'Religious',
  'Private Office',
  'Store/Godown',
  'Other Ancillary Uses',
];

export const UnitOwnershipTypes: String[] = ['Owned', 'Rented'];
export const BusinessType: String[] = [
  'Grocery',
  'Hotel/Restaurant',
  'Lodging',
  'Office',
  'Garment',
  'Hardware',
  'Others',
];

export const BusinessTurnOvers: String[] = [
  '0-1 Lakh',
  '1-2 Lakh',
  '3-4 Lakh',
  '4-5 Lakh',
  '5-10 Lakh',
  '10-15 Lakh',
  'More than 15 Lakh',
];

export const Genders: String[] = ['Male', 'Female', 'Others'];
export const Occupations: String[] = [
  'Student',
  'Civil Servant',
  'Coporate Employee',
  'Private Employee',
  'Business',
  'Farmer/Unemployed',
];
export const EducationLevels: String[] = [
  'None',
  'Zhiten Sheyoen',
  'Monk/Buddhist Studies',
  'Primary',
  'Secondary',
  'Class 10',
  'Class 12',
  'Graduate',
  'Masters',
];

export const TravelModes: String[] = ['Private Car', 'Taxi', 'Bus', 'Walk'];
