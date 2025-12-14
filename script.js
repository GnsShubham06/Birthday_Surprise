let currentPage = 1;

function goToPage(pageNumber) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const nextPage = document.getElementById("page" + pageNumber);
  nextPage.classList.add("active");
  currentPage = pageNumber;

  if (pageNumber === 2) {
    startTyping();
    startLetterDecor(); // start emojis
  } else {
    stopLetterDecor(); // stop emojis on other pages
  }
}

/* Typing effect */
const letter = `Happy Birthday Mochiiiii!!! 💖

Today isn’t just your birthday…
it’s a reminder of how special you are.

The way you smile,
the way you care,
the way you make everything feel lighter —
it all means more to me than you’ll ever know.

I hope this little surprise
makes you feel as loved
as you truly are ✨`;

let index = 0;
const speed = 40;

function startTyping() {
  const textElement = document.getElementById("letterText");
  const continueBtn = document.getElementById("continueBtn");

  textElement.innerHTML = "";
  continueBtn.style.display = "none";
  index = 0;

  const typingInterval = setInterval(() => {
    if (index < letter.length) {
      textElement.innerHTML += letter.charAt(index);
      index++;

      if (Math.random() > 0.85) createSparkle();
    } else {
      clearInterval(typingInterval);
      continueBtn.style.display = "inline-block"; // show button when done
    }
  }, speed);
}

/* Sparkle effect */
function createSparkle() {
  const sparkle = document.createElement("span");
  sparkle.innerHTML = "✨";
  
  const wrapper = document.querySelector(".letter-wrapper");
  const wrapperRect = wrapper.getBoundingClientRect();
  
  sparkle.style.left = Math.random() * wrapperRect.width + "px";
  sparkle.style.top = Math.random() * wrapperRect.height + "px";
  sparkle.style.fontSize = Math.random() * 20 + 10 + "px";
  sparkle.style.opacity = 0.8;
  sparkle.style.position = "absolute";
  
  document.querySelector(".sparkles").appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 2000);
}

const emojis = ["💖", "✨", "💕", "🎉", "🎂", "🌸", "🥳", "💌"];

function createLetterDecor() {
  const decorContainer = document.querySelector(".letter-decor");
  const emoji = document.createElement("span");
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.left = Math.random() * 90 + "vw";
  emoji.style.top = Math.random() * 80 + "vh";
  emoji.style.fontSize = (Math.random() * 24 + 16) + "px";

  decorContainer.appendChild(emoji);

  setTimeout(() => emoji.remove(), 3000);
}

let decorInterval;
function startLetterDecor() {
  decorInterval = setInterval(createLetterDecor, 200);
}

function stopLetterDecor() {
  clearInterval(decorInterval);
}

let nextAction = "";

// Choice page logic
function chooseAction(action) {
  nextAction = action;
  if(action === "cake") {
    goToPage(4); // cake first
  } else {
    goToPage(5); // wish first
  }
}

/* After cake or wish, go to the other page if needed */
function afterCake() {
  if(nextAction === "cake") {
    goToPage(5); // show wish next
  } else {
    goToFinal();
  }
}

function afterWish() {
  if(nextAction === "wish") {
    goToPage(4); // show cake next
  } else {
    goToFinal();
  }
}

/* Final page */
function goToFinal() {
  goToPage(6); // final letter / surprise page
}

/* --------- Cake Cutting Page --------- */
const cakeImage = document.getElementById("cakeImage");
const cakeMessage = document.getElementById("cakeMessage");
const cakeContinue = document.getElementById("cakeContinue");
const cakeEmojisContainer = document.querySelector(".cake-emojis");

let cakeCut = false;

cakeImage.addEventListener("mousemove", () => {
  if (!cakeCut) {
    cakeCut = true;
    cakeImage.style.transform = "scale(0.95) rotate(-10deg)";
    setTimeout(() => {
      cakeMessage.textContent = "Yayyyy! Happy Birthday Mochii! 💖";
      cakeMessage.classList.remove("hidden");
      cakeContinue.classList.remove("hidden");
    }, 600);

    for(let i=0; i<30; i++){
      setTimeout(createCakeEmoji, i*100);
    }
  }
});

function createCakeEmoji() {
  const emojiList = ["🎉","💖","✨","🎈","🍬","💝"];
  const emoji = document.createElement("span");
  emoji.textContent = emojiList[Math.floor(Math.random()*emojiList.length)];
  emoji.style.left = Math.random()*window.innerWidth + "px";
  emoji.style.top = Math.random()*window.innerHeight + "px";
  emoji.style.position = "absolute";
  emoji.style.fontSize = Math.random()*25+15 + "px";
  emoji.style.opacity = 0.8;
  emoji.style.transition = "all 2s ease";
  cakeEmojisContainer.appendChild(emoji);

  setTimeout(() => {
    emoji.style.transform = "translateY(-60px) scale(0.5)";
    emoji.style.opacity = 0;
  }, 50);

  setTimeout(() => emoji.remove(), 2000);
}

cakeContinue.addEventListener("click", afterCake);

/* --------- Wish Page --------- */
const blowButton = document.getElementById("blowButton");
const candles = document.querySelectorAll(".candle");
const wishMessage = document.getElementById("wishMessage");
const wishContinue = document.getElementById("wishContinue");
const wishEmojisContainer = document.querySelector(".wish-emojis");

blowButton.addEventListener("click", () => {
  candles.forEach(candle => candle.style.opacity = 0);
  wishMessage.textContent = "Your wish is safe with me and will come true 💖";
  blowButton.style.display = "none";

  wishContinue.classList.remove("hidden");
  wishContinue.style.display = "inline-block";

  for(let i=0; i<30; i++){
    setTimeout(createWishEmoji, i*100);
  }
});

wishContinue.addEventListener("click", afterWish);

function createWishEmoji() {
  const emojiList = ["✨","💖","🎉","🎈","💝"];
  const emoji = document.createElement("span");
  emoji.textContent = emojiList[Math.floor(Math.random()*emojiList.length)];
  emoji.style.left = Math.random()*window.innerWidth + "px";
  emoji.style.top = Math.random()*window.innerHeight + "px";
  emoji.style.position = "absolute";
  emoji.style.fontSize = Math.random()*25+15 + "px";
  emoji.style.opacity = 0.8;
  emoji.style.transition = "all 2s ease";
  wishEmojisContainer.appendChild(emoji);

  setTimeout(() => {
    emoji.style.transform = "translateY(-60px) scale(0.5)";
    emoji.style.opacity = 0;
  }, 50);

  setTimeout(() => emoji.remove(), 2000);
}

// SONG SELECTION FUNCTIONALITY (CARD CLICK)
const songCards = document.querySelectorAll(".song-card");
const songContinue = document.getElementById("songContinue");
const songEmojisContainer = document.querySelector(".song-emojis");

let currentAudio = null;

songCards.forEach(card => {
  const audioSrc = card.getAttribute("data-song");

  card.addEventListener("click", () => {

    // stop previous song
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // remove playing state from all cards
    songCards.forEach(c => c.classList.remove("playing"));

    // play new song
    currentAudio = new Audio(audioSrc);
    currentAudio.play();

    // mark current card as playing
    card.classList.add("playing");

    // show continue button
    songContinue.classList.remove("hidden");
    songContinue.style.display = "inline-block";

    // emoji popups
    for (let i = 0; i < 30; i++) {
      setTimeout(createSongEmoji, i * 150);
    }
  });
});

// Emoji function
function createSongEmoji() {
  const emojiList = ["💖", "✨", "🎉", "🎈", "🌸", "🥳"];
  const emoji = document.createElement("span");
  emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.top = Math.random() * window.innerHeight + "px";
  emoji.style.position = "absolute";
  emoji.style.fontSize = Math.random() * 25 + 15 + "px";
  emoji.style.opacity = 0.8;
  emoji.style.transition = "all 2s ease";
  songEmojisContainer.appendChild(emoji);

  setTimeout(() => {
    emoji.style.transform = "translateY(-60px) scale(0.5)";
    emoji.style.opacity = 0;
  }, 50);

  setTimeout(() => emoji.remove(), 2000);
}

// Floating mini emojis on song card hover
songCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    for (let i = 0; i < 5; i++) { // 5 mini emojis per hover
      createMiniEmoji(card);
    }
  });
});

function createMiniEmoji(card) {
  const emojiList = ["💖","✨","🎉","🎈","🌸"];
  const emoji = document.createElement("span");
  emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

  const container = card.querySelector(".mini-emojis") || (() => {
    const div = document.createElement("div");
    div.className = "mini-emojis";
    card.appendChild(div);
    return div;
  })();

  const cardRect = card.getBoundingClientRect();
  emoji.style.left = Math.random() * (cardRect.width - 20) + "px";
  emoji.style.top = Math.random() * (cardRect.height - 20) + "px";
  container.appendChild(emoji);

  setTimeout(() => emoji.remove(), 1500);
}

// --------- WISHES PAGE ---------
const wishCards = document.querySelectorAll("#page7 .wish-card");
const finalLetterBtn = document.getElementById("finalLetterBtn");
let revealedCount = 0;

wishCards.forEach(card => {
  card.addEventListener("click", () => {
    if(card.classList.contains("flipped")) return;

    // Flip the card
    card.classList.add("flipped");
    card.querySelector(".wish-back").textContent = card.getAttribute("data-wish");

    // Pop emojis around the card
    for(let i=0; i<10; i++){
      setTimeout(() => createWishEmoji(card), i*100);
    }

    revealedCount++;
    if(revealedCount === wishCards.length){
      finalLetterBtn.classList.remove("hidden");
      finalLetterBtn.style.display = "inline-block";
    }
  });
});

function createWishEmoji(card){
  const emojiList = ["💖","✨","🎉","🎈","🌸","🥳"];
  const emoji = document.createElement("span");
  emoji.textContent = emojiList[Math.floor(Math.random()*emojiList.length)];
  const rect = card.getBoundingClientRect();
  emoji.style.position = "absolute";
  emoji.style.left = rect.left + rect.width/2 + (Math.random()*80-40) + "px";
  emoji.style.top = rect.top + rect.height/2 + (Math.random()*80-40) + "px";
  emoji.style.fontSize = Math.random()*20+15 + "px";
  emoji.style.opacity = 0.8;
  document.querySelector("#page7 .wish-emojis").appendChild(emoji);

  setTimeout(() => {
    emoji.style.transform = `translateY(-40px) scale(0.5)`;
    emoji.style.opacity = 0;
  }, 50);

  setTimeout(() => emoji.remove(), 2000);
}


// References
const openLetterBtn = document.getElementById("openLetterBtn");
const finalMessage = document.getElementById("finalMessage");
const sealSendBtn = document.getElementById("sealSendBtn");
const finalEmojisContainer = document.querySelector(".final-emojis");

// When "Open" is clicked
openLetterBtn.addEventListener("click", () => {
  finalMessage.classList.remove("hidden");
  openLetterBtn.classList.add("hidden");

  // Show random floating emojis like song page
  for(let i = 0; i < 50; i++){
    setTimeout(createFinalEmoji, i * 150);
  }

  // Show Seal & Send button after a short delay
  setTimeout(() => {
    sealSendBtn.classList.remove("hidden");
  }, 1000);
});

// Create floating emojis for the final message
function createFinalEmoji() {
  const emojiList = ["💖", "✨", "💕", "🎉", "🎂", "🌸", "🥳", "💌"];
  const emoji = document.createElement("span");
  emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

  emoji.style.position = "absolute";
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.top = Math.random() * window.innerHeight + "px";
  emoji.style.fontSize = Math.random() * 30 + 15 + "px";
  emoji.style.opacity = 0.8;
  emoji.style.transition = "all 2000ms ease";

  finalEmojisContainer.appendChild(emoji);

  setTimeout(() => {
    emoji.style.transform = `translateY(-60px) scale(0.5)`;
    emoji.style.opacity = 0;
  }, 50);

  setTimeout(() => emoji.remove(), 2000);
}

// ----------------- Seal & Send Button -----------------
sealSendBtn.addEventListener("click", () => {
  // Optional: you can add letter sealing animation here

  startKisses(); // Start rising kisses
  sealSendBtn.textContent = "Sent! 💌"; // Change button text
  sealSendBtn.disabled = true;
});

// Rising kisses from bottom
function createKiss() {
  const kiss = document.createElement("span");
  kiss.textContent = "💋";
  kiss.style.position = "absolute";
  kiss.style.left = Math.random() * window.innerWidth + "px";
  kiss.style.bottom = "-50px"; // start below the screen
  kiss.style.fontSize = Math.random() * 30 + 20 + "px";
  kiss.style.opacity = 0.8;
  kiss.style.transition = "all 4000ms ease-out";
  document.body.appendChild(kiss);

  setTimeout(() => {
    kiss.style.bottom = window.innerHeight + "px"; // rise
    kiss.style.opacity = 0;
  }, 50);

  setTimeout(() => kiss.remove(), 4000);
}

function startKisses() {
  for(let i = 0; i < 20; i++){
    setTimeout(createKiss, i * 200); // one every 0.2s
  }
}

function createFinalSparkle() {
  const sparkle = document.createElement("span");
  sparkle.textContent = "✨";
  sparkle.style.position = "absolute";
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";
  sparkle.style.fontSize = Math.random() * 30 + 20 + "px";
  sparkle.style.opacity = 0.8;
  sparkle.style.transition = `all 2000ms ease-out`;
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.style.transform = `translateY(-50px) scale(0.5)`;
    sparkle.style.opacity = 0;
  }, 50);

  setTimeout(() => sparkle.remove(), 2000);
}

// Trigger a final burst of sparkles with kisses
function finalSparkleBurst() {
  for (let i = 0; i < 40; i++) {
    setTimeout(createFinalSparkle, i * 100);
  }
}

// Call it when you start the kisses
finalSparkleBurst();
