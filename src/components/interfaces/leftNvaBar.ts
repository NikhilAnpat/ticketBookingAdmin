export interface NavItemProps {
  icon: React.ElementType;
  text: string;
  to: string;
  onClick: () => void;
}

export interface LeftNavProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  }