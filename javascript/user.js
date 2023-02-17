function save_post() {
    let title = $('title').val()
    let content = $('content').val()
    $.ajax({
          type: 'POST',
          url: '/posts',
          contentType: 'application/json',
          data: {title: title, content: content},
          success: function (response) {
            alert(response['등록되었습니다.'])
            window.location.replace('/posts')
          }
        }
    );
  }

function petboast(){
  $.ajax({
    url: 'localhost:8080/posts',
    type: 'GET',
    data: {
        page: 0,  // 가져올 페이지 번호
        size: 10  // 페이지 크기
    },
    success: function(response) {
        // 서버로부터 데이터를 성공적으로 받아온 경우
        console.log(response);
    }
    // error: function(xhr, status, error) {
    //     // 에러가 발생한 경우
    //     console.log(error);
    // }
});

}