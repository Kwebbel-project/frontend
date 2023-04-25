export default interface IFirebaseAuth {
    firebaseSignIn(email: string, password: string): Promise<boolean>;
  }
  