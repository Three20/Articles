
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
          $('<h3>').append('Step 2: Select a tag')
        );
        var grid = $('<div>').addClass('grid');
        grid.append(
          $('<div>').addClass('row').append(
            $('<div>').append(
              $('<div>').addClass('col-4').append('Tag Name')
            ).append(
              $('<div>').addClass('col-4-fill-3').append('Tag SHA1')
            ).append(
              $('<div>').addClass('clearfix')
            )
          )
        );
        for (var tagname in result.tags) {
          var tagsha1 = result.tags[tagname];
          grid.append(
            $('<div>').addClass('row').append(
              $('<div>').append(
                $('<a>').addClass('col-4').append(tagname)
              ).append(
                $('<div>').addClass('col-4-fill-3').append(tagsha1)
              ).append(
                $('<div>').addClass('clearfix')
              )
            )
          );
        }
        
        $('#repoinfo').append(grid);
      }
    });
    
    return false;
  });
});