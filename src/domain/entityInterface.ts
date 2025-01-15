export interface EntityInterface<T> {
    validate(arg1: T): void;
    toPrimitive(): T;
}