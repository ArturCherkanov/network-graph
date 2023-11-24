export type GraphType = {
  links: LinkItemType[]
  nodes: NodeItemType[]
}

export type LinkItemType = {
  name: string;
  source: number;
  target: number;
  arrows?: boolean;
  type?: null;
  share?: null;
}

export type NodeItemType = {
  id: number,
  name: string,
  type: string
}
