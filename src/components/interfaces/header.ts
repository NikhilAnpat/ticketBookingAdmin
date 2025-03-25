export interface HeaderProps {
  toggleSidebar?: () => void;
  onSearch?: (query: string) => void;
  showSearch?: boolean; // Add this new prop
}