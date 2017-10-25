import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCBApuM8rEa7qT6M7syqyp9Y0b7iz76MEU",
    authDomain: "box-tracker-6cacd.firebaseapp.com",
    databaseURL: "https://box-tracker-6cacd.firebaseio.com",
    projectId: "box-tracker-6cacd",
    storageBucket: "box-tracker-6cacd.appspot.com",
    messagingSenderId: "988150519742"
};
var fire = firebase.initializeApp(config);
export default fire;