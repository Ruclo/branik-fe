export enum BeerType {
    LEZAK_10 = "10° ležák",
    VYCEPNI_10 = "10° výčepní",
    LEZAK_11 = "11° ležák"
}

export enum ContainerType {
    GLASS = "glass",
    PET = "pet",
    CAN = "can"
}

export interface Beer {
    type: BeerType;
    container: ContainerType;
    volume_l: number;
    price_czk: number;
    units: number;
    price_per_liter: number;
}

export interface StoreListing {
    store: string;
    beers: Beer[];
}

export type ListingsResponse = StoreListing[];