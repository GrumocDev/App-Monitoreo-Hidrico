interface VariableHistograma {
  bins: number[]
  frecuencias: number[]
}

interface NodoHistograma {
  [nombreVariable: string]: VariableHistograma
}

interface HistogramaResponse {
  [nodoId: string]: NodoHistograma
}
