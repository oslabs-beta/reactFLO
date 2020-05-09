export interface DisplayNode {
  id: number,
  displayName: string,
  props: State[] | null,
  state: State[] | null,
  children: DisplayNode[] | null,
  tag: number,
}

export interface State {
  key: string,
  value: any,
  topComponent: any,
  components: any[],
}