
class type{
    constructor(type){
        this.type = type;
    }

    sameName(nameCompare){
        if(this.name === nameCompare)
            return true;
        return false;
    }

    typeOf(){
        return this.type;
    }

}

module.exports = type;

