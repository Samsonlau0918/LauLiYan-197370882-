var currentComment;
function getCommentbycard(card_id){
    var id = {cardId:card_id};
    console.log(id);
    $.ajax({    
        url: "/getComment",
        method: 'POST',
        data: id,
        success: function(result){
            //List comments
            ListCommnet(result);
        }
    })
}

function getCommentcard(card_id){
    console.log(card_id);
    newCardId = card_id;
}

function ListCommnet(comments){
    if (comments){
        $('ul.list-unstyled').empty();
        for(var i=0; i<comments.length; i++){
            var commentsid = comments[i]._id;
            var username = comments[i].userId.username;
            var cardId = comment[i].cardId;
            var strComment = comments[i].comment;

            var $media = $('<div class="media my-4"></dic>');
            var $mediabody = $('<div class="media-body"></div>');
            var $username = $('<h6 class="mt-0 mb-1">' + username + '</h6>');
            var $comment = $('<p>'+strComment+'<p>');
            
            $mediabody.append($username);
            $mediabody.append($comment);
            $media.append($mediabody);
            $('ul.list-unstyled').append($media);
        }
    }
}

function postComment(){
    var comment = $('textarea#comment').val(); 
    console.log(comment);
    console.log(newCardId);
    $.ajax({
        url: "/postcomment",
        method: 'POST',
        data: {cardId:newCardId, comment:comment},
        success: function(result){
            if (result.success_msg){
                alert(result.success_msg);
                $('textarea').val('');
            }else{
                alert(result.err_msg);
            }
        }
    })
}

function showMyComment(comments){
    if (comments){
        $('#my-comment-list').empty();
        for(var i=0; i<comments.length; i++){
            var commentsid = comments[i]._id;
            var username = comments[i].userId.username;
            var cardName = comments[i].cardId.Name;
            var strComment = comments[i].comment;

            
            var btngroup = $('<div></div>');
            var $editbtn = $('<button id="edit_'+ commentsid +'" type="button" class="btn btn-primary btn-sm">Edit</button>');
            var $delbtn = $('<button id="del_'+ commentsid +'" type="button" class="btn btn-primary btn-sm">Delete</button>');
            var $media = $('<div class="media my-4"></dic>');
            var $mediabody = $('<div class="media-body"></div>');
            var $cardName = $('<h6 class="mt-0 mb-1">' + cardName + '</h6>');
            var $comment = $('<p>'+strComment+'<p>');
            
            btngroup.append($editbtn);
            btngroup.append($delbtn);
            $mediabody.append($cardName);
            $mediabody.append($comment);
            $media.append($mediabody);
            $media.append(btngroup);
            
            $('#my-comment-list').append($media);
        }
    }
    delComment();
    editOnClickEvent();
}

function delComment(){
    $('button[id^=del_]').click(function(){
        console.log("Del")
        var commentid = $(this).attr('id');
        var id = commentid.replace('del_', '');
        $.ajax({
            url: "/deletecomment",
            method: 'DELETE',
            data: { _id: id },
            success: function(result){
                if (result.err_msg) 
                    alert(result.err_msg);
                else if (result.success_msg) {
                    alert(result.success_msg);
                    window.location='/user_info';
                }else {

                }
            }
        });
    })
}

function editOnClickEvent(){
    $('button[id^=edit_]').click(function(){
        $('section #editComment .modal').modal('show');
        var id = $(this).attr("id");
        currentComment = id.replace('edit_', '');
        
    })
}

function editcomment(){
    var newcomment = $('#edit-comment').val();
    $.ajax({
        url: "/editcomment",
        method: 'PUT',
        data: { _id: currentComment, newComment: newcomment },
        success: function(result){
            if (result.err_msg) 
                alert(result.err_msg);
            else if (result.success_msg) {
                alert(result.success_msg);
                window.location='/user_info';
            }else {

            }
        }
    });
}