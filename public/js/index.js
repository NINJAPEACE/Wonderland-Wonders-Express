let input_is_password = 1;
let got_how_many_fake = 0;

let fake_items_list = [1, 2, 3, 4, 5];
let fake_list_length = fake_items_list.length;
let active_fake_items;
let already_used_fake_items = [];
let user_is_on_fake = 0;

function _(args) {
  return document.querySelector(args);
}

function generateFormField(status, guide_typing) {
  let num = 0;

  if (status) {
    num = "real";
    guide_typing("Ah, Alice, finally you have passed those imaginations!••I have found the real one, here..");
    _(".send").style.display = "block";
  } else num = "fake-" + fake_items_list[Math.floor(Math.random() * fake_items_list.length)];

  if (active_fake_items) _(`.password.${active_fake_items}`).style.display = "none";

  _(`.password.${num}`).style.display = "inline";
  active_fake_items = num;

  if (fake_list_length != fake_items_list.length && !status) guide_typing("The real input should be this one, Alice, I guess...");

  fake_items_list = fake_items_list.splice(fake_items_list.indexOf(Number(num.replace("fake-", ""))) - 1, 1);
}

function show_password_text() {
  if (active_fake_items != "real" && got_how_many_fake == 1) {
    generateFormField(1, guide_typing);
    _("body").className = "";
  } else if (active_fake_items == "real") {
    _(".password.real").type = input_is_password ? "text" : "password";
    input_is_password = !input_is_password;
  } else if (!user_is_on_fake) {

    user_is_on_fake = 1;
    got_how_many_fake++;
    /* ALL TRICKS HERE */
    let list = {
      "fake-1": {
        guide: "Ahahaha, sometimes humans are foolish••Click again, you dumb!",
        placeholder: ""
      },
      "fake-2": {
        guide: "Did you just consume something? I feel something weird has happened...••Hey, click again! You want to do the quest right?",
        placeholder: "Eat me or drink me?"
      },
            "fake-3": {
        guide: "You should save her, Alice.",
        placeholder: "Why, Alice?"
      },
            "fake-4": {
        guide: "Ah, must be those fat guys, are not they?",
        placeholder: "Yes it is me, Alice. Eh, no, it is him, eh what? It is me!"
      },
            "fake-5": {
        guide: "Hmmm",
        placeholder: "Then I will start to kill you, my dear, Alice."
      }
    }

    _(`.${active_fake_items}`).placeholder = list[active_fake_items].placeholder;
    guide_typing(list[active_fake_items].guide);
    _("body").classList.add(active_fake_items);

  } else {
    user_is_on_fake = 0;
    generateFormField(0, guide_typing);

  }
}

var onTyping = 0;
var typingActive;

function guide_typing(word) {
  let i = 0;
  let clear = 0;

  if (onTyping) clearInterval(typingActive);
  typingActive = setInterval(() => {
    if (i <= word.length - 1) {
      onTyping = true;
      let output = (!clear ? "" : _('.guide .changed').innerHTML) + (word[i] == "•" ? "<br>" : word[i]);

      clear++;

      _('.guide .changed').innerHTML = output;
      i++;
    }
  }, 85)
}

function send_password_text() {
  let password_inputted = _(".password.real").value;

  if (!password_inputted) {
    guide_typing("Hmm, fill in the password, Alice. Do not be dumb like those creatures...")
  } else {
    password_inputted = password_inputted.replace(/\s/g, "");

    let the_key = ["eatme", "drinkme"];
    let the_key_links = ["https://github.com/NINJAPEACE", "https://tryitands.ee"]

    if (the_key.includes(password_inputted)) {
      window.location.href = the_key_links[the_key.indexOf(password_inputted)];
    } else {
      guide_typing("Alice, I think it does not work, maybe you have input the wrong password?")
    }
  }
}

function typing() {
  let words = [["Is that Alice?", "This one, can not you see?", "Ah, yes, it is a stupid kid,•must not be Alice!", "How could we tell Alice•that she should find it on the le-"], ["What? Where?", "This stupid one?", "I bet for an eye, she•does not even know the•password", "Stop, you dumbhead!•You are spoiling it!•Do not spoil it to•anyone that is not Alice!"]];
  let typer = 0; //index speaker
  let i = [0, 0]; //index string
  let j = [0, 0]; //index arr
  let reset = [1, 1];
  let resetWait = [0, 0];

  setInterval(() => {
    if (!words[typer][j[typer]] || i[typer] > (words[typer][j[typer]].length - 1)) {

      let oldTyper = typer;
      typer = typer ? 0 : 1;

      reset[oldTyper] = 1;
      i[oldTyper] = 0;

      j[oldTyper] = words[oldTyper][j[oldTyper]] ? (j[oldTyper] + 1) : 0;


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
          output = '', resetWait[typer] = 0;
        } else {
          output = old + (words[typer][j[typer]][i[typer]] != " " ? words[typer][j[typer]][i[typer]] == "•" ? "<br>" : words[typer][j[typer]][i[typer]] : "&nbsp;");
          i[typer]++;
        }

        _(`.text-${typer.toString()} .changed`).innerHTML = output;
        reset[typer] = 0;

      }
    }
  }, 75)
}

let appearance_of_typing = [{
  "text-1": 0,
  "text-2": 0,
  "guide": 0
}]

window.onload = () => {
  typing();
  guide_typing("Welcome to Wonderland!••Nice to meet you.••Try this one, please...");
  generateFormField(0, guide_typing);

  setInterval(() => {
    hide_and_seek("text-0");

    timeout(() => {
      hide_and_seek("guide");

      timeout(() => {
        hide_and_seek("text-1");
      }, 150)
    }, 150)
  }, 300)
}

function hide_and_seek(el) {
  _(`.${el} .bar`).style.visibility = appearance_of_typing[el] ? "hidden" : "visible";
  appearance_of_typing[el] = !appearance_of_typing[el];
}

function timeout(doSomething, ms) {
  setTimeout(doSomething, ms)
}