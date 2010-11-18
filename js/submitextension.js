
$(document).ready(function() {
  
  var tag_click = function(username, reponame, tagname) {
    $('#step3').empty();

    $('#step3').append(
      $('<h2>').append('Step 3: Submit your extension')
    );
    
    $('#step3').append(
      $('<div>').addClass('metainfo'
      ).append(
        $('<div>').append($('<strong>').append('User Name: ')).append(username)
      ).append(
        $('<div>').append($('<strong>').append('Repo name: ')).append(reponame)
      ).append(
        $('<div>').append($('<strong>').append('Tag name: ')).append(tagname)
      )
    );
    
    $('#step3').append(
      $('<form>').attr('action', '/extensions/create').attr('method', 'POST').append(
        $('<input>').attr('type', 'hidden').attr('name', 'username').attr('value', username)
      ).append(
        $('<input>').attr('type', 'hidden').attr('name', 'reponame').attr('value', reponame)
      ).append(
        $('<input>').attr('type', 'hidden').attr('name', 'tagname').attr('value', tagname)
      ).append(
        $('<input>').attr('type', 'submit').attr('value', 'Submit Extension')
      )
    );
  };

  $('#submitextension').submit(function() {
    var username = $('#username').val();
    var reponame = $('#reponame').val();
    
    $('#step2').empty();
    $('#step3').empty();
    $('#step2').append(
      $('<div>').addClass('loading').append('Scouring the tubes...')
    );

    $.ajax({
      url: '/ajax/github/'+username+'/'+reponame,
      dataType: 'json',
      success: function(result) {
        $('#step2').empty();
        if (result.error) {
          $('#step2').append(
            $('<div>').append(result.error)
          );
          return;
        }

        $('#step2').append(
          $('<div>').addClass('metainfo').append(
            $('<div>').append(
              $('<strong>').append('Description: ')).
              append(result.description)
          ).append(
            $('<div>').addClass('homepage').append($('<strong>').
              append('Homepage: ')).
              append(result.homepage)
          )
        );
        $('#step2').append(
          $('<h2>').append('Step 2: Select a tag')
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
          var click_method = function(e) {
            tag_click(username, reponame, e.data.tagname);
          };
          grid.append(
            $('<div>').addClass('row').append(
              $('<div>').append(
                $('<a>').addClass('col-4').append(tagname).bind('click', {tagname: tagname}, click_method)
              ).append(
                $('<div>').addClass('col-4-fill-3').append(tagsha1)
              ).append(
                $('<div>').addClass('clearfix')
              )
            )
          );
        }
        
        $('#step2').append(grid);
      }
    });
    
    return false;
  });
});