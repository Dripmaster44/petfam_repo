// 페이지 접속시 함수 호출하는 코드
$(document).ready(function () {
  petboast();
})
let currentPage=0;
// 펫팸 자랑 페이지 접속 시 GET요청으로 게시글 리스트를 불러옴
function petboast() {
  $.ajax({
    url: 'http://localhost:8080/posts',
    type: 'GET',
    data: { "page": currentPage },
    contentType: "application/json;",
    crossDomain: true,
    success: function (response) {
      // 서버로부터 데이터를 성공적으로 받아온 경우
      console.log(response)
        let rows = response['content'];
        let petRows = rows.filter(row => row.category && row.category === 'PET'); // PET 카테고리에 해당하는 게시물만 필터링

        $('#post-table').empty(); // 기존의 게시물 테이블 비우기
        for (let i = 0; i < petRows.length; i++) { // 필터링된 게시물만 출력
            let id = petRows[i]['id']
            let title = petRows[i]['title']
            let writer = petRows[i]['writer']
            let likes = petRows[i]['likes']
            
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
        // 페이지 버튼 생성
      let totalPages = response['totalPages'];
      let buttonHtml = '';
      for (let i = 0; i < totalPages; i++) {
        if (i == currentPage) {
          buttonHtml += `<button class="page-button current" onclick="changePage(${i})">${i + 1}</button>`;
        } else {
          buttonHtml += `<button class="page-button" onclick="changePage(${i})">${i + 1}</button>`;
        }
      }
      $('#page-buttons').html(buttonHtml);
    }
  });
}

function changePage(pageNum) {
  currentPage = pageNum;
  petboast();
}