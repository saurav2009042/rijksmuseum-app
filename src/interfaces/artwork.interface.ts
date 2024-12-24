interface IImage {
    guid: string;
    height: number;
    offsetPercentageX: number;
    offsetPercentageY: number;
    url: string;
    width: number;
};

export interface IArtworkResponse {
    hasImage: boolean;
    headerImage: IImage;
    id: string;
    links: {
        self: string;
        web: string;
    };
    longTitle: string;
    objectNumber: string;
    permitDownload: boolean;
    principalOrFirstMaker: string;
    productionPlaces: Array<string>;
    showImage: boolean;
    title: string;
    webImage: IImage;
};

export type IArtworkResponseWithImages = IArtworkResponse & {
    imageUrl: string;
};