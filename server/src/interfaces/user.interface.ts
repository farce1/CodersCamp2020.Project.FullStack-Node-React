interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  address?: Address;
}

export default User;
