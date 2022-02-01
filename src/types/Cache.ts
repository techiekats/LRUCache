import { Entry } from "./Entry";

export default class Cache {   
    /**
     *
     */
    private map: Map<string, Entry> = new Map<string, Entry> ();
    private generation = 0;
    private maxCount = 0;
    constructor(maxCount:number) {       
        //TODO: make it a singleton
        this.maxCount = maxCount;
    }
    public write(key:string, value: string) {
        this.generation++;
        if (this.map.has(key))        {
            this.map.set(key, {entry: value, generation: this.generation});        
        }
        else {
            const currentCount = this.getCount();
            if (currentCount == this.maxCount) {
                //TODO: delete the LRU
                let minGeneration = Number.MAX_SAFE_INTEGER;
                let minKey = '';
                this.map.forEach((v:Entry, k:string) => {
                    if (v.generation < minGeneration) {
                        minGeneration = v.generation;
                        minKey = k;    
                    }
                });
                this.map.delete(minKey)
            }
            this.map.set(key, {entry: value, generation: this.generation}); 
        }
    }
    public read (key:string) : string | undefined {
        this.generation++;
        let entry = this.map.get(key);
        if (!!entry) {
            entry.generation = this.generation;
        }
        return entry?.entry;
    }

    public delete (key:string) {
        this.map.delete(key);
    }
    public getCount () : number {        
        return this.map.size;
    }
    public clear () {
        this.map.clear();
    }

    public toHash () {
        return this.map;
    }
}