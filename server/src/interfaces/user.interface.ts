interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  address?: Address;
  status: String;
  confirmationCode: String;
}

export default User;
