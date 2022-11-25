import OverviewItem from "../../components/todolistApp/overview/OverviewItem";
import FriendsButton from "../../components/todolistApp/shared/layout/header/iconButtons/FriendsButton";
import LogoutButton from "../../components/todolistApp/shared/layout/header/iconButtons/LogoutButton";
import ProfileButton from "../../components/todolistApp/shared/layout/header/iconButtons/ProfileButton";
import Header from '../../components/todolistApp/shared/layout/header/Header'

type Props = {};

const DUMMY_TODOLIST = [
  {
    _id: "1",
    title: "My first todolist",
  },
  {
    _id: "2",
    title: "My second todolist",
  },
  {
    _id: "3",
    title: "My third todolist",
  },
  {
    _id: "4",
    title: "My forth todolist",
  },
];

const icons = [
  'addList', 'profile', 'friends', 'logout'
]

const Overview = (props: Props) => {
  return (
    <>
      <Header 
        showBackButton={true}
        icons={icons}
      />
      <div>
        {/* List Group */}
        <ul className="mt-4 border border-gray-200 rounded bg-white divide-y divide-gray-200">
          {DUMMY_TODOLIST.map((item) => (
            <OverviewItem key={item._id} title={item.title} id={item._id} />
          ))}
        </ul>
        {/* END List Group */}
      </div>
    </>
    
  );
};

export default Overview;
