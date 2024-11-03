export interface Description {
    title: string;
    text: string[];
  }
  
  export type Descriptions = Description[];
  
  export type Colors = string[];
  export type Images = string[];
  export type CapacityOptions = string[];
  
  export interface Product {
    id: number; 
    category: string;
    name: string;
    capacity: string;
    priceRegular: number;
    priceDiscount?: number;
    colorsAvailable: Colors;
    color: string;
    images: Images;
    description: Descriptions;
    screen: string;
    resolution: string;
    processor: string;
    ram: string;
    cell: string[];
    namespaceId: string;
    capacityAvailable: CapacityOptions;
    camera?: string;
    zoom?: string;
    numericId?: number;
  }

  export type Products = Product[];

  export interface ProductItem {
    id: number;
    category: string;
    itemId: string;
    name: string;
    fullPrice: number;
    price: number;
    screen: string;
    capacity: string;
    color: string;
    ram: string;
    year: number;
    image: string;
  }
  
  export type ProductItems = ProductItem[];