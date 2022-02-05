// Bara ein funktión so okkurt er her.
// Allar math funktionir vit brúka, sum ikki eru í JS skulu inn á her.
export function pow(n: number, p: number) : number{
    let res: number;
    res = n;
    while (1 < p) res *= n;
    return res;
}