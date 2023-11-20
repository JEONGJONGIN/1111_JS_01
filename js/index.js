        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
        import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
            from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
        // Your web app's Firebase configuration

        //gitHubあげる際には絶対消す！！！！！！
        const firebaseConfig = {
            apiKey: "AIzaSyCGM4cqnblC-jAppatI6HqNxCkKLXuxiRM",
            authDomain: "gsdev26us07-fdc33.firebaseapp.com",
            projectId: "gsdev26us07-fdc33",
            storageBucket: "gsdev26us07-fdc33.appspot.com",
            messagingSenderId: "61424458217",
            appId: "1:61424458217:web:2f734a8c43ab7ea1775378"
        };

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app); //RealtimeDBに接続
        const dbRef = ref(db, "chat"); //RealtimeDB内の"chat"を使う

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

        //まずは確認
        console.log(uname, 'unameの文字')
        console.log(text, 'textの文字')
        console.log(date, 'dateの文字')


        //入力された文字が書くんんできた後は
        //firebaseにデータ送るコードを記述します（まだfirebaseに送っていません！）

        const msg = {
            uname: uname,
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
                <div class=${key}>
                    <p>${msg.uname}</p>
                    <p>${msg.date}</p>
                    <p>${msg.text}</p>
                    </div>
                `
        //画面に表示するために埋め込む
        // $('#output').append(html)
        document.getElementById('output').innerHTML += html;

        })