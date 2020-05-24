export interface DisplayNode {
  id: number,
  displayName: string,
  displayWeight: number,
  pathWeight: number,
  tag: number,
  type: string,
  name: string,
  props: Prop[] | null,
  state: Prop | null,
  children: DisplayNode[] | null,
  parent: DisplayNode | null,
  mediums: DisplayNode[] | null,
}

export interface Prop {
  key: string,
  value: any,
  type: StateType,
}

type StateType = 'hook' | 'prop' | 'componentState'