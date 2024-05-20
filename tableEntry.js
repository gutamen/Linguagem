class tableEntry{
    constructor(name, type){
        this.name = name;
        this.type = type;
        this.value = null;
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

module.exports = tableEntry;


