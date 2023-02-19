$(document).ready(function () {
  petboast();
});

let currentPage = 0;
let category = 'PET';

function petboast() {
  let url = 'http://localhost:8080/posts?page=' + currentPage + '&size=10';

  if (category) {
    url += '&category=' + category;
  }

  $.ajax({
    url: url,
    type: 'GET',
    contentType: "application/json;",
    crossDomain: true,
    success: function (response) {
      console.log(response);

      let rows = response['content'];

      if (category) {
        rows = rows.filter(row => row.category === category);
      }

      $('#post-table').empty();

      for (let i = 0; i < rows.length; i++) {
        let id = rows[i]['id'];
        let title = rows[i]['title'];
        let writer = rows[i]['writer'];
        let likes = rows[i]['likes'];

        let temp_html = `
          <tr>
            <th class="table1">${id}</th>
            <th class="table22" data-post-id="${id}">
              <a class="table222" href="posts_detail.html?id=${id}">${title}</a>
            </th>
            <th class="table3">${writer}</th>
            <th class="table4">${likes}</th>
          </tr>`;

        $('#post-table').append(temp_html);
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
