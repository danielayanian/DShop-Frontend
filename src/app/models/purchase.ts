export class Purchase {

    id: number = 0;
    idUser: number = 0;
    idProduct: number = 0;
    cantidad: number = 0;
    precioUnidad: number = 0;

    constructor(id: number, idUser: number, idProduct: number, cantidad: number,
        precioUnidad: number){
        this.id = id;
        this.idUser = idUser;
        this.idProduct = idProduct;
        this.cantidad = cantidad;
        this.precioUnidad = precioUnidad;
        
    }

}