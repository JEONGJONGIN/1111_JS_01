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

        //ログイン機能
        const app = initializeApp(firebaseConfig);

        document.getElementById('login-signIn').addEventListener('click', function(){
          var signInEmail = document.getElementById('email-signIn').value;
          var signInPassword = document.getElementById('pw-signIn').value;
        
          signInWithEmailAndPassword(getAuth(app), signInEmail, signInPassword)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log(user);
              window.location.href = "index.html"//ログイン成功しindex.jsを起動
              // ...
            })
            .catch((error) => {
              alert('メールアドレスもしくはパスワードに誤りがあります。')
              console.log('ログイン失敗')
              const errorCode = error.code;
              const errorMessage = error.message;
            });
            document.getElementById('email-signIn').value = "";
            document.getElementById('pw-signIn').value = "";
          });
