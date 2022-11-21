
type Props = {
  children: React.ReactNode;
  color?: string,
  size?: string,
  onClick?: () => void;
};

const IconButton:React.FC<Props> = ({ children, color, size, onClick }) => {
  return (
    <button className={`${size} ${color} hover:scale-150 transition-transform duration-300`} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton