export enum ProductCategoryTypes{
    Lamp="Lamp"
}

export interface IProduct {
    id: string;
    title: string;
    descriptions: string;
    body: string;
    category: ProductCategoryTypes;
    approved: boolean;
}

export interface IEditProduct extends IProduct {


}

export interface IProductImages {
    productId: string
    compressedImages:string[]
}