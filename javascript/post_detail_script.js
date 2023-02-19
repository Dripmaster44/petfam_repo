
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

// 세부 페이지 접속 시 GET 요청으로 게시글 data반환
function petboast_detail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    $.ajax({
      url: 'http://localhost:8080/posts/' + id,
      type: 'GET',
      data: {},
      contentType: "application/json;",
      success: function (response) {
        // 서버로부터 데이터를 성공적으로 받아온 경우
        // 포스트 로딩
        console.log(response)
        let writer = response['writer']
        let title = response['title']
        let content = response['content']
        let image = response['image']
        let likes = response['likes']
        let comments = response['comments']
        let temp_html = `<div class="post-detail-post">
        <div class="post-header">
          <div class="post-title">${title}</div>
          <div class="post-info">
            <span class="post-writer">${writer}</span>
            <span type="button"><a href="/templates/updatePost.html?id=${id}" style="text-decoration-line: none; color:#555;">수정</a></span>
            <span type="button" onclick="deletePost()">삭제</span>
          </div>
        </div>
        <div class="post-content">
          <div class="post-image"><img src="${image}" class="rounded mx-auto d-block" alt="missing image"></div>
          <div class="post-text">${content}</div>
        </div>
        <div class="post-footer">
          <div class="post-likes">추천 ${likes}</div>
          <button type="button" class="btn btn-outline-primary" onclick="likePost(${id})">좋아요</button>
        </div>
      </div>
      `
      // <span class="post-date">2023-02-16</span> writer 밑에 넣기
      // 댓글 로딩
        $('#post-detail').append(temp_html);
        for(let i=0; i< response.comments.length; i++){
            const comment = response.comments[i];
            const commentId = comment.id;
            const commentWriter = comment.writer;
            const commentContent = comment.content;
            const commentLikes = comment.likes;
            const reComments = comment.reComments;
            let temp_html2 = `<table><tr class="post-detail-comment" data-comment-id="${commentId}">
              <td><th class="post-detail-comment-writer">${commentWriter}</th>
              <th class="post-detail-comment-content">${commentContent}</th>
              <th class="post-detail-comment-likes">${commentLikes}</th></td>
              <td>
                <div class="post-detail-comment-buttons">
                  <button type="button" class="btn btn-outline-primary" onclick="likeComment(${commentId})">좋아요</button>
                  <button type="button" class="btn btn-outline-primary" onclick="comment_open(${commentId})">수정</button>
                  <button type="button" class="btn btn-outline-primary" onclick="deleteComment(${commentId})">삭제</button>
                  <button type="button" class="btn btn-outline-primary" onclick="recomment_open(${commentId})">댓글</button>
                  <div></td></tr>
            <tr>
              <td colspan="4">
                <div class="commentbox commentbox-${commentId}" style="display:none;">
                    <input type="text" class="form-control" id="formGroupExampleInput4-${commentId}"  placeholder="수정할 댓글을 작성하세요.">
                    <button type="button" onclick="comment_update(${commentId})" class="btn btn-light">수정</button>
                    <button type="button" onclick="comment_close(${commentId})" class="btn btn-light">닫기</button>
                  </div>
                <div class="recommentbox recommentbox-${commentId}" style="display:none;">
                    <input type="text" class="form-control" id="formGroupExampleInput3-${commentId}" placeholder="댓글을 등록하세요.">
                    <button type="button" onclick="recomment_register(${commentId})" class="btn btn-light">등록</button>
                    <button type="button" onclick="recomment_close(${commentId})" class="btn btn-light">닫기</button>
                  </div>
                </td>
              </tr>
          </table>`;
          
          // 대댓글 로딩
            $('#post-detail').append(temp_html2);
            for(let j=0; j< reComments.length; j++){
                const reComment = reComments[j];
                const recommentId = reComment.id;
                const reCommentWriter = reComment.writer;
                const reCommentContent = reComment.content;
                const reCommentLikes = reComment.likes;
                let temp_html3 = `<table>
                <tr class="post-detail-reComment" data-recomment-id="${recommentId}">
                  <td>
                  <th class="post-detail-reComment-writer">${reCommentWriter}</th>
                  <th class="post-detail-reComment-content">${reCommentContent}</th>
                  <th class="post-detail-reComment-likes">${reCommentLikes}</th></td>
                <td>
                  <div class="post-detail-recomment-buttons">
                    <button type="button" class="btn btn-outline-primary" onclick="likeRecomment(${recommentId})">좋아요</button>
                    <button type="button" class="btn btn-outline-primary" onclick="recomment_update_open(${recommentId})">수정</button>
                    <button type="button" class="btn btn-outline-primary" onclick="deletereComment(${recommentId})">삭제</button>
                  </div>
                </td>
              </tr>
              <tr>
              <td colspan="4">
              <div class="recommentUpdateBox recommentUpdateBox-${recommentId}" style="display:none;">
              <input type="text" class="form-control" id="formGroupExampleInput5-${recommentId}" style="width: 780px; margin-top: 10px;" placeholder="수정할 댓글을 작성하세요.">
              <button type="button" onclick="recomment_update(${recommentId})" class="btn btn-light">수정</button>
              <button type="button" onclick="recomment_update_close(${recommentId})" class="btn btn-light">닫기</button>
            </div></td></tr>
            </table>`
                $('#post-detail').append(temp_html3);
            }
        }
      }});
    }

    // 게시글 삭제
    function deletePost(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const auth = getToken();
    $.ajax({
      url: 'http://localhost:8080/posts/' + id,
      type: 'DELETE',
      "beforeSend": function(xhr) {
        xhr.setRequestHeader("Authorization", auth);
      },
      success: function(result) {
        console.log('DELETE request succeeded.');
        // handle success
        // 페이지 이동
        location.href = 'http://127.0.0.1:5500/templates/posts.html';
      },
      error: function(xhr, status, error) {
        console.error('DELETE request failed.');
        // handle error
      }
    });
  }

