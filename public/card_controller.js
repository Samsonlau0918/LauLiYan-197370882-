
function getCardData(){
    $.ajax({
        url: "/allcard",
        method: "GET",
        error: function(err){
            console.log(err);
        },
        success: function(result){
            showAllCard(result);
        }
    });
}

function showAllCard(result){
    for (var i=0; i< result.length ; i++) {
        var card_id = result[i]._id;
        var card_num = result[i].Card_Num;
        var card_name = result[i].Name;
        var card_type = result[i].Type;
        var card_des = result[i].DES;
        var card_ap = result[i].AP;
        var card_dp = result[i].DP;
        var card_cost = result[i].COST;
        var card_img = result[i].IMG_URL;

        var col = $('<div class="col mb-4" id="card_' + card_id + '"></div>');
        var $card = $('<div class="card" id="' + card_id + '"></div>');
        var $card_img = $('<img src="'+ card_img + '" class="card-img-top">');
        var $div_header = $('<div></div>');
        var $card_title = $('<h5 class="card-title">'+ card_num + ' ' + card_name +'</h5>');
        var $fav = $('<img id="fav_'+ card_id +'" class="addTofav" src="star.png"/>');
        
        $div_header.append($card_title);
        $card_title.append($fav);
        $card.append($div_header);
        $card.append($card_img);
        col.append($card);
        $("#post-card").append(col);


        console.log(result[i]);
    };
    favHandler();
    cardOnclickEvent();
}

function showMyCard(result){
    for (var i=0; i< result.length ; i++) {
        var card_id = result[i]._id;
        var card_num = result[i].cardId.Card_Num;
        var card_name = result[i].cardId.Name;
        var card_img = result[i].cardId.IMG_URL;

        var col = $('<div class="col mb-4" id="myCard"></div>');
        var $card = $('<div class="card" id="' + card_id + '"></div>');
        var $card_img = $('<img src="'+ card_img + '" class="card-img-top">');
        var $div_header = $('<div></div>');
        var $card_title = $('<h5 class="card-title">'+ card_num + ' ' + card_name +'</h5>');
        var $fav = $('<img id="fav_'+ card_id +'" class="addTofav" src="yellowstar.png"/>');
        
        $div_header.append($card_title);
        $card_title.append($fav);
        $card.append($div_header);
        $card.append($card_img);
        col.append($card);
        $("#post-my-card").append(col);

    };
    favHandler();
}


function add_To_Fav(card_Id){
    $.ajax({
        url: '/addfavcard',
        method: 'POST',
        data: { cardId: card_Id },
        success: function(result){
            if (result.success_msg) {
                alert(result.success_msg);
            }else if (result.err_msg) {
                alert(err_msg);
            }else {
                alert("There are some problem to add a new favourite card");
            }
        }
    })
}

function del_From_Fav(card_Id){
    $.ajax({
        url: '/deletecard',
        method: 'DELETE',
        data: { cardId: card_Id },
        success: function(result){
            if (result.success_msg) {
                alert(result.success_msg);
            }else {
                alert(result.err_msg);
            }
        }
    })
}

function favHandler(){
    $('.addTofav').click(function(){
        var status = $(this).attr('src');
        var id = $(this).attr('id');
        var card_Id = id.replace('fav_', '');
        var added_status = 'yellowstar.png';
        var no_status = 'star.png';
        if (status === no_status){
            add_To_Fav(card_Id);
            $(this).attr('src', added_status);
        }else {
            del_From_Fav(card_Id);
            $(this).attr('src', no_status);
        }
    })
}

function cardOnclickEvent(){
    $('.card').click(function(){
        $('section#comment .modal').modal('show');
        var id = $(this).attr('id');
        var card_Id = id.replace('fav_', '');
        getCommentbycard(card_Id);
        getCommentcard(card_Id);
        console.log(card_Id)
    })
}

