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

const endingScene = document.querySelector("#endingScene");
const endingText = document.querySelector("#endingText");


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

const memoryAfterDialogues = [

    {
        name: "김솔음",
        text: "......!"
    },

    {
        text: "무언가 할퀴는 소리, 비명."
    },

    {
        text: "그러나, 남은 것은 수묵화 속 풍경뿐이었다."
    },

    {
        name: "김솔음",
        text: "……단순한 그림이 아니야."
    },

    {
        text: "장인석은, 숨결을 불어넣기 위해 무언가와 계약을 했다고 하였다."
    },

    {
        name: "김솔음",
        text: "하지만 그 기억은 장인석의 것으로 보이지 않았어."
    },

    {
        text: "보는 것이 아닌 직감으로 알 수 있었다."
    },

    {
        text: "성인 남성의 높이가 아닌 아이의 시선."
    },

    {
        name: "김솔음",
        text: "그렇다면...... 그건, 누구의."
    },

    {
        name: "김솔음",
        text: "이 그림만으로는 알 수 없어."
    },

    {
        name: "김솔음",
        text: "……다음 그림에도 같은 기억이 남아 있다면, 뭔가 더 알 수 있을지도 몰라."
    }
];

let memoryAfterIndex = 0;


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
        text: "……아무래도 이쪽에 무언가 있는 것 같은데."
    },

    {
        name: "",
        text: "무언가 말을 거는 소리가 들려온다."
    },

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
        text: "아이는 곶감을 좋아하였다."
    },

    {
        text: "작은 손으로 곶감을 쥐고는"
    },

    {
        text: "함박웃음을 지었지."
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
                모든 곶감 대사가 끝나면
                선택지를 띄움
            */

            showPersimmonChoice();

            return;
        }

        if (gameMode === "persimmonListen") {

            if (isTyping) {
                clearTimeout(typingTimer);

                currentTypingElement.textContent =
                    currentTypingText;

                isTyping = false;
                currentTypingText = "";
                currentTypingElement = null;

                return;
            }

            dialogueName.textContent = "";
            dialogueText.textContent = "";

            setTimeout(function () {
                openPasswordPopup();
            }, 300);

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
   기억 이후 솔음 대화
================================================== */

        if (gameMode === "memoryAfter") {

            if (
                memoryAfterIndex <
                memoryAfterDialogues.length - 1
            ) {

                memoryAfterIndex++;

                showDialogue(
                    memoryAfterDialogues[memoryAfterIndex].name,
                    memoryAfterDialogues[memoryAfterIndex].text
                );

            }

            else {

                finishEnding();

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

/* ==========================================================
   검은 화면 클릭
========================================================== */

blackScene.addEventListener(
    "click",
    function (event) {

        /*
            모바일 터치 시
            브라우저 기본 선택/하이라이트 방지
        */

        event.preventDefault();


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
                기억 장면으로 이동
            */

            playMemoryScene();

            return;

        }

    }
);

const memoryScene =
    document.getElementById("memory-scene");

const memoryText =
    document.getElementById("memory-text");

const painting =
    document.querySelector(".painting");

const memoryLines = [
    "낮아진 시야로 보인 것은",
    "거멓게 칠해진 무언가.",
    "안정감을 주는 그것은",
    "손을 들어올려 머리를 쓰다듬었다.",
    "따뜻하게."
];

const glitchDialogues = [

    {
        name: "김솔음",
        text: "■■■■■■■■."
    },

    {
        name: "???",
        text: "■■■……■■."
    }

];

async function playMemoryScene() {

    /* 검은 화면 독백 종료 */
    blackScene.classList.remove("show");

    /* 기억 장면 시작 */
    memoryScene.classList.remove("hidden");

    /* 낮아진 시야 */
    await wait(300);

    painting.classList.add("memory-low-view");

    await wait(1000);


    /* ==========================================
       기억 장면
    ========================================== */

    for (const line of memoryLines) {

        memoryText.style.opacity = 0;

        await wait(350);

        memoryText.textContent = line;

        memoryText.style.opacity = 1;

        await wait(2200);

    }


    memoryText.style.opacity = 0;

    await wait(700);


    /* ==========================================
       기억 속 대화
    ========================================== */

    dialogueBox.classList.add("show");

    for (const dialogue of glitchDialogues) {

        showDialogue(
            dialogue.name,
            dialogue.text
        );

        await wait(1800);
    }

    await wait(300);


    /* 글리치 */
    await playGlitch();


    /* ==========================================
       정신을 차림
    ========================================== */

    memoryScene.classList.add("hidden");

    painting.classList.remove("memory-low-view");


    /* 솔음 대화 시작 */
    gameMode = "memoryAfter";

    memoryAfterIndex = 0;

    dialogueBox.classList.add("show");

    showDialogue(
        memoryAfterDialogues[memoryAfterIndex].name,
        memoryAfterDialogues[memoryAfterIndex].text
    );

}

async function playGlitch() {

    /* ==========================================================
       1차 : 짧은 RGB 깨짐
    ========================================================== */

    memoryScene.classList.add("glitch");

    await wait(90);

    memoryScene.classList.remove("glitch");

    await wait(50);


    /* ==========================================================
       2차 : 화면 조각 생성
    ========================================================== */

    createGlitchSlices();

    memoryScene.classList.add("glitch-heavy");

    await wait(180);

    memoryScene.classList.remove("glitch-heavy");

    await wait(60);


    /* ==========================================================
       3차 : 조각을 한 번 더 크게 깨뜨림
    ========================================================== */

    createGlitchSlices();

    memoryScene.classList.add("glitch-heavy");

    await wait(220);

    memoryScene.classList.remove("glitch-heavy");

    await wait(80);


    /* ==========================================================
       마지막 : 화면 전체가 한 번 크게 무너짐
    ========================================================== */

    createGlitchSlices();

    memoryScene.classList.add("glitch-final");

    await wait(250);

    memoryScene.classList.remove("glitch-final");

    await wait(80);
}

/* ==========================================================
   화면 조각 글리치
========================================================== */

function createGlitchSlices() {

    const sliceCount = 12;

    for (let i = 0; i < sliceCount; i++) {

        const slice = document.createElement("div");

        slice.className = "glitch-slice";

        /*
           화면에서 랜덤한 높이에 조각을 배치
        */

        const top = Math.random() * 100;

        const height = 2 + Math.random() * 10;

        /*
           조각이 움직일 거리
        */

        const moveX =
            (Math.random() - 0.5) * 100;

        const moveY =
            (Math.random() - 0.5) * 8;

        /*
           RGB 색수차
        */

        const rgbType = Math.random();

        if (rgbType < 0.33) {

            slice.classList.add("glitch-red");

        } else if (rgbType < 0.66) {

            slice.classList.add("glitch-blue");

        } else {

            slice.classList.add("glitch-normal");

        }

        slice.style.top = `${top}%`;
        slice.style.height = `${height}%`;

        slice.style.setProperty(
            "--glitch-x",
            `${moveX}px`
        );

        slice.style.setProperty(
            "--glitch-y",
            `${moveY}px`
        );

        /*
           랜덤한 애니메이션 속도
        */

        slice.style.animationDuration =
            `${70 + Math.random() * 160}ms`;

        /*
           랜덤한 시작 지연
        */

        slice.style.animationDelay =
            `${Math.random() * 60}ms`;

        memoryScene.appendChild(slice);

        /*
           잠깐 후 자동 삭제
        */

        setTimeout(function () {

            slice.remove();

        }, 350);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ==========================================================
   엔딩
========================================================== */

async function finishEnding() {

    gameMode = "ending";

    // 마지막 대사를 잠시 보여준다
    await wait(1000);

    // 대화창 사라짐
    dialogueBox.classList.remove("show");

    // 수묵화만 잠시 보여줌
    await wait(1200);

    // 암전
    endingScene.classList.add("show");
}

function showPersimmonChoice() {

    gameMode = "persimmonChoice";

    dialogueName.textContent = "";
    dialogueText.textContent = "";

    const choiceBox =
        document.createElement("div");

    choiceBox.className = "choice-box";

    choiceBox.innerHTML = `
        <button
            type="button"
            class="choice-button"
            id="listenChoice">
            귀를 기울인다
        </button>

        <button
            type="button"
            class="choice-button"
            id="ignoreChoice">
            하지 않는다
        </button>
    `;

    /*
        대화창 안이 아니라
        mobile-screen에 직접 추가
    */

    document
        .querySelector(".mobile-screen")
        .appendChild(choiceBox);


    /*
        귀를 기울인다
    */

    document
        .querySelector("#listenChoice")
        .addEventListener("click", function (event) {

            event.stopPropagation();

            choiceBox.remove();

            gameMode = "persimmonListen";

            showDialogue(
                "김솔음",
                "……귀를 기울여보자."
            );
        });


    /*
        아니다
    */

    document
    .querySelector("#ignoreChoice")
    .addEventListener("click", function (event) {

        event.stopPropagation();

        choiceBox.remove();

        gameMode = "explore";

        dialogueName.textContent = "";
        dialogueText.textContent = "";
        });
}