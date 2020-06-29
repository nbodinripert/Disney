import Company from "./Company"

export default class CompaniesProvider {
    constructor() {
        this.companies = [
            new Company("disney"),
            new Company("pixar"),
            new Company("marvel"),
            new Company("starwars")
        ]
    }
}