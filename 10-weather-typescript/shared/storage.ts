type Value = string | string[];

interface Dictionary {
	[key: string]: Value;
}

export type { Value, Dictionary };