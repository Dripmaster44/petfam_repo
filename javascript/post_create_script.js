$(document).ready(function() {
    $('form').submit(function(event) {
      event.preventDefault(); // 기본적인 form submit 기능을 막음
  
      // form에서 입력한 데이터 가져오기
      var title = $('#exampleFormControlInput1').val();
      var content = $('#exampleFormControlTextarea1').val();
      var image = $('#exampleFormControlInput2').val();
  
      // AJAX 요청 보내기
      $.ajax({
        url: 'http://localhost:8080/posts/',
        type: 'POST',
        data: {title: title, content: content, image: image},
        success: function(data) {
          // 서버로부터 성공적인 응답을 받았을 때 실행할 코드
          console.log('글이 성공적으로 작성되었습니다!');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // 서버로부터 오류 응답을 받았을 때 실행할 코드
          console.log('글 작성에 실패했습니다: ' + textStatus + ' - ' + errorThrown);
        }
      });
    });
  });
  