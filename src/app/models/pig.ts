export interface ISuino {
    id: string,
    animalTag: string;
    fatherTag: string;
    motherTag: string;
    birthDate: string;
    departureDate: string;
    status: 'Ativo' | 'Vendido' | 'Morto';
    sex: 'M' | 'F';
}