function getUserNickname() {
  const auth = getToken();
  console.log(auth);
  var settings = {
    "url": "http://localhost:8080/users/profiles",
    "method": "GET",
    "timeout": 0,
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    }
  };
  console.log(settings)
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.nickname);
    $('#welcome-text').empty();
    $('#welcome-text').append(response.nickname+'님 반갑습니다.');
  });

}

function getUserMe() {
  const auth = getToken();
  var settings = {
    "url": "http://localhost:8080/users/profiles",
    "method": "GET",
    "timeout": 0,
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    }
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    $('#card-content1').empty();
    $('#card-content1').append(response.nickname);
    $('#card-content2').empty();
    $('#card-content2').append(response.introduction);
    document.getElementById("img-thumbnail").src = response.image;
  });

}

function getUser() {
  const auth = getToken();
  var settings = {
    "url": "http://localhost:8080/users/profiles/1",
    "method": "GET",
    "timeout": 0,
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Authorization", auth);
    }
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    console.log(response.nickname);
    $('#card-content1').empty();
    $('#card-content1').append(response.nickname);
    $('#card-content2').empty();
    $('#card-content2').append(response.introduction);
    document.getElementById("img-thumbnail").src = response.image;
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
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    if (response == 'success'){
      alert('로그아웃')
    } else {
      alert('로그아웃 실패')
    }
  });
};

function refresh() {
  const auth_r = getRefreshToken();
  var settings = {
    "url": "http://localhost:8080/users/refresh",
    "method": "POST",
    "timeout": 0,
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Refresh_authorization", auth_r);
    }
  };
  
  $.ajax(settings).done(function (response,status,xhr) {
    console.log(response);
    if (response == "success"){
      document.cookie = 'Authorization' + '=' + xhr.getResponseHeader('Authorization') + ';path=/'; 
      alert('로그인연장')

    }
  });
  
};

function profileUpdate() {
  const auth = getToken();

  let image = $('#formGroupExampleInput').val();
  let nickname = $('#formGroupExampleInput2').val();
  let introduction = $('#formGroupExampleInput3').val();

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
      window.location.href = 'http://127.0.0.1:5500/templates/myprofile.html';
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