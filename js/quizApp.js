 var quiztitle = "Horror Movie Quiz";


 var quiz = [
        {
            "question" : "Q1: The Omen - Who played Damien's father Robert Thorn in this 1976 horror classic?",
            "image" : "http://i.imgur.com/WrCsYvr.jpg",
            "choices" : [
                                    "1) William Holden",
                                    "2) John Cassavetes",
                                    "3) Gregory Peck",
                                    "4) Sam Neill",
                                    "5) George C. Scott"
                                ],
            "correct" : "3) Gregory Peck",
            "explanation" : "Peck only took a fee of $250,000 for his role but he also got 10% of the gross.",
        },
        {
            "question" : "Q2: Jaws - where did these shark attacks take place?",
            "image" : "http://i.imgur.com/w4Zly8c.jpg",
            "choices" : [
                                    "1) Long Island",
                                    "2) Oceanside",
                                    "3) Amityville",
                                    "4) Lindenhurst",
                                    "5) Coney Island"
                                ],
            "correct" : "3) Amityville",
            "explanation" : "Amityville was also well known for the location for another horror flick, The Amityville Horror.",
        },
        {
            "question" : "Q3: Which of these were true for The Exorcist?",
            "image" : "http://i.imgur.com/dft2aFk.jpg",
            "choices" : [
                                    "1) received an Academy Award Nomination for Best Picture",
                                    "2) had to issue bodyguards for its stars to protect them from religious groups",
                                    "3) became highest grossing R-rated file for a major studio",
                                    "4) had to have its posters removed from theatres because of their affect on people",
                                    "5) All of the above"
                                ],
            "correct" : "5) All of the above",
            "explanation" : "The Exorcist actually achieved all of these groundbreaking facts when it was released.",
        },
        {
            "question" : "Q4: Texas Chainsaw Massacre - Due to limited funds, Director Tobe Hooper had to pay narrator John Larroquette with ",
            "image" : "http://i.imgur.com/wTo5akJ.jpg",
            "choices" : [
                                    "1) food and booze",
                                    "2) biggest trailer on set",
                                    "3) post dated check",
                                    "4) acting lessons",
                                    "5) marijuana"
                                ],
            "correct" : "5) marijuana",
            "explanation" : "Larroquette was paid with marijuana because of the limited budget and he also went on to star and win awards in TV's series 'Night Court',"
        },
        {
            "question" : "Q5: Halloween - Which actor's face was used to make the infamous mask Michael Myers wore in the film?",
            "image" : "http://i.imgur.com/262H8Xc.jpg",
            "choices" : [
                                    "1) Leonard Nimoy",
                                    "2) Burt Reynolds",
                                    "3) Jack Nicholson",
                                    "4) William Shatner",
                                    "5) Clint Eastwood"
                                ],
            "correct" : "4) William Shatner",
            "explanation" : "William Shatner had no idea that the famous mask was a Star Trek one used for filming because it only costs $2 until an interview many years later",
        },
        {
            "question" : "Q6: The Shining - To get past MPAA restrictions, what did Stanley Kubrick tell them he was using in the infamous elevator scenes?",
            "image" : "http://i.imgur.com/pF2goep.jpg",
            "choices" : [
                                    "1) tomato juice",
                                    "2) water and food coloring",
                                    "3) rusty water",
                                    "4) corn syrup and dye",
                                    "5) Kensington gore"
                                ],
            "correct" : "3) rusty water",
            "explanation" : "Kubrick had to lie and tell the MPAA that he was portraying rusty water not blood in order for the previews to be shown",
        },

    ];


 var currentquestion = 0,
     score = 0,
     submt = true,
     picked;

 jQuery(document).ready(function ($) {


     function htmlEncode(value) {
         return $(document.createElement('div')).text(value).html();
     }


     function addChoices(choices) {
         if (typeof choices !== "undefined" && $.type(choices) == "array") {
             $('#choice-block').empty();
             for (var i = 0; i < choices.length; i++) {
                 $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
             }
         }
     }

     function nextQuestion() {
         submt = true;
         $('#explanation').empty();
         $('#question').text(quiz[currentquestion]['question']);
         $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
         if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
             if ($('#question-image').length == 0) {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
             } else {
                 $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
             }
         } else {
             $('#question-image').remove();
         }
         addChoices(quiz[currentquestion]['choices']);
         setupButtons();


     }


     function processQuestion(choice) {
         if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
             $('.choice').eq(choice).css({
                 'background-color': '#50D943'
             });
             $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
             score++;
         } else {
             $('.choice').eq(choice).css({
                 'background-color': '#D92623'
             });
             $('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
         }
         currentquestion++;
         $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function () {
             if (currentquestion == quiz.length) {
                 endQuiz();
             } else {
                 $(this).text('Check Answer').css({
                     'color': '#222'
                 }).off('click');
                 nextQuestion();
             }
         })
     }


     function setupButtons() {
         $('.choice').on('mouseover', function () {
             $(this).css({
                 'background-color': '#e1e1e1'
             });
         });
         $('.choice').on('mouseout', function () {
             $(this).css({
                 'background-color': '#fff'
             });
         })
         $('.choice').on('click', function () {
             picked = $(this).attr('data-index');
             $('.choice').removeAttr('style').off('mouseout mouseover');
             $(this).css({
                 'border-color': '#222',
                 'font-weight': 700,
                 'background-color': '#c1c1c1'
             });
             if (submt) {
                 submt = false;
                 $('#submitbutton').css({
                     'color': '#000'
                 }).on('click', function () {
                     $('.choice').off('click');
                     $(this).off('click');
                     processQuestion(picked);
                 });
             }
         })
     }


     function endQuiz() {
         $('#explanation').empty();
         $('#question').empty();
         $('#choice-block').empty();
         $('#submitbutton').remove();
         $('#question-image').remove();
         $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
         $(document.createElement('h2')).css({
             'text-align': 'center',
             'font-size': '4em'
         }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
     }


     function init() {
         //add title
         if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
             $(document.createElement('h1')).text(quiztitle).appendTo('#quizAppContent');
         } else {
             $(document.createElement('h1')).text("Quiz").appendTo('#quizAppContent');
         }

         //add pager and questions
         if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
             //add pager
             $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#quizAppContent');
             //add first question
             $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#quizAppContent');
             //add image if present
             if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
                 $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#quizAppContent');
             }
             $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#quizAppContent');

             //questions holder
             $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#quizAppContent');

             //add choices
             addChoices(quiz[0]['choices']);

             //add submit button
             $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({
                 'font-weight': 700,
                 'color': '#222',
                 'padding': '30px 0'
             }).appendTo('#quizAppContent');

             setupButtons();
         }
     }

     init();
 });