let newQuote = document.querySelector(".sentence");
let newAuthor = document.querySelector(".by");
let loading = document.querySelector(".btn");

async function getQuote() {
  loading.innerHTML = "Loading...";
  await fetch("https://zenquotes.io/api/random")
    .then((result) => {
      let response = result.json();
      response.then((res) => {
        console.log(res[0]);
        newQuote.innerHTML = res[0].q;
        newAuthor.innerHTML = res[0].a;
      });
    })
    .catch((err) => {
      console.log("no response");
    })
    .finally(() => {
      loading.innerHTML = "New Quote";
    });
}

function copyText() {
  let text = document.querySelector(".sentence").innerHTML;
  navigator.clipboard.writeText(text);
}

function readOutLoud() {
  var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
  let message = document.querySelector(".sentence").innerHTML;
  let auth = document.querySelector(".by").innerHTML;
  speech.text = message + "by" + auth;

  speech.volume = 1;

  speech.rate = 0.75;

  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

function tweetQuote() {
  let quote = document.querySelector(".sentence").innerHTML;
  let author = document.querySelector(".by").innerHTML;

  let tweetText = `"${quote}" — ${author}`;

  let twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;
  window.open(twitterUrl, "_blank");
}
