export interface IBuilding {
  structureId: number;
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
  'Mixed',
  'Commercial',
  'Institution',
  'Religious',
  'Private Offices',
  'Store/Godown',
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
