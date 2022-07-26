import Location from './location';
export interface Box {
    uuid: string;
    name: string;
    source: Location;
    destination: Location;
    contents: string[] | []
    createdAt: string;
    updatedAt: string;
}