//console.log("Firebase setup script is loaded")

let allDots; // contains all messages
let addDot;  // add a message to database

// Load and initialize Firebase
async function firebaseSetup() {
    // load firebase modules using import("url"), libraries
    const fb_app = "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
    const fb_database ="https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
   
  //load the libraries
    const { initializeApp } = await import(fb_app);
   // console.log(initializeApp)
    const { getDatabase, ref, push, set, onValue } = await import(fb_database);
  
    // Your web app's Firebase configuration
    // You can get this information from the firebase console
    const firebaseConfig = {
        apiKey: "AIzaSyBFLViuW6ORbxGW0Io9wZ5FA9OYcjTtW-E",
        authDomain: "fir-example-84107.firebaseapp.com",
        projectId: "fir-example-84107",
        storageBucket: "fir-example-84107.appspot.com",
        messagingSenderId: "395145279224",
        appId: "1:395145279224:web:08800eb967a5fd01b5ad0d",
        //DATABASE CONFIG url
        databaseURL: "https://fir-example-84107-default-rtdb.europe-west1.firebasedatabase.app/",
      };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // console.log(app)
    // Initialize Database
    const myDatabase = getDatabase(app);

    const dotsRef=ref(myDatabase, "graph/dots");
    //console.log(greetingsRef);

  //function to retrieve the greetings at every database update
    onValue(dotsRef, function(data){
      allDots = data.val();
      console.log(allDots);
  });

    //function to add messages
    //properties is an object like{
     //   text:"text of the message"
     //   x: "x position"
     //   y: "y position" }


    addDot = function(properties){
        //create reference
     const newDotsRef = push(dotsRef);
        //add data
     set(newDotsRef, properties);
    }

    

  }
  
  firebaseSetup();