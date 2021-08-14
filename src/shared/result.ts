export class Result {
    message: string;

    static FromMessage(message: string): Result {
        return {
            message,
        };
    }
}

export class ResultWithObject<T> {
    obj: T;
    message: String;

    static FromMessage<Type>(message: string, obj: Type) : ResultWithObject<Type> {
        return {
            obj,
            message,
        }
    }
}
