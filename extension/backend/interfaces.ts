export interface FiberNode {
  id: number,
  displayName: string,
  props: State[] | null,
  state: State[] | null,
  children: FiberNode[] | null,
}

export interface State {
  key: string,
  value: any,
  topComponent: any,
  components: any[],
}