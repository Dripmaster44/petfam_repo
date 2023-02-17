
const token = getToken('token'); // bearer 토큰 값 가져오기
const headers = {
  'Authorization': `Bearer ${token}`,
};
fetch("http://127.0.0.1:5500/templates/updatePost.html", { headers })
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
  


$(document).ready(function() {
    $('form').submit(function(event) {
      event.preventDefault(); // 기본적인 form submit 기능을 막음

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
  
      // form에서 입력한 데이터 가져오기
      var title = $('#exampleFormControlInput1').val();
      var content = $('#exampleFormControlTextarea1').val();
      var image = $('#exampleFormControlInput2').val();
  
      const auth = getToken();
      console.log(auth);
      // AJAX 요청 보내기
      $.ajax({
        url: 'http://localhost:8080/posts/' + id,
        type: 'PATCH',
        data: JSON.stringify({title: title, image: image, content: content}),
        headers: {
          'Content-Type': 'application/json' // 서버에서 지원하는 타입으로 변경
        },
        "beforeSend": function(xhr) {
          xhr.setRequestHeader("Authorization", auth);
        },
        success: function(data) {
          // 서버로부터 성공적인 응답을 받았을 때 실행할 코드
          console.log('글이 성공적으로 수정되었습니다!');
          // 페이지 이동
          location.href = 'http://127.0.0.1:5500/templates/posts.html';
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // 서버로부터 오류 응답을 받았을 때 실행할 코드
          console.log('글 작성에 실패했습니다: ' + textStatus + ' - ' + errorThrown);
        }
      });
    });
  });
  