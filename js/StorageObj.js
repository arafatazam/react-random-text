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
        this.loaded=false;
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

    remove(){
        this.load();
        var data = this.data;
        data.items.splice(data.cursor, 1);
        if(data.cursor>=data.items.length){
            data.cursor = data.items.length-1;
        }
        this.store();
        return this.get();
    }

    get(){
        this.load();
        return this.data.items[this.data.cursor];
    }

    getNext(){
        this.load();
        if(this.data.cursor<0){
            return null;
        }
        var size = this.data.items.length;
        this.data.cursor = (this.data.cursor+1)%size;
        this.store();
        return this.get();
    }

    getPrev(){
        this.load();
        if(this.data.cursor<0){
            return null;
        }
        var size = this.data.items.length;
        this.data.cursor--;
        if(this.data.cursor<0){
            this.data.cursor+=size;
        }
        this.store();
        return this.get();
    }

    destroy(){
        localStorage.removeItem(this.key);
        this.loaded = false;
        this.load();
    }

}

export default StorageObj;