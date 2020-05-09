export interface DisplayNode {
  id: number,
  displayName: string,
  tag: number,
  props: State[] | null,
  state: State[] | null,
  children: DisplayNode[] | null,
  parent: string | null,
}

export interface State {
  key: string,
  value: any,
  topComponent: any,
  components: any[],
  type: StateType,
}

type StateType = 'hook' | 'prop' | 'componentState'