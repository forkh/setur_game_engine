class ObjectID {
    public static COMPONENTID: number = 0;

    public static NEWCOMPONENT(): number {
        ObjectID.COMPONENTID++;
        return ObjectID.COMPONENTID - 1;
    }
}

export {ObjectID};