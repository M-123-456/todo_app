import OverviewItem from "../../components/listItem/OverviewItem";
import BackButton from "../../components/ui/buttons/BackButton";
import FriendsButton from "../../components/ui/buttons/FriendsButton";
import LogoutButton from "../../components/ui/buttons/LogoutButton";
import ProfileButton from "../../components/ui/buttons/ProfileButton";
import Header from '../../layouts/Header'

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
  <ProfileButton />, <FriendsButton />, <LogoutButton />
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
