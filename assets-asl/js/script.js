$(document).ready(function() {
    // Preload videos to cache
    function preloadVideos(videos) {
        videos.forEach(function(video) {
            $('<video>').attr('src', 'assets-asl/' + video.source).appendTo('body').css('display', 'none');
        });
    }

    // Function to display video when a button is clicked
    function displayVideo(source, name) {
        $('#video').attr('src', source);
        $('#logo').hide(); // Hide the logo
        $('#video').show(); // Show the video
        $('#selected-video-info').html('<p>Word/Sentence: ' + name + ' <button id="replayButton" class="btn btn-warning text-light"><i class="fa-solid fa-rotate-right"></i></button></p>');
        $('#video').prop('controls', false);

        // Play speech when video is displayed
        playSpeech(name);
    }

    // Function to play speech
    function playSpeech(name) {
        // Cancel any ongoing speech synthesis
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(name);
        window.speechSynthesis.speak(utterance);
    }

    // Load videos from JSON file
    $.getJSON('assets-asl/videos.json', function(data) {
        // Preload videos to cache
        preloadVideos(data);

        $.each(data, function(index, video) {
            var videoButton = $('<button>')
                .addClass('btn btn-warning mb-2 video-btn csm-space text-light')
                .text(video.name)
                .click(function() {
                    displayVideo('assets-asl/' + video.source, video.name);
                });
            $('#video-buttons').append(videoButton);
        });
    });

    // Search functionality
    $('#searchInput').on('input', function() {
        var searchQuery = $(this).val().toLowerCase();
        $('.video-btn').each(function() {
            var buttonName = $(this).text().toLowerCase();
            if (buttonName.includes(searchQuery)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Replay button functionality
    $('#video-buttons').on('click', '#replayButton', function() {
        var videoElement = $('#video')[0];
        videoElement.currentTime = 0;
        videoElement.play();
        var name = $('#selected-video-info').text().replace('Word/Sentence: ', '').trim();
        playSpeech(name);
    });
});
