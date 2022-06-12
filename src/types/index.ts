
// item todo type
export type Item = {
  id: number,
  done: boolean,
  name: string
}

// instance of enum 
export type DisplayMode = EDisplayMode

// display mode enum
export enum EDisplayMode {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}