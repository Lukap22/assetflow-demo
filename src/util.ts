export type ValueOf<T> = T[keyof T];

export type RenameByT<T, U> = {
  [K in keyof U as K extends keyof T
    ? T[K] extends string
      ? T[K]
      : never
    : K]: K extends keyof U ? U[K] : never;
};

/**
 * @description This is a utility type that allows you to force every key of an object type.
 * @Param T The object type to force.
 * @Param K The type to force the keys to.
 * @example const FoodInfoUnits: ForceAllKeysInObjectT<FoodInfoT, string>
 */
export type ForceAllKeysInObjectT<T, V> = { [k in keyof T]: V };

export type OptionalStringLiteralT<T extends string> = T | (string & {});

export type HCCompontentDefaultProps<T> = {
  name: keyof T & string;
};
