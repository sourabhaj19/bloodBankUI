import { Params, QueryParamsHandling } from "@angular/router";
export declare class NbMenuItems {
  title: string;
  link?: string;
  url?: string;
  icon?: string;
  expanded?: boolean;
  badge?: any;
  children?: NbMenuItems[];
  target?: string;
  hidden?: boolean;
  pathMatch?: "full" | "prefix";
  home?: boolean;
  group?: boolean;
  skipLocationChange?: boolean;
  queryParams?: Params;
  queryParamsHandling?: QueryParamsHandling;
  parent?: NbMenuItems;
  selected?: boolean;
  data?: any;
  fragment?: string;
  preserveFragment?: boolean;
  ariaRole?: string;
  afterLogin?: boolean;
  role?: any;
  static getParents(item: NbMenuItems): NbMenuItems[];
  static isParent(item: NbMenuItems, possibleChild: NbMenuItems): boolean;
}

export const MENU_ITEMS: NbMenuItems[] = [
  //Display Role inside side menu
  { title: 'Find Blood', link: '/find-blood', icon: 'search' , afterLogin: true },
  { title: 'Your Donates', link: '#about', icon: 'gift', afterLogin: true  },
  { title: 'Home', link: '/', icon: 'home', afterLogin: false  },
  { title: 'About Us', link: '#about', icon: 'info', afterLogin: false  },
  { title: 'Contact Us', link: '#contact', icon: 'phone', afterLogin: false  },

];

