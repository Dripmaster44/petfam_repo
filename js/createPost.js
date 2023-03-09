
const token = getToken('token'); // bearer 토큰 값 가져오기
const headers = {
  'Authorization': `Bearer ${token}`,
};
fetch("PostMyPet.html", { headers })
  .then(response => {
    // 응답 처리
  })
  .catch(error => {
    // 에러 처리
  });

  function getToken() {
    let cName = 'Authorization' + '=';
    let cookieData = document.cookie;
    let cookie = cookieData.indexOf('Authorization');
    let auth = '';
    if(cookie !== -1){
        cookie += cName.length;
        let end = cookieData.indexOf(';', cookie);
        if(end === -1)end = cookieData.length;
        auth = cookieData.substring(cookie, end);
    }

  
    return auth;
  }
  


function createPost() {
  const cookieValue = getToken();
  if (cookieValue == "") {
    // 로그인 하지 않은 경우
    alert("로그인이 필요합니다.");
    window.location.href = "UserLogin.html"
  }
  const fileInput = document.getElementById("formGroupExampleInput3");

  if(fileInput && fileInput.files && fileInput.files[0]) {
  localStorage.removeItem("imageUrl");
  uploadImage().then(() => {
      // form에서 입력한 데이터 가져오기
      var title = $('#exampleFormControlInput1').val();
      var content = $('#exampleFormControlTextarea1').val();
      let image = localStorage.getItem("imageUrl");
      var category = $('#exampleFormControlSelect1').val();
  
      const auth = getToken();
      console.log(auth);
      // AJAX 요청 보내기
      $.ajax({
        url: 'http://43.200.238.79:8080/posts',
        type: 'POST',
        data: JSON.stringify({title: title, image: image, content: content, category: category}),
        headers: {
          'Content-Type': 'application/json' // 서버에서 지원하는 타입으로 변경
        },
        "beforeSend": function(xhr) {
          xhr.setRequestHeader("Authorization", auth);
        },
        success: function(data) {
          // 서버로부터 성공적인 응답을 받았을 때 실행할 코드
          console.log('글이 성공적으로 작성되었습니다!');
          // 페이지 이동
          location.href = 'blog.html';
        },
        error: function(xhr, status, error) {
          console.error('POST is failed');
          // handle error
        }
      });
    });} 
    else {
        var title = $('#exampleFormControlInput1').val();
        var content = $('#exampleFormControlTextarea1').val();
        let image = "";
        var category = $('#exampleFormControlSelect1').val();
    
        const auth = getToken();
        console.log(auth);
        // AJAX 요청 보내기
        $.ajax({
          url: 'http://43.200.238.79:8080/posts',
          type: 'POST',
          data: JSON.stringify({title: title, image: image, content: content, category: category}),
          headers: {
            'Content-Type': 'application/json' // 서버에서 지원하는 타입으로 변경
          },
          "beforeSend": function(xhr) {
            xhr.setRequestHeader("Authorization", auth);
          },
          success: function(data) {
            // 서버로부터 성공적인 응답을 받았을 때 실행할 코드
            console.log('글이 성공적으로 작성되었습니다!');
            // 페이지 이동
            location.href = 'blog.html';
          },
          error: function(xhr, status, error) {
            console.error('POST is failed');
            // handle error
          }
        });
    }
  };


  function uploadImage() {
    return new Promise((resolve, reject) => {
      const auth = getToken();
  
      const fileInput = document.getElementById("formGroupExampleInput3");
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("file", file);
  
      var settings = {
        "url": "http://43.200.238.79:8080/upload",
        "method": "POST",
        "timeout": 0,
        "headers": {},
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": formData,
        "beforeSend": function(xhr) {
          xhr.setRequestHeader("Authorization", auth);
        }
      };
  
      $.ajax(settings).done(function (response) {
        console.log(response);
        localStorage.setItem("imageUrl", response); // 저장소에 이미지 URL 저장
        resolve(); // 이미지 업로드 완료를 알림
      }).fail(function (jqXHR, textStatus, errorThrown) {
        reject(errorThrown); // 에러가 발생한 경우 Promise를 reject()로 반환
      });
    });
  }