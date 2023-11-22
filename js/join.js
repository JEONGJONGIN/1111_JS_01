        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
        import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved } 
            from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
        import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } 
            from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js"


        
            // Your web app's Firebase configuration

        //gitHubあげる際には絶対消す！！！！！！隠す！！
        const firebaseConfig = {
        };


        //新規加入機能
        const app = initializeApp(firebaseConfig);

        document.getElementById('register-new').addEventListener('click', function(){
          var signUpEmail = document.getElementById('email-new').value;
          var signUpPassword = document.getElementById('pw-new').value;
          console.log(signUpEmail,signUpPassword)

          createUserWithEmailAndPassword(getAuth(app), signUpEmail, signUpPassword).then((result)=>{
            console.log(result);
            console.log(result.user);
          })
          .catch((error) => {
            console.log('error')
            console.error("Error creating user:", error);
            alert("ログイン情報が正しくないか、既に加入されてます")
          })
          document.getElementById('name-new').value = "";
          document.getElementById('email-new').value = "";
          document.getElementById('pw-new').value = "";
        });