import BackButton from "../../layout/header/iconButtons/BackButton";
import FriendsButton from "./iconButtons/FriendsButton";
import ProfileButton from "./iconButtons/ProfileButton";
import LogoutButton from "./iconButtons/LogoutButton";
import AddListButton from "./iconButtons/AddListButton";
import ProfileEditButton from "./iconButtons/ProfileEditButton";
import SaveButton from "./iconButtons/SaveButton";

type Props = {
  showBackButton?: boolean
  icons: string[]
};

type IconNode = {
  label: string,
  node: React.ReactNode
}

const iconNodes: IconNode[] = [
  {
    label: 'friends',
    node: <FriendsButton />
  },
  {
    label: 'profile',
    node: <ProfileButton />
  },
  {
    label: 'profileEdit',
    node: <ProfileEditButton />
  },
  {
    label: 'logout',
    node: <LogoutButton />
  },
  {
    label: 'addList',
    node: <AddListButton />
  },
  {
    label: 'addTodo',
    node: <AddListButton />
  },
  {
    label: 'save',
    node: <SaveButton />
  },
]


const Header: React.FC<Props> = (props) => {

  return (
    <div className="flex justify-between items-center space-x-3">
      {
        props.showBackButton &&
        <BackButton />
      }
      <div className="flex items-center ml-auto space-x-3">
        {
          props.icons.map(icon => {
            const matchedIcon = iconNodes.find(node => node.label === icon)
            return (
              <>
                {matchedIcon?.node}
              </>
            )
          })
        }
      </div>
    </div>
  )
}

export default Header;
