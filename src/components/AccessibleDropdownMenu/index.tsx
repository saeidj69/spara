import React, { useState, useRef, useEffect } from 'react'

interface MenuItem {
  label: string
  icon?: string
  caption?: string
  isDivider?: boolean
  subMenuItems?: MenuItem[]
}

interface AccessibleDropdownMenuProps {
  items: MenuItem[]
}

const AccessibleDropdownMenu: React.FC<AccessibleDropdownMenuProps> = ({
  items,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const menuListRef = useRef<HTMLUListElement | null>(null)

  const [showSubMenu, setShowSubMenu] = useState<boolean>(false)
  useEffect(() => {
    if (menuOpen && activeIndex !== null && menuListRef.current) {
      const activeElement = menuListRef.current.children[
        activeIndex
      ] as HTMLElement
      activeElement.focus()
    }
  }, [activeIndex, menuOpen])

  useEffect(() => {
    menuButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (menuOpen && menuListRef.current) {
      setActiveIndex(0) // Set focus to the first menu item
      menuListRef.current.focus()
    }
  }, [menuOpen])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setActiveIndex(null)
  }

  const openSubMenu = (index: number) => {
    setActiveIndex(index)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setActiveIndex(null)
    menuButtonRef.current?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleMenu()
    } else if (event.key === 'Escape') {
      closeMenu()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu()
    }
  }
  const handleMenuItemKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    index: number,
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setShowSubMenu(false)
        setActiveIndex((prevIndex) => {
          if (prevIndex === null || prevIndex === items.length - 1) {
            return 0
          }
          return prevIndex + 1
        })
        break
      case 'Escape':
        event.preventDefault()
        closeMenu()
        break
      case 'ArrowUp':
        setShowSubMenu(false)
        event.preventDefault()
        setActiveIndex((prevIndex) => {
          if (prevIndex === null || prevIndex === 0) {
            return items.length - 1
          }
          return prevIndex - 1
        })

        break
      case 'ArrowRight':
        event.preventDefault()
        setShowSubMenu(true)
        const menuItem = items[index]
        if (menuItem.subMenuItems && menuItem.subMenuItems.length > 0) {
          openSubMenu(index)
        }
        break
      case 'ArrowLeft':
        event.preventDefault()
        setShowSubMenu(false)
        if (activeIndex !== null) {
          setActiveIndex(null)
        }
        break
      case 'Tab':
        if (event.shiftKey) {
          // Handle Shift + Tab
          event.preventDefault()
          closeMenu()
        } else {
          // Handle Tab
          if (activeIndex === null || activeIndex === items.length - 1) {
            closeMenu()
          } else {
            setActiveIndex(activeIndex + 1)
          }
        }
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        const clickedMenuItem = items[index]
        if (
          clickedMenuItem.subMenuItems &&
          clickedMenuItem.subMenuItems.length > 0
        ) {
          openSubMenu(index)
        } else {
          // Activate the item and close the menu
        }
        break
      default:
        break
    }
  }
  return (
    <div className="menu" role="menubar">
      <button
        ref={menuButtonRef}
        className="menu-button"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        style={{ width: '300px' }}
      >
        Menu
      </button>
      {menuOpen && (
        <ul
          className="menu-list"
          role="menu"
          ref={menuListRef}
          style={{ width: '300px' }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={item.isDivider ? 'menu-divider' : 'menu-item'}
              role={item.isDivider ? 'separator' : 'menuitem'}
              onKeyDown={(event) => handleMenuItemKeyDown(event, index)}
              tabIndex={activeIndex === index ? 0 : -1}
            >
              {item.icon && <span className="menu-item-icon">{item.icon}</span>}
              {item.subMenuItems && (
                <span className="menu-item-icon" aria-hidden="true">
                  ▶️
                </span>
              )}
              <span className="menu-item-label">{item.label}</span>
              {item.caption && (
                <span className="menu-item-caption">{item.caption}</span>
              )}
              {item.subMenuItems && showSubMenu && activeIndex === index && (
                <ul className="submenu" role="menu">
                  {item.subMenuItems.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="submenu-item"
                      role="menuitem"
                      onKeyDown={(event) =>
                        handleMenuItemKeyDown(event, subIndex)
                      }
                      tabIndex={-1}
                    >
                      {subItem.icon && (
                        <span className="menu-item-icon">{subItem.icon}</span>
                      )}
                      <span className="menu-item-label">{subItem.label}</span>
                      {subItem.caption && (
                        <span className="menu-item-caption">
                          {subItem.caption}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AccessibleDropdownMenu
