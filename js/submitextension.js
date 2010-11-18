
$(document).ready(function() {
  $('#submitextension').submit(function() {
    var username = $('#username').val();
    var reponame = $('#reponame').val();
    
    $('#repoinfo').empty();
    $('#repoinfo').append(
      $('<div>').addClass('loading').append('Scouring the tubes...')
    );

    $.ajax({
      url: '/ajax/github/'+username+'/'+reponame,
      dataType: 'json',
      success: function(result) {
        $('#repoinfo').empty();
        if (result.error) {
          $('#repoinfo').append(
            $('<div>').append(result.error)
          );
          return;
        }

        $('#repoinfo').append(
          $('<div>').addClass('metainfo').append(
            $('<div>').addClass('description').append($('<strong>').
              append('Description: ')).
              append(result.description)
          ).append(
            $('<div>').addClass('homepage').append($('<strong>').
              append('Homepage: ')).
              append(result.homepage)
          )
        );
        $('#repoinfo').append(
          $('<div>').addClass('header').append('Available tags')
        );
        $('#repoinfo').append(
          $('<div>').append(
            $('<div>').addClass('tagname').append('Tag Name')
          ).append(
            $('<div>').addClass('tagsha1').append('Tag SHA1')
          )
        );
        for (var tagname in result.tags) {
          var tagsha1 = result.tags[tagname];
          $('#repoinfo').append(
            $('<div>').append(
              $('<div>').addClass('tagname').append(tagname)
            ).append(
              $('<div>').addClass('tagsha1').append(tagsha1)
            )
          );
        }
      }
    });
    
    return false;
  });
});