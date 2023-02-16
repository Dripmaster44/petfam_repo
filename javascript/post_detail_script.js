// 페이지 접속시 함수 호출하는 코드
$(document).ready(function () {
    petboast_detail();
})

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
          </div>
        </div>
        <div class="post-content">
          <div class="post-image">${image}</div>
          <div class="post-text">${content}</div>
        </div>
        <div class="post-footer">
          <div class="post-likes">추천 ${likes}</div>
          <button type="button" class="btn btn-outline-primary">좋아요</button>
        </div>
      </div>
      `
      // <span class="post-date">2023-02-16</span> writer 밑에 넣기
        $('#post-detail').append(temp_html);
        for(let i=0; i< response.comments.length; i++){
            const comment = response.comments[i];
            const commentWriter = comment.writer;
            const commentContent = comment.content;
            const commentLikes = comment.likes;
            const reComments = comment.reComments;
            let temp_html2 = `<table><tr class="post-detail-comment">
                <th class="post-detail-comment-writer">${commentWriter}</th>
                <th class="post-detail-comment-content">${commentContent}</th>
                <th class="post-detail-comment-likes">${commentLikes}</th>
                <th>
                <button type="button" class="btn btn-outline-primary">좋아요</button></th>
            </tr></table>`;

            $('#post-detail').append(temp_html2);
            for(let j=0; j< reComments.length; j++){
                const reComment = reComments[j];
                const reCommentWriter = reComment.writer;
                const reCommentContent = reComment.content;
                const reCommentLikes = reComment.likes;
                let temp_html3 = `<table><tr class="post-detail-reComment">
                <th class="post-detail-reComment-writer">${reCommentWriter}</th>
                <th class="post-detail-reComment-content">${reCommentContent}</th>
                <th class="post-detail-reComment-likes">${reCommentLikes}</th>
                <th>
                <button type="button" class="btn btn-outline-primary">좋아요</button></th>
            </tr><table>`
                $('#post-detail').append(temp_html3);
            }
        }
      }});
    }

    $(document).on('click', '.post-detail-comment-like-btn', function () {
        const postId = response.id;
        const commentId = $(this).closest('.post-detail-comment').attr('id');
        $.ajax({
            url: 'http://localhost:8080/comments/' + commentId + '/like',
            type: 'POST',
            data: {},
            contentType: "application/json;",
            success: function (response) {
                // 좋아요 증가 성공 시, 좋아요 개수를 갱신해줍니다.
                $(this).prev('.post-detail-comment-likes').text(response.likes);
            },
            // error: function (xhr, status, error) {
            //     // 좋아요 증가 실패 시, 에러 메시지를 출력합니다.
            //     console.error(xhr, status, error);
            // }
        });
    });
    