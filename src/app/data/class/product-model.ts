export class ProductModel {
    idProduct: string;
    nameProduct: string;
    adresseProduct: string;
    nameOffical: string;
    numberProduct: number;
    unitProduct: string;
    priceProduct: number;
    datePayProduct: Date;
    hadPaidProduct: boolean;
    descriptProduct: string;
    unitPriceType = '1';
    equivalenceValue = 1;

    get validity(): boolean {
        return this.nameProduct != null
            && this.numberProduct != null
            && this.unitProduct != null
            && this.priceProduct != null
            && this.datePayProduct != null
            && this.totalPrice != null;
    }

    get totalPrice(): number {
        if (this.priceProduct && this.numberProduct && this.equivalenceValue) {
            return parseFloat((this.priceProduct
                * this.numberProduct * this.equivalenceValue).toFixed(2));
        }
        else {
            return 0;
        }
    }

    set totalPrice(value){
        this.totalPrice = value;
    }
}
