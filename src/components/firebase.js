import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyChXsUW8fe2zWhWgbCCP9srr-ARNxwNYKQ",
  authDomain: "fileupload-react.firebaseapp.com",
  databaseURL: "https://fileupload-react.firebaseio.com",
  projectId: "fileupload-react",
  storageBucket: "fileupload-react.appspot.com",
  messagingSenderId: "519840407524",
  appId: "1:519840407524:web:a205d454e41093874171f1"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert("Not authorized!!!");
    }

    return this.db
      .collection("quotes")
      .doc(this.auth.currentUser.uid)
      .set({ quote });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getCurrentUserQuote() {
    const quote = await this.db
      .collection("quotes")
      .doc(this.auth.currentUser.uid)
      .get();

    return quote.get("quote");
  }
}

export default new Firebase();
