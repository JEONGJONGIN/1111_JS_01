        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
        import { getDatabase, ref, push, set, onChildAdded, update, remove, onChildRemoved } 
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


        document.getElementById('send').addEventListener('click', async function () {
            const uname = document.getElementById('uname').value;
            const text = document.getElementById('text').value;
            const date = document.createElement("span");
            date.className = "date"
            const now = Date.now();
            // const hours = now.getHours().toString().padStart(2, '0');
            // const minutes = now.getMinutes().toString().padStart(2, '0');
            // const timeString = `${hours}:${minutes}`;
            // date.textContent = timeString;
            const file = document.querySelector('#imgfile').files[0];
            const msg = {
                uname,
                text, 
                date: now
            }
            if (file) {
                const storageRootRef = storageRef(storage);
                const uploadroot = storageRef(storageRootRef, 'image/' + file.name);
                const upload = uploadBytes(uploadroot, file);
        
                // 이미지 업로드가 완료된 후에 다운로드 URL을 얻어오기
                await upload.then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                }).then((url) => {
                    // 업로드된 이미지의 다운로드 URL을 사용
                    const img = url;
                    console.log('업로드된 경로는:', url)
        
                    // 나머지 코드는 이전과 동일
                    msg.img = img

                    const newPostRef = push(dbRef);
                    set(newPostRef, msg);
                }).catch((error) => {
                    console.error('이미지 업로드 실패:', error);
                });
            } else {
                // 이미지가 선택되지 않은 경우    
                const newPostRef = push(dbRef);
                set(newPostRef, msg);
            }
            alert(uname + text);
            document.getElementById('text').value = "";
        });

        // var storageRootRef = storageRef(storage);
        // var uploadroot = storageRef(storageRootRef, 'image/' + file.name);
        // var upload = uploadBytes(uploadroot,file)
   

        // getDownloadURL(upload).then((url) => {
        //     console.log('업로드된 경로는', url)
        // });

        //まずは確認
        // console.log(uname, 'unameの文字')
        // console.log(text, 'textの文字')
        // console.log(date, 'dateの文字')


        // //入力された文字が書くんんできた後は
        // //firebaseにデータ送るコードを記述します（まだfirebaseに送っていません！）

        // const msg = {
        //     uname: uname,
        //     img : img,
        //     text: text,
        //     date: date.textContent,
        // }

        // //firebaseにデータを送る処理です。
        // //pushはfirebaseが用意したおまじないです！（注意！）
        // const newPostRef = push(dbRef);
        // //setはfirebaseが用意したおまじないです。（注意！）
        // set(newPostRef, msg);

        // alert(uname + text);

        // document.getElementById('uname').value = "";
        // document.getElementById('text').value = "";
        // });

        //データ登録(Enter)

        //最初にデータ取得＆onSnapshotでリアルタイムにデータを取得

        onChildAdded(dbRef, function(data){
            const uname = document.getElementById('uname').value;
            const deleteImg = "img/delete.png"
            const msg = data.val();
            console.log(msg, '塊')
            const key = data.key;
            console.log(key, '塊')
            let html =`
                <li id=${key} class="massage">
                    <span class="profile">
                        <span class="uname">${msg.uname}</span>
                        <img class="img" src="${msg.img || ''}">
                        </span>
                    <span class="text">${msg.text}</span>
                    <span class="date">${new Date(msg.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    <img class="deleteImg" id="deleteI" data-key=${key} src="${deleteImg || ''}"></span>
                </li> 
                `
        //画面に表示するために埋め込む
        // $('#output').append(html)
        document.getElementById('output').innerHTML += html;

        const newMessageElement = document.getElementById(key);
        if (newMessageElement) {
            const profileElement = newMessageElement.querySelector('.profile');
            const unameElement = profileElement.querySelector('.uname');
    
            // uname 값이 일치하는 경우에 sent 클래스 추가
            if (unameElement.textContent === uname) {
                newMessageElement.classList.add('sent');
                } else {
                    newMessageElement.classList.add('received');
                }
            }
        })

        document.getElementById('text').addEventListener('input', function () {
            resizeTextarea();
          });
        


        function resizeTextarea() {
            const textarea = document.getElementById('text');          
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
          };
        
        //   $("#output").on('click', ".deleteImg", function () {
        //     const key = $(this).attr("data-key");
        //     const remove_item = ref(db,"chat/" + key);
        //     remove(remove_item)
        //     .then(() => {
        //         console.log('데이터가 성공적으로 삭제되었습니다.');
        //     })
        //     .catch((error) => {
        //         console.error('데이터 삭제 중 오류 발생:', error);
        //     });
        //   });

          document.getElementById('output').addEventListener('click', function (event) {
            // 이벤트를 발생시킨 요소가 .deleteImg 클래스를 가지고 있는지 확인
            if (event.target.classList.contains('deleteImg')) {
                // data-key 속성을 통해 키 가져오기
                const key = event.target.getAttribute('data-key');
        
                // 데이터베이스 경로 설정
                const removeItemRef = ref(db, "chat/" + key);
        
                // 데이터 삭제
                remove(removeItemRef)
                    .then(() => {
                        console.log('データが成功的に削除されました。.');
                    })
                    .catch((error) => {
                        console.error('データ削除中エラー発生。:', error);
                    });
            }
        });

          onChildRemoved(dbRef, (data) => {
            const key = data.key;
            const removedElement = document.getElementById(key);
            if (removedElement) {
                removedElement.remove();
                console.log('要素が成功的に削除されました。');
            } else {
                console.log('要素が見つかりません.');
            }
        });

        document.getElementById('text').addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              document.getElementById('send').click();
            }
          });