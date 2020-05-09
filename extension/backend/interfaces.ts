export interface DisplayNode {
  id: number,
  displayName: string,
  tag: number,
  props: State[] | null,
  state: State[] | null,
  children: DisplayNode[] | null,
}

export interface State {
  key: string,
  value: any,
  topComponent: any,
  components: any[],
}