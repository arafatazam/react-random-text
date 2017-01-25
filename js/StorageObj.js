// To save to and load from local storage

class StorageObj{

    constructor(){
        this.key='hakunamatata3210';
        this.max = 5;
        this.loaded = false;
    }

    getDefaultData(){
        return {
            cursor: null,
            items: []
        };
    }

    store(){
        localStorage.setItem(this.key, JSON.stringify(this.data));
    }

    load(){
        if(this.loaded){
            return;
        }
        this.data = JSON.parse(localStorage.getItem(this.key));
        if(!this.data){
            this.data=this.getDefaultData();
            this.store();
        }
        this.loaded = true;
    }

    put(obj){
        this.load();
        this.data.items.push(obj);
        while(this.data.items.length>this.max){
            this.data.items.shift();
        }
        this.data.cursor = this.data.items.length-1;
        this.store();
    }

    get(){
        this.load();
        if(this.data.cursor==null){
            return null;
        }
        return this.data.items[this.data.cursor];
        this.store();
    }

    getNext(){
        this.load();
        if(!this.data.cursor){
            return null;
        }
        this.data.cursor = (this.data.cursor+1)%this.max;
        return this.get();
    }

    destroy(){
        localStorage.removeItem(this.key);
        this.loaded = false;
        this.load();
    }

}

export default StorageObj;