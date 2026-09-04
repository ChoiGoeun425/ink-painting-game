/* ==========================================================
   초자연 재난관리국
   사이트 01 - 탐사 화면
========================================================== */


/* ==========================================================
   DOM 요소
========================================================== */

const paintingArea =
    document.querySelector(".painting-area");

const dialogueBox =
    document.querySelector(".dialogue-box");

const dialogueName =
    document.querySelector(".dialogue-name");

const dialogueText =
    document.querySelector(".dialogue-text");

const objects =
    document.querySelectorAll(".object");


/* ==========================================================
   팝업 요소
========================================================== */

const passwordOverlay =
    document.querySelector(".password-overlay");

const passwordInput =
    document.querySelector("#passwordInput");

const passwordButton =
    document.querySelector("#passwordButton");

const passwordError =
    document.querySelector(".password-error");


/* ==========================================================
   검은 화면 요소
========================================================== */

const blackScene =
    document.querySelector(".black-scene");

const blackDialogueBox =
    document.querySelector("#blackDialogue");

const blackDialogueName =
    document.querySelector(".black-dialogue-name");

const blackDialogueText =
    document.querySelector(".black-dialogue-text");


/* ==========================================================
   게임 상태
========================================================== */

// story
// explore
// persimmon
// black

let gameMode = "story";


/* ==========================================================
   스토리 대사
========================================================== */

const storyDialogues = [

    {
        name: "김솔음",
        text: "......여긴."
    },

    {
        name: "",
        text: "내부의 풍경은 수묵화를 눈 앞에 그대로 옮겨놓은 듯한 느낌이었다."
    },

    {
        name: "김솔음",
        text: "실종된 사람들도, 이렇게 사라진 건가."
    },

    {
        name: "김솔음",
        text: "일단 주변을 조사해보자."
    }

];

let storyIndex = 0;


/* ==========================================================
   곶감 대사
========================================================== */

const persimmonDialogues = [

    {
        name: "김솔음",
        text: "……유독 이 곶감만 색이 칠해져 있어."
    },

    {
        name: "",
        text: "먹으로 가득 찬 풍경 속, 색이 남아있는 물체. 누군가 일부러 그려 넣은 것이 틀림없다."
    },

    {
        name: "김솔음",
        text: "……아무래도 탈출하려면 이쪽을 이용해야 하나 본데."
    },

    {
        name: "",
        text: "무언가 말을 거는 소리가 들려온다."
    },

    {
        name: "김솔음",
        text: "귀를 기울여보자."
    }

];

let persimmonStep = 0;

const wrongAnswerDialogues = [

    {
        text: "……장인석은 본인의 그림에 자부심이 있는 사람이었다."
    },

    {
        name: "김솔음",
        text: "일기장에도 적혀 있었지."
    },

    {
        name: "김솔음",
        text: "자신의 그림에 대한 평가는 전부 모아뒀다라고."
    },

    
    {
        name: "김솔음",
        text: "그걸 떠올려본다면, 이 문제의 답도 알아낼 수 있을 거야."
    }

];

let wrongAnswerStep = 0;


/* ==========================================================
   타이핑 관련 변수
========================================================== */

let isTyping = false;

let typingTimer = null;

let currentTypingText = "";

let currentTypingElement = null;


/* ==========================================================
   검은 화면 대사
========================================================== */

const blackDialogues = [

    {
        name: "김솔음",
        text: "호랑이와 곶감."
    },

    {
        name: "김솔음",
        text: "장인석이 그려낸 그림은 제각각 모티브가 있다고 했어."
    },

    {
        name: "김솔음",
        text: "그렇다면 이 곶감과 호랑이에도 의미가 있겠지."
    },

    {
        name: "김솔음",
        text: "그리고 마지막의 그 독백은... 무슨 의미지?"
    }

];

let blackDialogueIndex = 0;


/* ==========================================================
   타이핑 함수
========================================================== */

function typeText(element, text, speed = 45) {

    clearTimeout(typingTimer);

    element.textContent = "";

    let index = 0;

    isTyping = true;

    currentTypingText = text;

    currentTypingElement = element;


    function typing() {

        if (index < text.length) {

            element.textContent +=
                text.charAt(index);

            index++;

            typingTimer =
                setTimeout(
                    typing,
                    speed
                );

        }

        else {

            isTyping = false;

            currentTypingText = "";

            currentTypingElement = null;

        }

    }


    typing();

}


/* ==========================================================
   대사 출력
========================================================== */

function showDialogue(name, text) {

    dialogueName.textContent =
        name || "";

    typeText(
        dialogueText,
        text
    );

}


/* ==========================================================
   스토리 대사 출력
========================================================== */

function showStoryDialogue() {

    const dialogue =
        storyDialogues[storyIndex];


    if (!dialogue) {
        return;
    }


    showDialogue(
        dialogue.name,
        dialogue.text
    );

}


/* ==========================================================
   탐색 시작
========================================================== */

function startExploration() {

    gameMode = "explore";

    paintingArea.classList.add("ready");

}


/* ==========================================================
   초기 스토리 시작
========================================================== */

function startStory() {

    gameMode = "story";

    storyIndex = 0;

    paintingArea.classList.remove("ready");

    showStoryDialogue();

}


/* ==========================================================
   화면 로딩 후 시작
========================================================== */

window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                dialogueBox.classList.add("show");

                startStory();

            },
            5700
        );

    }
);


/* ==========================================================
   대화창 클릭
========================================================== */

dialogueBox.addEventListener(
    "click",
    function () {


        /* ==================================================
           1. 타이핑 중이면 문장 완성
        ================================================== */

        if (isTyping) {

            clearTimeout(typingTimer);

            currentTypingElement.textContent =
                currentTypingText;

            isTyping = false;

            currentTypingText = "";

            currentTypingElement = null;

            return;

        }


        /* ==================================================
           2. 곶감 이벤트
        ================================================== */

        if (gameMode === "persimmon") {


            /*
                곶감 설명 이후
                곶감 대사 배열을 하나씩 출력
            */

            if (
                persimmonStep <
                persimmonDialogues.length
            ) {

                const dialogue =
                    persimmonDialogues[
                    persimmonStep
                    ];

                persimmonStep++;


                /*
                    이전 글자를 먼저 지움
                */

                dialogueName.textContent = "";

                dialogueText.textContent = "";


                /*
                    다음 대사 출력
                */

                showDialogue(
                    dialogue.name,
                    dialogue.text
                );


                return;

            }


            /*
                모든 곶감 대사가 끝났으면
                다시 터치했을 때 글자를 지우고
                팝업을 띄움
            */

            dialogueName.textContent = "";

            dialogueText.textContent = "";


            setTimeout(
                function () {

                    openPasswordPopup();

                },
                300
            );


            return;

        }


        /* ==================================================
           3. 일반 스토리
        ================================================== */

        if (gameMode === "story") {


            /*
                다음 스토리 대사
            */

            if (
                storyIndex <
                storyDialogues.length - 1
            ) {

                storyIndex++;

                showStoryDialogue();

            }


            /*
                마지막 대사 이후
                탐색 모드
            */

            else {

                dialogueName.textContent = "";

                dialogueText.textContent = "";

                startExploration();

            }


            return;

        }

        /* ==================================================
   오답 대사
================================================== */

        if (gameMode === "wrongAnswer") {

            if (
                wrongAnswerStep <
                wrongAnswerDialogues.length - 1
            ) {

                wrongAnswerStep++;

                showDialogue(
                    wrongAnswerDialogues[wrongAnswerStep].name,
                    wrongAnswerDialogues[wrongAnswerStep].text
                );

            }

            else {

                dialogueName.textContent = "";
                dialogueText.textContent = "";

                gameMode = "explore";

            }

            return;

        }

        /* ==================================================
           4. 탐색 모드
        ================================================== */

        if (gameMode === "explore") {

            /*
                일반 오브젝트 대사를
                한 번 더 터치하면 지움
            */

            dialogueName.textContent = "";

            dialogueText.textContent = "";

            return;

        }

    }
);


/* ==========================================================
   오브젝트 클릭
========================================================== */

objects.forEach(
    function (object) {

        object.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                /*
                    탐색 상태가 아니면 클릭 불가
                */

                if (gameMode !== "explore") {
                    return;
                }


                const name =
                    object.dataset.name;

                const text =
                    object.dataset.text;


                /* ==================================================
                   곶감
                ================================================== */

                if (name === "곶감") {

                    gameMode = "persimmon";

                    persimmonStep = 0;


                    /*
                        곶감 오브젝트 자체의 설명
                        먼저 출력
                    */

                    showDialogue(
                        name,
                        text
                    );


                    return;

                }


                /* ==================================================
                   일반 오브젝트
                ================================================== */

                showDialogue(
                    name,
                    text
                );

            }
        );

    }
);


/* ==========================================================
   팝업 열기
========================================================== */

function openPasswordPopup() {

    passwordOverlay.classList.add("show");

    passwordInput.value = "";

    passwordError.textContent = "";


    setTimeout(
        function () {

            passwordInput.focus();

        },
        100
    );

}


/* ==========================================================
   팝업 닫기
========================================================== */

function closePasswordPopup() {

    passwordOverlay.classList.remove("show");

}


/* ==========================================================
   정답 확인
========================================================== */

function checkPassword() {

    const answer =
        passwordInput.value.trim();


    /* ==================================================
       정답
    ================================================== */

    if (answer === "호랑이와 곶감") {

        closePasswordPopup();

        startBlackScene();

        return;

    }


    /* ==================================================
       오답
    ================================================== */

    if (answer !== "") {

        closePasswordPopup();

        gameMode = "wrongAnswer";

        paintingArea.classList.add("ready");

        wrongAnswerStep = 0;

        showDialogue(
            wrongAnswerDialogues[wrongAnswerStep].name,
            wrongAnswerDialogues[wrongAnswerStep].text
        );

        return;

    }


    /* ==================================================
       빈칸
    ================================================== */

    passwordError.textContent =
        "답을 입력해주세요.";

}


/* ==========================================================
   확인 버튼
========================================================== */

passwordButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        checkPassword();

    }
);


/* ==========================================================
   엔터키
========================================================== */

passwordInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            checkPassword();

        }

    }
);


/* ==========================================================
   검은 화면 시작
========================================================== */

function startBlackScene() {

    gameMode = "black";

    blackDialogueIndex = 0;

    blackScene.classList.add("show");


    setTimeout(
        function () {

            showBlackDialogue();

        },
        800
    );

}


/* ==========================================================
   검은 화면 대사 출력
========================================================== */

function showBlackDialogue() {

    const dialogue =
        blackDialogues[
        blackDialogueIndex
        ];


    if (!dialogue) {
        return;
    }


    blackDialogueName.textContent =
        dialogue.name;


    typeText(
        blackDialogueText,
        dialogue.text
    );

}


/* ==========================================================
   검은 화면 클릭
========================================================== */

blackDialogueBox.addEventListener(
    "click",
    function () {


        /* ==================================================
           타이핑 중이면 문장 완성
        ================================================== */

        if (isTyping) {

            clearTimeout(typingTimer);

            currentTypingElement.textContent =
                currentTypingText;

            isTyping = false;

            currentTypingText = "";

            currentTypingElement = null;

            return;

        }


        /* ==================================================
           다음 검은 화면 대사
        ================================================== */

        if (
            blackDialogueIndex <
            blackDialogues.length - 1
        ) {

            blackDialogueIndex++;

            showBlackDialogue();

        }

        else {

            /*
                마지막 대사 이후
                나중에 추가 가능
            */

            return;

        }

    }
);