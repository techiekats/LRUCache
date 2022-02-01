import cache from "../types/Cache";

test ('add a key to cache', ()=> {
    const c = new cache(5);
    c.write('company', 'shopify');
    expect(c.read('company')).toBe('shopify');
});
test ('check count for cache', ()=> {
    const c = new cache(10);
    c.write('company', 'shopify');
    c.write('company', 'morningstar');
    c.write('location', 'chicago');
    expect(c.read('company')).toBe('morningstar');
    expect(c.getCount()).toBe(2);    
});

test ('entry gets deleted', ()=> {
    const c = new cache(2);
    c.write('company', 'shopify');
    c.write('company', 'morningstar');
    c.write('location', 'chicago');
    c.write('vehicle', 'train'); 
    expect(c.read('company')).toBe(undefined);
    expect(c.getCount()).toBe(2);    
});

test ('entry gets deleted based on read recency', ()=> {
    const c = new cache(2);
    c.write('company', 'shopify');
    c.write('company', 'morningstar');
    c.write('location', 'chicago');
    c.read('company');    
    c.write('vehicle', 'train'); 
    expect(c.read('company')).toBe('morningstar');
    expect(c.read('location')).toBe(undefined);
    expect(c.getCount()).toBe(2);    
});