// 페이지 접속시 함수 호출하는 코드
$(document).ready(function () {
  petboast();
})

// 펫팸 자랑 페이지 접속 시 GET요청으로 게시글 리스트를 불러옴
function petboast() {
  $.ajax({
    url: 'http://localhost:8080/posts',
    type: 'GET',
    data: {},
    contentType: "application/json;",
    success: function (response) {
      // 서버로부터 데이터를 성공적으로 받아온 경우
        let rows = response['content']
        for (let i = 0; i < rows.length; i++) {
            let id = rows[i]['id']
            let title = rows[i]['title']
            let writer = rows[i]['writer']
            let likes = rows[i]['likes']
            
            let temp_html =`
            <tr>
            <th class="table1">${id}</th>
            <th class="table22" data-post-id="${id}"><a class="table222" href="posts_detail.html?id=${id}">${title}</a></th>
            <th class="table3">${writer}</th>
            <th class="table4">${likes}</th>
            </tr>`

            // post-table에 temp_html 추가
          $('#post-table').append(temp_html);
        }
        }
    });
    }
    
  //    function save_post() {
    //   let title = $('title').val()
    //   let content = $('content').val()
    //   let image = $('image').val()
    //   $.ajax({
    //         type: 'POST',
    //         url: '/posts',
    //         contentType: 'application/json',
    //         data: {title: title, content: content, image: image},
    //         success: function (response) {
    //           alert(response['등록되었습니다.'])
    //           window.location.replace('/posts')
    //         }
    //       }
    //   );
    // }