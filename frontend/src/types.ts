export interface IUser {
    username: string;
    email: string;
    avatar: string;
    todolists: ITodolist[];
    friends: string[];
    sentFriendRequests: string[];
    receivedFriendRequests: string[];
}

interface ITodolist {
    owner: string;
    icon: string;
    title: string;
    position: number;
    todos: ITodo[];
    members: IMember[];
}

interface ITodo {
    _id: string;
    todo: string[];
    isCompleted: boolean
}

interface IMember {
    _id: string;
    isAdmin: boolean
}

export interface IaccountInput {
  username: string;
  email: string;
  password: string
}