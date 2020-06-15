import type { PropsType as PagePropsType } from '@vlsergey/react-bootstrap-pagination';

export type ItemType = any;

type PaginationResult = {
  components : any,
  offset : number,
  page : number,
  pageItems : ItemType[],
  size : number,
};

export type PropsType = {
  children : PaginationResult => any,
  defaultPage : number,
  defaultSize : number,
  items : ItemType[],
  pageProps : $Shape< PagePropsType >,
  sizeProps : {
    options : number[],
  },
};
