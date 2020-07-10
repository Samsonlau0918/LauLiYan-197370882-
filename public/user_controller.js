function success_login(){
    let data = {
        email: $("#login-email").val(),
        password: $("#login-password").val()
    };
    $.ajax({
        url: '/login',
        method: 'POSt',
        data: data,
        success: function (result){
            if (result.err_msg){
                alert(result.err_msg);
            }else{
                is_login();
                window.location = '/';
            }
        }
    });
}

function is_login(){
    $.ajax({
        url: '/islogin',
        method: 'GET',
        success: function (user){
            if (user) {
                $("#login-a").hide();
                $('#logout-a').show();
                $('.addTofav').show();
                $('#profile-a').show();
            }else {
                $("#login-a").show();
                $("#logout-a").hide();
                $('.addTofav').hide();
                $('#profile-a').hide();
            }
        }
    });
}

function logout(){
    $.ajax({
        url: '/logout',
        method: 'GET',
        success: function (){
            window.location = "/";
        }
    });
}

function success_register(){
    let user = {
        email: $("#register-email").val(),
        username: $("#register-name").val(),
        password: $("#register-password").val(),
        confirm_password: $("#register-c-password").val()
    };
    $.ajax({
        url: '/register',
        method: 'POST',
        data: user,
        success: function (result){
            if (result.err_msg){
                alert(result.err_msg);
            }else {
                alert(result.success_msg);
                window.location='/';
            }
        }
    });
}

function onchangepwdEvent(){
    $('#change-pwd-btn').click(function(){  
        $('section #changepwd .modal').modal('show');
    });
}

function change_password(){
    let new_pwd = {
        new_password : $('#new-password').val(),
        confirm_password : $('#new-confirm-password').val()
    }
    $.ajax({
        url: '/changepassword',
        method: 'PUT',
        data: new_pwd,
        success: function(result){
            console.log(result);
            if (result.success_msg){
                alert(result.success_msg);
                window.location='/';
            }else{
                alert(result.err_msg);
            }
        }
    });
};

function checkfav(){
    $.ajax({
        url: '/getmyfavcard',
        method: 'GET',
        success: function (result){
            console.log(result);
            if (result.length>0){
                result.forEach(function(card) {
                    console.log( card.cardId );
                    $('img#fav_' + card.cardId._id).attr('src', 'yellowstar.png');
                });
            }
        }
    })
}

function getMyName(){
    $.ajax({
        url: '/userprofile',
        method: 'GET',
        success: function (result){
            $('#current-user-name').text(result.username);
        }
    });
}

function getMyCard(){
    $.ajax({
        url: '/getmyfavcard',
        method: 'GET',
        success: function (result){
            if (result.err_msg){
                alert(result.err_msg);
            }else {
                showMyCard(result);
            }
        }
    });
}


function getMyComment(){
    $.ajax({
        url: '/mycomments',
        method: 'GET',
        success: function (result){
            if (result.err_msg){
                alert(result.err_msg);
            }else {
                showMyComment(result);
            }
        }
    });
}