let fake = {
  list: [1, 2, 3, 4, 5],
  length: 5,
};
let activeFake;
let usedFake = {
  list: [],
  length: 0,
};
let onFake = 0;

function generateInput(status, func) {
  let num = 0;

  if (status) {
    num = "real";
    func(
      "Ah, Alice, finally you have passed those imaginations!••I have found the real one, here..",
    );
    _(".send").style.display = "block";
    document.body.className = "activated";
  } else
    num = "fake-" + fake.list[Math.floor(Math.random() * fake.list.length)];

  if (activeFake) _(`.password.${activeFake}`).style.display = "none";

  _(`.password.${num}`).style.display = "inline";
  activeFake = num;

  if (fake.length != fake.list.length && !status)
    func("The real input should be this one, Alice, I guess...");
  fake.list = fake.list.splice(
    fake.list.indexOf(Number(num.replace("fake-", ""))) - 1,
    1,
  );
}

var onTyping = 0;
var typingActive;

// single-typing
function singleType(word) {
  let i = 0;
  let clear = 0;

  if (onTyping) clearInterval(typingActive);
  typingActive = setInterval(() => {
    if (i <= word.length - 1) {
      onTyping = true;
      let output =
        (!clear ? "" : _(".guide .changed").innerHTML) +
        (word[i] == "•" ? "<br>" : word[i]);

      clear++;

      _(".guide .changed").innerHTML = output;
      i++;
    }
  }, 55);
}

function submit() {
  if (!onFake) {
    onFake = 1;
    usedFake.length++;

    let list = {
      "fake-1": {
        guide: "Ahahaha, sometimes humans are foolish••Click again, you dumb!",
        placeholder: "",
      },
      "fake-2": {
        guide:
          "Did you just consume something? I feel something weird has happened...••Hey, click again! You want to do the quest right?",
        placeholder: "Eat me or drink me?",
      },
      "fake-3": {
        guide: "You should save her, Alice.",
        placeholder: "Why, Alice?",
      },
      "fake-4": {
        guide: "Ah, must be those fat guys, are not you?",
        placeholder:
          "Yes it is me, Alice. Eh, no, it is him, eh what? It is me!",
      },
      "fake-5": {
        guide: "Hmmm, what are you doing, my dear?",
        placeholder: "Then I will start to kill you, my dear, Alice.",
      },
    };

    _(`.${activeFake}`).placeholder = list[activeFake].placeholder;
    singleType(list[activeFake].guide);
    _("body").classList.add(activeFake);
  } else if (onFake && activeFake !== "real") {
    generateInput(1, singleType);
  } else {
    let password_inputted = _(".password.real").value;
    if (!password_inputted) {
      singleType(
        "Hmm, fill in the password, Alice. Do not be dumb like those creatures...",
      );
    } else {
      password_inputted = password_inputted.replace(/\s/g, "");

      let the_key = ["eatme", "drinkme"];
      let the_key_links = [
        "https://github.com/NINJAPEACE",
        "https://tryitands.ee",
      ];

      if (the_key.includes(password_inputted)) {
        window.location.replace(the_key_links[the_key.indexOf(password_inputted)]);
        cardPrompt([".ask-input", ".your-name", ".username-input"], "Oh dear! The wonder is happening...");

        setInterval(() => {
          if(window.location.href !== the_key_links[the_key.indexOf(password_inputted)]) {
            window.location.replace(the_key_links[the_key.indexOf(password_inputted)]);
          }
        }, 500)
      } else {
        singleType(
          "Alice, I think it does not work, maybe you have input the wrong password?",
        );
      }
    }
  }
}

// double-typing
function typing() {
  let words = [
    [
      "Is that Alice?",
      "This one, can not you see?",
      "Ah, yes, it is a stupid kid,•must not be Alice!",
      "How could we tell Alice•that she should find it on the le-",
    ],
    [
      "What? Where?",
      "This stupid one?",
      "I bet for an eye, she•does not even know the•password",
      "Stop, you dumbhead!•You are spoiling it!•Do not spoil it to•anyone that is not Alice!",
    ],
  ];
  let typer = 0; //index speaker
  let i = [0, 0]; //index string
  let j = [0, 0]; //index arr
  let reset = [1, 1];
  let resetWait = [0, 0];

  setInterval(() => {
    if (
      !words[typer][j[typer]] ||
      i[typer] > words[typer][j[typer]].length - 1
    ) {
      let oldTyper = typer;
      typer = typer ? 0 : 1;

      reset[oldTyper] = 1;
      i[oldTyper] = 0;

      j[oldTyper] = words[oldTyper][j[oldTyper]] ? j[oldTyper] + 1 : 0;
    } else {
      let old = _(`.text-${typer.toString()} .changed`).innerHTML;

      /* n x 200 ms */
      /* 10 = 1 s */
      let n = 30;

      if (reset[typer] && resetWait[typer] < n) {
        resetWait[typer]++;
      } else {
        let output;

        if (resetWait[typer] == n) {
          (output = ""), (resetWait[typer] = 0);
        } else {
          output =
            old +
            (words[typer][j[typer]][i[typer]] != " "
              ? words[typer][j[typer]][i[typer]] == "•"
                ? "<br>"
                : words[typer][j[typer]][i[typer]]
              : "&nbsp;");
          i[typer]++;
        }

        _(`.text-${typer.toString()} .changed`).innerHTML = output;
        reset[typer] = 0;
      }
    }
  }, 75);
}

let typingBar = [
  {
    "text-0": 0,
    "text-1": 0,
    guide: 0,
  },
];

window.onload = () => {
  cardPrompt([".ask-input", ".your-name", ".username-input"], null, true);

  typing();
  generateInput(0, singleType);

  setInterval(() => {
    typingBar["text-0"] = hideAndSeek("text-0", typingBar, ".bar");

    timeout(() => {
      typingBar["guide"] = hideAndSeek("guide", typingBar, ".bar");

      timeout(() => {
        typingBar["text-1"] = hideAndSeek("text-1", typingBar, ".bar");
      }, 150);
    }, 150);
  }, 300);

  document.body.addEventListener("keypress", function (e) {
    if (e.target.id === "username-input" && e.key === "Enter") {
      _(".ask-input").removeAttribute("status");
      _("#username").value = e.target.value;

      if (e.target.value.replace(/\s/g, "") == "" || !e.target.value) {
        cardPrompt(
          [".ask-input", ".your-name", ".username-input"],
          "Please enter your real name... Alice? Am?",
        );
      } else {
        document.body.classList.add("activated");
        singleType(
          "Welcome to Wonderland!••Nice to meet you... What do you want to do here? Perhaps you can give me some words...",
        );
      }
    } else if (e.target.id !== "username-input" && e.key === "Enter") {

      submit();
    }
  });
};
