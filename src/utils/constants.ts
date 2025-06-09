import type { FilterOption } from "@/types/filters"

export const STATUS_OPTIONS: FilterOption[] = [
  { value: "all", label: "All Status" },
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
]

export const SPECIES_OPTIONS: FilterOption[] = [
  { value: "all", label: "All Species" },
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  { value: "humanoid", label: "Humanoid" },
  { value: "robot", label: "Robot" },
  { value: "cronenberg", label: "Cronenberg" },
  { value: "disease", label: "Disease" },
  { value: "animal", label: "Animal" },
]

export const GENDER_OPTIONS: FilterOption[] = [
  { value: "all", label: "All Genders" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
]
