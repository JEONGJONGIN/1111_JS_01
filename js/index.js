        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
        import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved } 
            from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
        import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } 
            from "https://www.gstatic.com/firebasejs/9.1.0/firebase-storage.js";
        
            // Your web app's Firebase configuration

        //gitHubあげる際には絶対消す！！！！！！隠す！！
        const firebaseConfig = {
        };

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app); //RealtimeDBに接続
        const dbRef = ref(db, "chat"); //RealtimeDB内の"chat"を使う
        
        const storage = getStorage(app);

        //データ登録(Click)
        // $('#send').on("click",function(){
        //     const uname = $('#uname').val();
        //     const text = $('#text').val();
        //     alert(uname + text);

        //     $('#uname').val("");
        //     $('#text').val("");

        // })

        document.getElementById('send').addEventListener('click', function () {
        const uname = document.getElementById('uname').value;
        const text = document.getElementById('text').value;
        let date = document.createElement("span");
        date.className = "date"
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        date.textContent = timeString;

        var file = document.querySelector('#imgfile').files[0];
        var storageRootRef = storageRef(storage);
        var uploadroot = storageRef(storageRootRef, 'image/' + file.name);
        var upload = uploadBytes(uploadroot,file)
        const img = file

        getDownloadURL(upload).then((url) => {
            img = url;
        });

        //まずは確認
        console.log(uname, 'unameの文字')
        console.log(text, 'textの文字')
        console.log(date, 'dateの文字')


        //入力された文字が書くんんできた後は
        //firebaseにデータ送るコードを記述します（まだfirebaseに送っていません！）

        const msg = {
            uname: uname,
            img : img,
            text: text,
            date: date.textContent,
        }

        //firebaseにデータを送る処理です。
        //pushはfirebaseが用意したおまじないです！（注意！）
        const newPostRef = push(dbRef);
        //setはfirebaseが用意したおまじないです。（注意！）
        set(newPostRef, msg);

        alert(uname + text);

        document.getElementById('uname').value = "";
        document.getElementById('text').value = "";
        });

        //データ登録(Enter)

        //最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
        onChildAdded(dbRef, function(data){
            const msg = data.val();
            console.log(msg, '塊')
            const key = data.key;
            console.log(key, '塊')

            let html =`
                <li class=${key}>
                    <span class="uname">${msg.uname}
                    <img class="img" src=${msg.img}"></span>
                    <span class="text">${msg.text}</span>
                    <span class="date">${msg.date}</span>
                    </li>
                `
        //画面に表示するために埋め込む
        // $('#output').append(html)
        document.getElementById('output').innerHTML += html;
        })

        document.getElementById('text').addEventListener('input', function () {
            resizeTextarea();
          });

        function resizeTextarea() {
            const textarea = document.getElementById('text');          
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
          };