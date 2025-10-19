interface AutocorrelacionVariable {
  labels: string[]
  ticks: number[]
}

interface AutocorrelacionResponse {
  [variable: string]: AutocorrelacionVariable
}

export type {
  AutocorrelacionResponse,
  AutocorrelacionVariable
}
