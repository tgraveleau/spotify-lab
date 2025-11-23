type BuildRange<
  Min extends number,
  Max extends number,
  Acc extends number[] = [],
> = Acc['length'] extends Max
  ? [...Acc, Max][number] extends infer R
    ? R extends number
      ? R extends Min | Exclude<R, Min>
        ? R
        : never
      : never
    : never
  : BuildRange<Min, Max, [...Acc, Acc['length']]>

export type NumberRange<Min extends number, Max extends number> =
  | Exclude<BuildRange<0, Max>, BuildRange<0, Min>>
  | Min
