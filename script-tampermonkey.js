// ==UserScript==
// @name         Remove Protector Links animesonline.org
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  none
// @author       joseviniciusdev
// @match        https://animesonline.org/filmes/*
// @icon         https://www.google.com/s2/favicons?domain=animesonline.org
// @grant        none
// ==/UserScript==

$(document).ready(function(){
    function loadPlayer(){
        setTimeout(function(){
            $('.source-box.on .pframe a').each(function(){
                let href = $(this).attr('href');
                let parent = $(this).parent();


                const env = { url: href };

                $(this).parent().html('<iframe />');

                $.ajax({
                    method: 'POST',
                    //url: 'https://get-player.herokuapp.com/return-player',
                    url: 'http://localhost:3000/return-player',
                    data: JSON.stringify(env),
                    contentType: "application/json; charset=utf-8",
                    traditional: true,
                    success: function(res){
                        $('.source-box.on .pframe').html(`<iframe src="${res.player}" allowfullscreen />`);
                    },
                    error: function(){
                        console.log('error server')
                    }
                })

            });
        },200);
    }

  setTimeout(function(){
    $('.dooplay_player_option').on('click', () => loadPlayer());
  },100)

setTimeout(function(){
    loadPlayer();
  },800)
});