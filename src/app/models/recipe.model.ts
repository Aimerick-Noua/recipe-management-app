export class Recipes {
    constructor(public id: string,public name: string, public category: string, public imageUrl: string, public ingredients: string[], public createdOn: Date, public description: string,public isFavorite:boolean) { }
}