
export type Either<E,T> = E | T;

export function eitherify<E,T>(fn: Function): Function{
	return async function newFn(...args: any[]): Promise<Either<E, T>>{
		try {
			return await fn.apply(undefined, args);
		} catch (err: unknown) {
			return err;
		}
	}
}
