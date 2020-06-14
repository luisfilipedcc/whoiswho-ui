class UserProfile {
  static getUserSessionStatus() {
    return localStorage.getItem("token") !== null;
  }
}

export default UserProfile;
