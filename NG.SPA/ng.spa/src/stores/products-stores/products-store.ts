import { makeAutoObservable, observable, runInAction } from "mobx";
import { IProduct } from "../../models/employee-activities-models/employee-activities-model";

class ProductsStore {
    productsMap: Record<string, IProduct> = observable.object({});
    productsImagesMap: Record<string, string[]> = observable.object({});

    productsLoading: boolean = false;
    error: string | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    get products() {
        return Object.values(this.productsMap) || [];
    }

    loadProducts = async () => {
        if (this.productsLoading) {
            return;
        }

        runInAction(() => {
            this.productsLoading = true;
            this.error = null;
        });

        try {

        }
        catch (error) {
            console.error('Error loading products', error);
            runInAction(() => {
                this.error = error instanceof Error ? error.message : String(error);
            });
        }
        finally {
            runInAction(() => {
                this.productsLoading = false;
            });
        }
    }
}

export default new ProductsStore();