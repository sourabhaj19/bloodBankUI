export function getFilteredMenu(userRole: string | null) {
  return MENU_ITEMS.filter(item =>
    item.role.includes(userRole || 'PUBLIC')
  );
}

export const MENU_ITEMS = [
  { title: 'Dashboard', link: '/dashboard', icon: 'dashboard', role: ['ROLE_USER'] },
  { title: 'Find Blood', link: '/find-blood', icon: 'search', role: ['ROLE_USER'] },
  { title: 'Users', link: '/users', icon: 'user', role: ['ROLE_ADMIN'] },
  { title: 'Your Donates', link: '/your-donates', icon: 'dashboard', role: ['ROLE_USER'] },
  {
    title: 'Masters', icon: 'gift', role: ['ROLE_ADMIN'],
    childrens: [
      { title: 'Countries', link: '/countries', icon: 'user', role: ['ROLE_ADMIN'] },
      { title: 'States', link: '/states', icon: 'bank', role: ['ROLE_ADMIN'] },
      { title: 'Cities', link: '/cities', icon: 'bank', role: ['ROLE_ADMIN'] }
    ]
  },
];
