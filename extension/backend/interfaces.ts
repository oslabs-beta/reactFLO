export interface DisplayNode {
  id: number,
  displayName: string,
  tag: number,
  type: any,
  props: State[] | null,
  state: State | null,
  children: DisplayNode[] | null,
  parent: DisplayNode | null,
}

export interface State {
  key: string,
  value: any,
  topComponent: any,
  components: any[],
  type: StateType,
}

type StateType = 'hook' | 'prop' | 'componentState'