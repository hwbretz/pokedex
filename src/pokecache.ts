export type CacheEntry<T> = {
    createdAt: number,
    val: T,
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key:string, val:T) {
        let newCacheEntry: CacheEntry<T> = {
            createdAt: Date.now(),
            val:val,
        }
        this.#cache.set(key,newCacheEntry);
    };
    
    get<T>(key:string){
        return this.#cache.get(key)?.val;
    }

    #reap(){
        const timesUp = Date.now() - this.#interval;
        this.#cache.forEach((entry, key) => {
            if(entry.createdAt <= timesUp){
                this.#cache.delete(key);
                
            }
        });
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    };
    
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    };

}

