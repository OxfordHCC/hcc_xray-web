type ConfigParamSpec = {
	parseFn?: Function,
	env?: string,
	defaultValue?: unknown,
}

export type ConfigSpec <T> = {
	[index in keyof T]: ConfigParamSpec
}

type ReadConfigParamResult<T>= {
	name: keyof T,
	value: T[keyof T],
}

type ReadConfigResult<T> = {
	[index in keyof T]: T[index]
}

function nonNull(x: any): boolean{
	if(x === undefined){
		return false;
	}

	if(x === null){
		return false;
	}

	if(isNaN(x)){
		return false;
	}

	return true;
}

function parseParamValue(spec: ConfigParamSpec){
	const defaultVal = spec.defaultValue;
	const envVal = process.env[spec.env];

	if(nonNull(envVal)){
		return spec.parseFn.call(undefined, envVal);
	}

	return defaultVal;
}

function readConfigParam<T>(name: keyof T, spec: ConfigParamSpec): ReadConfigParamResult<T> {
	const value = parseParamValue(spec);

	return { name, value };
}

function entries<T>(obj: T): [keyof T, any][]{
	return Object.entries(obj) as [keyof T, any];
}

export function readConfig<T>(spec: ConfigSpec<T>): ReadConfigResult<T>{
	return entries(spec)
	.map(([name, spec]) => readConfigParam<T>(name, spec))
	.reduce((acc, curr) => {
		acc[curr.name] = curr.value;
		return acc;
	}, {} as ReadConfigResult<T>);
}
