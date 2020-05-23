export interface DisplayNode {
  id: number,
  displayName: string,
  displayWeight: number,
  pathWeight: number,
  tag: number,
  type: string,
  name: string,
  props: State[] | null,
  state: State | null,
  children: DisplayNode[] | null,
  parent: DisplayNode | null,
  mediums: DisplayNode[] | null,
}

export interface State {
  key: string,
  value: any,
  topComponent: any,
  components: any[],
  type: StateType,
}

type StateType = 'hook' | 'prop' | 'componentState'