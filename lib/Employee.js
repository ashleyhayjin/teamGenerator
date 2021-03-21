class Employee {
    constructor(name, id, email, typeOfRole){
        this.name = name;
        this.id = id;
        this.email = email;
        this.typeOfRole = typeOfRole;
    }

    getName(){
        return this.name;
    };
    getId(){
        return this.id;
    };
    getEmail(){
        return this.email;
    };
    getRole(){
        return 'Employee';
    };
}

module.exports = Employee;