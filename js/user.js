function getUserNickname() {
  sendAuthorizedRequest("http://localhost:8080/users/profiles", "GET", function (response) {
    console.log(response);
    console.log(response.nickname);
    $('#main-item-welcome').empty();
    $('#main-item-welcome').append(response.nickname+'님 반갑습니다.');

    if (window.location.href === "blog-single.html") {
      const temp_html = `<h3>${response.nickname}</h3>`;
      $('#CommentNickname').append(temp_html);
    }
  });
}

function getIsAdmin() {
  return new Promise((resolve, reject) => {
    sendAuthorizedRequest("http://localhost:8080/users/profiles", "GET", function (response) {
      if (response.role === "ROLE_ADMIN") {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}


function getUserMe() {
  sendAuthorizedRequest("http://localhost:8080/users/profiles", "GET", function (response) {
    console.log(response);
    $('#my-profile-nickname').empty();
    $('#my-profile-nickname').append(response.nickname);
    $('#my-profile-introduction').empty();
    $('#my-profile-introduction').append(response.introduction);
    document.getElementById("img-thumbnail-src").src = response.image;
  });

}

function getUser() {
  const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
  sendAuthorizedRequest("http://localhost:8080/users/profiles/"+id, "GET", function (response) {
    console.log(response);
    console.log(response.nickname);
    $('#card-content1-user').empty();
    $('#card-content1-user').append(response.nickname);
    $('#card-content2-user').empty();
    $('#card-content2-user').append(response.introduction);
    document.getElementById("img-thumbnail-src").src = response.image;
  });

}


function logout() {
  const auth = getToken();
  const auth_r = getRefreshToken();
  var settings = {
    "url": "http://localhost:8080/users/signout",
    "method": "POST",
    "timeout": 0,
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
      xhr.setRequestHeader("Refresh_authorization", auth_r);
    }
  };
  
  $.ajax(settings).done(function (response,status,xhr) {
    console.log(response);
    if (response == 'success'){
      alert('로그아웃')
      window.location.href = 'http://127.0.0.1:5501/index.html';
      document.cookie =
              'Authorization' + '=' + "" + ';path=/'; 
        document.cookie = 
              'Refresh_authorization' + '=' + "" + ';path=/';
    } else {
      alert('로그아웃 실패')
    }
  });
};


function profileUpdate() {
  const auth = getToken();

  let image = $('#formGroupExampleInput3').val();
  let nickname = $('#formGroupExampleInput').val();
  let introduction = $('#formGroupExampleInput2').val();


  var settings = {
    "url": "http://localhost:8080/users/profiles",
    "method": "PATCH",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "nickname": nickname,
      "introduction": introduction,
      "image": image
    }),
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    }
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    if (response == "success"){
      alert("프로필 수정 완료")
      window.location.href = 'http://127.0.0.1:5501/MyProfile.html';
    }
  });
}

function getAllUsers() {
  sendAuthorizedRequest("http://localhost:8080/admin/users", "GET", function (response) {
    console.log(response);
    let rows = response['content']
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
  });
}

function  getToken() {
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

function  getRefreshToken() {
  let cName = 'Refresh_authorization' + '=';
  let cookieData = document.cookie;
  let cookie = cookieData.indexOf('Refresh_authorization');
  let auth = '';
  if(cookie !== -1){
      cookie += cName.length;
      let end = cookieData.indexOf(';', cookie);
      if(end === -1)end = cookieData.length;
      auth = cookieData.substring(cookie, end);
  }

  return auth;
}

function sendAuthorizedRequest(url, method, callback) {
  const auth = getToken();
  var settings = {
    "url": url,
    "method": method,
    "timeout": 0,
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    }
  };
  $.ajax(settings)
    .done(callback)
    .fail(function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 403) {
        const refresh = getRefreshToken();
        var refreshSettings = {
          "url": "http://localhost:8080/users/refresh",
          "method": "POST",
          "timeout": 0,
          "beforeSend": function(xhr) {
            xhr.setRequestHeader("Refresh_authorization", refresh);
          }
        };
        $.ajax(refreshSettings)
          .done(function (response, status, xhr) {
            document.cookie = 'Authorization' + '=' + xhr.getResponseHeader('Authorization') + ';path=/'; 
            const newAccessToken = getToken();
            settings.headers.Authorization = newAccessToken;
            $.ajax(settings).done(callback);
          });
      } else {
        console.log(errorThrown);
      }
    });
}
