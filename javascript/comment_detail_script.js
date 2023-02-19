
// 페이지 접속시 함수 호출하는 코드
$(document).ready(function () {
    petboast_detail();
})

// 쿠키에 있는 토큰 헤더로 실어보내기
const token = getToken('token'); // bearer 토큰 값 가져오기
const headers = {
  'Authorization': `Bearer ${token}`,
};
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch('http://127.0.0.1:5500/templates/posts_detail.html?id=' + id, { headers })
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

// 게시글에 댓글 등록
function comment_register(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const auth = getToken();
    var content = $('#formGroupExampleInput2').val();
    // AJAX 요청 보내기
    $.ajax({
      url: 'http://localhost:8080/posts/'+id+'/comments',
      type: 'POST',
      data: JSON.stringify({content: content}),
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
        location.href = "posts_detail.html?id="+id;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // 서버로부터 오류 응답을 받았을 때 실행할 코드
        console.log('글 작성에 실패했습니다: ' + textStatus + ' - ' + errorThrown);
      }
    })};

// 댓글 수정
function comment_update(commentId){
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  var content = $('#formGroupExampleInput4-'+commentId).val();

    const auth = getToken();
    // AJAX 요청 보내기
    $.ajax({
      url: 'http://localhost:8080/comments/' + commentId,
      type: 'PATCH',
      data: JSON.stringify({content: content}),
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
        location.href = "posts_detail.html?id="+id;
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // 서버로부터 오류 응답을 받았을 때 실행할 코드
        console.log('글 작성에 실패했습니다: ' + textStatus + ' - ' + errorThrown);
      }
    });
  };

  
// 댓글 삭제
function deleteComment(commentId){
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const auth = getToken();
  $.ajax({
    url: 'http://localhost:8080/comments/' + commentId,
    type: 'DELETE',
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    },
    success: function(result) {
      console.log('DELETE request succeeded.');
      // handle success
      // 페이지 이동
      location.href = "posts_detail.html?id="+id;
    },
    error: function(xhr, status, error) {
      console.error('DELETE request failed.');
      // handle error
    }
  });
}



// 댓글에 대댓글 등록
function recomment_register(commentId){
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const auth = getToken();

var content = $('#formGroupExampleInput3-'+commentId).val();
$.ajax({
  url: 'http://localhost:8080/comments/'+commentId,
  type: 'POST',
  data: JSON.stringify({content: content}),
  headers: {'Content-Type': 'application/json'},
  "beforeSend": function(xhr) {xhr.setRequestHeader("Authorization", auth);},
  success: function(data) {
    console.log('대댓글이 성공적으로 등록되었습니다!');
    // 페이지 이동
    location.href = "posts_detail.html?id="+id;
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log('대댓글 등록에 실패했습니다: ' + textStatus + ' - ' + errorThrown);
  }
});
}

// 대댓글 수정
function recomment_update(recommentId){
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
var content = $('#formGroupExampleInput5-'+recommentId).val();

  const auth = getToken();
  // AJAX 요청 보내기
  $.ajax({
    url: 'http://localhost:8080/recomments/' + recommentId,
    type: 'PATCH',
    data: JSON.stringify({content: content}),
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
      location.href = "posts_detail.html?id="+id;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // 서버로부터 오류 응답을 받았을 때 실행할 코드
      console.log('글 작성에 실패했습니다: ' + textStatus + ' - ' + errorThrown);
    }
  });
};

// 대댓글 삭제
function deletereComment(recommentId){
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const auth = getToken();
  $.ajax({
    url: 'http://localhost:8080/recomments/' + recommentId,
    type: 'DELETE',
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    },
    success: function(result) {
      console.log('DELETE request succeeded.');
      // handle success
      // 페이지 이동
      location.href = "posts_detail.html?id="+id;
    },
    error: function(xhr, status, error) {
      console.error('DELETE request failed.');
      // handle error
    }
  });
}

// 게시글 좋아요
function likePost(id){
  const auth = getToken();
  $.ajax({
    url: 'http://localhost:8080/posts/' + id + '/like',
    type: 'POST',
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    },
    success: function(result) {
      console.log('success');
      // handle success
      // 페이지 이동
      location.href = "posts_detail.html?id="+id;
    },
    error: function(xhr, status, error) {
      console.error('Like request failed.');
      // handle error
    }
  });
}

// 댓글 좋아요
function likeComment(commentId){
  const auth = getToken();
  $.ajax({
    url: 'http://localhost:8080/comments/' + commentId + '/like',
    type: 'POST',
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    },
    success: function(result) {
      console.log('success');
      // handle success
      // 페이지 이동
      location.href = "posts_detail.html?id="+id;
    },
    error: function(xhr, status, error) {
      console.error('Like request failed.');
      // handle error
    }
  });
}

// 대댓글 좋아요
function likeRecomment(recommentId){
  const auth = getToken();
  $.ajax({
    url: 'http://localhost:8080/recomments/' + recommentId + '/like',
    type: 'POST',
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    },
    success: function(result) {
      console.log('success');
      // handle success
      // 페이지 이동
      location.href = "posts_detail.html?id="+id;
    },
    error: function(xhr, status, error) {
      console.error('Like request failed.');
      // handle error
    }
  });
}



// 댓글 수정창 보이기
function comment_open(commentId) {
  document.querySelector('.commentbox-'+commentId).style.display = 'block';
}

// 댓글 수정창 닫기
function comment_close(commentId) {
  document.querySelector('.commentbox-'+commentId).style.display = 'none';
}

// 댓글에 대댓글 등록창 보이기
function recomment_open(commentId) {
  document.querySelector('.recommentbox-'+commentId).style.display = 'block';
}

// 대댓글 등록창 닫기
function recomment_close(commentId) {
  document.querySelector('.recommentbox-'+commentId).style.display = 'none';
}

// 대댓글 수정창 보이기
function recomment_update_open(recommentId) {
  document.querySelector('.recommentUpdateBox-'+recommentId).style.display = 'block';
}

// 대댓글 수정창 닫기
function recomment_update_close(recommentId) {
  document.querySelector('.recommentUpdateBox-'+recommentId).style.display = 'none';
}