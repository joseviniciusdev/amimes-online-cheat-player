// ==UserScript==
// @name         Remove Protector Links animesonline.org
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://animesonline.org/episodio/*
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

                    $.ajax({
                        method: 'POST',
                        url: 'https://get-player.herokuapp.com/return-player',
                        data: JSON.stringify(env),
                        contentType: "application/json; charset=utf-8",
                        traditional: true,
                        success: function(res){
                            $('.source-box.on .pframe').html(`<iframe src="${res.player}" />`);
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
});
