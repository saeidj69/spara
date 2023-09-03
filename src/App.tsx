
import './App.css'
import AccessibleDropdownMenu from './components/AccessibleDropdownMenu';
function App() {
  interface MenuItem {
    label: string;
    icon?: string;
    caption?: string;
    isDivider?: boolean;
    subMenuItems?: MenuItem[];
  }
  const menuItems: MenuItem[] = [
    {
      label: 'Item 1',
      icon: '📁',
      caption: 'Caption for Item 1 ',
      subMenuItems: [
        { label: 'Sub Item 1', caption: 'Caption for Sub Item 1' },
        { label: 'Sub Item 2', caption: 'Caption for Sub Item 2' },
      ],
    },
    
    { label: 'Item 2', icon: '📁', caption: 'Caption for Item 2' },
    {
      label: 'Item 3',
      icon: '📁',
      caption: 'Caption for Item 3',
      subMenuItems: [
        { label: 'Sub Item 3', caption: 'Caption for Sub Item 3' },
        { label: 'Sub Item 4', caption: 'Caption for Sub Item 4' },
      ],
    },
  ];
  return (
    <>
      <AccessibleDropdownMenu items={menuItems} />
    </>
  )
}

export default App
