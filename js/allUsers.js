$(document).ready(function () {
    getAllUsers();
  });
  
  let currentPage = 0;


  function getAllUsers() {
    let url = 'http://43.200.238.79:8080/admin/users?page=' + currentPage + '&size=10';
  
    $.ajax({
    url: url,
    type: 'GET',
    contentType: "application/json;",
    crossDomain: true,
    success: function (response) {
      console.log(response);

      let rows = response['content'];

      for (let i = 0; i < rows.length; i++) {
        let id = rows[i]['id']
        let username = rows[i]['username']
        let nickname = rows[i]['nickname']
        let role = rows[i]['role']
        
        let temp_html =`
        <tr>
        <th class="table1">${id}</th>
        <th class="table2" data-post-id="${id}"><a class="table222" href="GetProfile.html?id=${id}">${username}</a></th>
        <th class="table3">${nickname}</th>
        <th class="table4">${role}</th>
        </tr>`

        // post-table에 temp_html 추가
      $('#post-table-users').append(temp_html);
    }

      let totalPages = response['totalPages'];
      let buttonHtml = '';

      for (let i = 0; i < totalPages; i++) {
        if (i === currentPage) {
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
