const gameFuncs = {
  deadBody: (bodyCheckCounter, messageCheckCounter) => {
    if (bodyCheckCounter === 0 && messageCheckCounter === 0) {
      return `You find a desiccated corpse, withered and ancient looking, with a strange keyboard clutched in its withered hands. How strange!`;
    } else if (bodyCheckCounter > 0 && messageCheckCounter === 0) {
      return `You notice some writing on the floor next to the body ... written with blood. You take a deep breath and move closer to read it.`;
    } else if (bodyCheckCounter > 0 && messageCheckCounter > 0) {
      return `The initials B.E. sound familiar, but the thought escapes you as the body dissipates into thin air - leaving behind the keyboard promised to you.`;
    }
  },
  helpMessage: (messageCheckCounter) => {
    if (messageCheckCounter === 0) {
      const a = `I don't know who you are. Please believe. There is no way I can convince you that this is not one of her tricks. But I don't care.`;
      const b = `I spent the last of my power to give you help, and my blood in the hopes you escape this place. This keyboard will allow you to connect to the elemental composition of this world, changing it to your will, but it will test the limits of your Joyous Spirit. Fizz Buzz. - B.E.`;
      return `${a} ${b}`;
    } else if (messageCheckCounter === 1) {
      return `Fizz Buzz? Joyous Spirit? They must have been delirious from loss of blood.`;
    } else if (messageCheckCounter > 1) {
      return `Very macabre. You shove the thought of their desperation out of your mind.`;
    }
  },
  door: (keyboardVar, door) => {
    if (keyboardVar === 0) {
      return `It's a simple but sturdy door. There's no way you're going to force your way through.`;
    }
    if (keyboardVar === 1) {
      if (door.x === 16 && door.y === 7) {
        return {
          lines: [1, 9, 10, 12],
          text: `Your keyboard beeps and its blinking light becomes solid. It's connected to the door somehow. Images flash before your eyes, converting the laws of this world into a familiar form - JAVASCRIPT! You understand now; the way forward is changing this door from locked to unlocked. All the rest of the code is readOnly`,
          code: ` /*jshint esversion: 6, asi: true*/
  /*
  My notes: Experimented with making a door today!
  It was the first door I've ever made, but I'm pretty proud of it.
  There's still so much more to be done.
  I created a simple lock by setting door[${door.x}][${door.y}] = 'L'; For 'Locked Door'!
  Reminder: 'U' for Unlocked Door.
  */
  function door1(door) {
    door[${door.x}][${door.y}] = 'L';
    return door[${door.x}][${door.y}];
  }
`,
        };
      } else if (door.x === 16 && door.y === 22) {
        return {
          lines: [1, 13, 14, 15],
          text: `A surge of energy from your keyboard reveals the true nature of the door before you.`,
          code: ` /*jshint esversion: 6, asi: true*/
          /*
          My Notes: Trying a new type of lock for my doors; this one will
          implement MANY locks.The sector behind the door needs extra security,
          because it will implement my new thermal management code.
          I'll be able to overclock my computer even further now!

          Reminder: "locks" array has many indexes. For simplification, each
          index in the array has only one lock. Remember first door.
          Also - I cleared this function after locking, so remember to
          loop through your memories.
          */
          function thermalDoor(locks){
            return
          }`,
        };
      } else if (door.x === 16 && door.y === 37) {
        return {
          lines: [1, 17, 18, 19],
          text: `Your keyboard summons a terminal and with your new ring you see the pixels even clearer! What is this? 1080p?`,
          code: ` /*jshint esversion: 6, asi: true*/
          /*
          Door Notes: Is there a way to program happiness into an application?
          Just one of my many philosophical musings! Work is really getting
          under my skin... If I have to change my indentSize again...
          Why can't I just program comfortably - the way I actually
          enjoy? Oh well, I still have my wonderful class to
          brighten my day. Maybe I'll give them a >pop< quiz.

          Reminder: The locks array is very long and filled with fake locks,
          but the last entry contains the true lock... I made it very special
          it's no longer just a simple 'L'. A lot of time and energy went
          into crafting it just the way I like it. I just need to
          remember not to remove it...
          */

          function happyDoor(locks){
            return
          }`,
        };
      } else if (door.x === 16 && door.y === 52) {
        return {
          lines: [1, 13, 15, 16],
          text: `The dungeon's darkness closes in around you with every step. You feel the need to get through this next door. Maybe the escape is behind it.`,
          code: ` /*jshint esversion: 6, asi: true*/
          /*
          Door Notes: Work has me using alternating tab indents every other line and
            they won't let me use Prettier anymore. How can they ask this
          of me, and more importantly, why? This stress is bleeding into
            my otherwise happy classrooms. I hear the whisperings of my
          students. I see the furtive glances. They don't think I do,
            but I see all - I KNOW all. The only time I feel happy is
          when I'm working on this app. I find myself thinking of it
            frequently - almost obsessively. I fEe7 mY sAnItY
          s7iPpInG aWaY fRoM mE... eVeRy DaY. I mUsT rEmEmBeR...
            ReVeRsE...
          */
        function rEvErSe(L) {
          L =
          return L;
        } `,
        };
      } else if (door.x === 16 && door.y === 67) {
        return {
          lines: [1, 4, 6, 7],
          text: `You lean heavily against the door. What are you doing? Why do you keep moving forward? Isn't there another bitcoin to be found? Yes, that's why you're moving. Bitcoins. Keep moving.`,
          code: ` /*jshint esversion: 6, asi: true*/
          /*
          ...
          */
         function operator(spr, ead) {
          spr.push(ead)
          return spr;
         }`,
        };
      }
    }
  },
  andStatue: (andStatueCheckCounter) => {
    if (andStatueCheckCounter === 0) {
      return `The monument reads: "Versatile but tricky, this character must be used wisely when programming conditionals."`;
    } else {
      return `"Interesting taste in decor. Were they out of the regular creepy dungeon statues?", you mumble hoping no one heard you.`;
    }
  },
  atStatue: (atStatueCheckCounter) => {
    if (atStatueCheckCounter === 0) {
      return `The monument reads: "While not versatile, this character is indispensible to online communication."`;
    } else {
      return `"Whoever owns this place should really switch their interior decorator.", you smile nervously as you look around for any eavesdroppers.`;
    }
  },
  golem1: (golem1CheckCounter, keyboardCheckCounter) => {
    if (golem1CheckCounter === 0 && keyboardCheckCounter === 0) {
      return `That's one creepy statue. Its eyes seem to follow you across the room. It blocks your way to the next area.`;
    } else if (golem1CheckCounter > 0 && keyboardCheckCounter === 0) {
      return `The statue keeps getting creepier somehow. Its expression makes you very uneasy. There must be a way to remove it.`;
    } else if (golem1CheckCounter > 0 && keyboardCheckCounter === 1) {
      return `The golem explodes, leaving behind nothing and clearing the way.`;
    }
  },
  golem2: (golem2CheckCounter, ringCheckCounter) => {
    if (golem2CheckCounter === 0 && ringCheckCounter === 0) {
      return `Another creepy statue. It blocks your way to the next area yet again.`;
    } else if (golem2CheckCounter > 0 && ringCheckCounter === 0) {
      return `There must be another item that can remove this golem.`;
    } else if (ringCheckCounter === 1) {
      return `The golem explodes, leaving behind nothing and clearing the way.`;
    }
  },
  golem3: (golem3CheckCounter, ringCheckCounter) => {
    if (golem3CheckCounter === 0 && ringCheckCounter === 0) {
      return `"Yet another golem? Always in the way. Where did the designer get all these?"`;
    } else if (golem3CheckCounter > 0 && ringCheckCounter === 0) {
      return `You know the drill by now. Find the item that destroys this one.`;
    } else if (golem3CheckCounter > 0 && ringCheckCounter === 1) {
      return `The golem explodes, leaving behind nothing and clearing the way.`;
    }
  },
  golem4: (golem4CheckCounter, ringCheckCounter) => {
    if (golem4CheckCounter === 0 && ringCheckCounter === 0) {
      return `"Come ON! This better be the last one."`;
    } else if (golem4CheckCounter > 0 && ringCheckCounter === 0) {
      return `"Yeah yeah, I know. Find the item, ditch the golem."`;
    } else if (golem4CheckCounter > 0 && ringCheckCounter === 1) {
      return `The golem explodes, leaving behind nothing and clearing the way.`;
    }
  },
  portal: (portalCheckCounter, ringCheckCounter) => {
    if (portalCheckCounter === 0 && ringCheckCounter === 0) {
      return `You see a portal. "This must be it! An Exit!" But an invisible wall blocks you from entering. You realize what you have to do.`;
    } else if (portalCheckCounter > 0 && ringCheckCounter === 0) {
      return `"At least it's not a golem this time.", you mutter to yourself as you look around for the final item.`;
    } else if (portalCheckCounter > 0 && ringCheckCounter === 1) {
      return `No more invisible wall. The portal glows as you enter.`;
    }
  },
  helpStone: (bodyCheckCounter) => {
    if (bodyCheckCounter === 0) {
      return `Your memories start coming back. The last thing you remember is you were coding Project 3... Tish invited you to a Zoom call, you accepted... and now you're in a dungeon. What is going on?`;
    } else
      return `As you touch the strange stone, the ring fills you with warmth. You understand everything now. Tish has trapped your whole class inside a bitcoin app! It makes sense why she kept bragging the GPU shortage didn't affect her! You are the code and every movement performs some pointless hash in search of cryptocurrency.`;
  },
  keyboard: () => {
    return `A janky looking wireless keyboard. You turn it on, and a light starts blinking. It must be searching for a connection.`;
  },
  ring: () => {
    return `The ring is warm to the touch. As you slip it onto your finger, a shock of pain sweeps through your body, your vision immediately increases the distance you can see.`;
  },
  bossOne: (bossOneCheckCounter) => {
    if (bossOneCheckCounter === 0) {
      return `Who disturbs my slumber? Oh, it's another human! I once was a human, like yourself, but I asked Tish one too many questions and she rewarded me by making me her CPU heat sink.`;
    } else if (bossOneCheckCounter === 1) {
      return `What question did I ask, you ask? "Is jQuery the best option for selecting DOM elements?" - I expected her answer, as usual, to be, "It depends." but instead a dark and stormy cloud washed over her face as she slammed her fist into the keyboard. Electricity crackled from her fist on impact, executing a program that turned me into this hideous beast you see before you now.`;
    } else if (bossOneCheckCounter === 2) {
      return `All I do now is absorb heat day in and day out, or should I say computer cycle in and computer cycle out; my room is hotter than Midland! She completely replaced her old heatRegulation function with me!`;
    } else if (bossOneCheckCounter > 2) {
      return {
        lines: [1, 8, 9, 10],
        text: `I grow weary of reminiscing; my heart aches for my family. You too shall know my pain. - the dragon begins to inhale, flames from about the room begin to coalesce in front of its mouth - your keyboard sends a jolt of electricity through your body; you quickly open up the terminal.`,
        code: `/*jshint esversion: 6, asi: true*/
        /*
        !!! Your mind sharpens in the presence of danger! Before you appears Tish's old heatRegulation function, now corrupted and defunct(literally) - quickly repair it to disperse the heat from the dragon !!!
        My notes: I learned all about #$@LK#$J 2nd Law of Thermodynamics to #$KLJ@#LK$J thermal regulation function for my CPU.
        Honestly, I think I've improved on the #$@%ZLKU*F state of the field - Newton was almost there. Almost.
        It was very simple... all I did was subtract...#$)#()Z()F)g)
        */
        function heatRegulation(heat) {
          return heat - @#$(v!..,er..!y co/,.rru/.,pt da!.,/ta)#@
        }`,
      };
    }
  },
  bossTwo: (bossTwoCheckCounter, boss1, boss2) => {
    if (bossTwoCheckCounter === 0) {
      return `You warily approach one of the three figures huddled around the pentagram... The creature hisses, then grins evilly at you. The sound echoes in the dimly lit room.`;
    } else if (bossTwoCheckCounter === 1) {
      return `"Get back to the work at hand. Cazasa, stay focused, you're responsible for writing all our functions. We're close to bringing Joy back into our lives!"`;
    } else if (bossTwoCheckCounter === 2) {
      return `"What do you want traveller? According to my pie charts and role assignments we have no need for an amatuer. We need a STAR! And you clearly aren't one... *smiles*"`;
    } else if (bossTwoCheckCounter === 3) {
      return `I wrote this code to bring our Joy back, it broke, but we're fixing it.. Almost. It's missing something... Mejas, do we splice or slice?`;
    } else if (bossTwoCheckCounter > 3 && boss1 > 3 && boss2 > 3) {
      return {
        lines: [1, 6, 9, 10],
        text: `All three creatures slowly look up from what they are doing and stare at you. It's almost as if they finally realized what you are, all at once. Their thoughts are transprent to you, you don't need a keyboard to see it - you're the missing piece. They all lunge at you, desperately grabbing at you, but you instinctively pull out your keyboard. Lines of code appear before you, but it seems unfinished.`,
        code: `/*jshint esversion: 6, asi: true*/
        /*
        NoTeS? No-TES. NO. Time. Extended. Service. Wait, what am I writing? I need to get more sleep.
        I feel less and less like myself these days. What am I writing right now? This code
        is so gross! I don't even remember what it was for. All code is making me feel ill.
        */
        function bringJoy(Jy) {
      Jy.slice()
      Jy.splice()
      return Jy
        }`,
      };
    } else if (bossTwoCheckCounter > 3) {
      return `Focus you two, keep coding! Or I'll splice you two together and find my own joy`;
    }
  },
  bossThree: (bossThreeCheckCounter, boss1, boss2) => {
    if (bossThreeCheckCounter === 0) {
      return `You throw caution to the wind as you approach one of the three figures huddled around the pentagram... The creature spits at you. Disgusting.`;
    } else if (bossThreeCheckCounter === 1) {
      return `They call me... the Menace.. Or was it Sinned? I know. It's Cazasa. Cazasa the Great, nice to meet you. *attempts to spit on you again*`;
    } else if (bossThreeCheckCounter === 2) {
      return `These other two sad creatures have lost themselves. Not me though! I know who I am! I forget what we're doing though...`;
    } else if (bossThreeCheckCounter === 3) {
      return `The other two creatures howl loudly at Cazasa the Great.`;
    } else if (bossThreeCheckCounter > 3 && boss1 > 3 && boss2 > 3) {
      return {
        lines: [1, 6, 9, 10],
        text: `All three creatures slowly look up from what they are doing and stare at you. It's almost as if they finally realized what you are, all at once. Their thoughts are transprent to you, you don't need a keyboard to see it - you're the missing piece. They all lunge at you, desperately grabbing at you, but you instinctively pull out your keyboard. Lines of code appear before you, but it seems unfinished.`,
        code: `/*jshint esversion: 6, asi: true*/
  /*
  NoTeS? No-TES. NO. Time. Extended. Service. Wait, what am I writing? I need to get more sleep.
  I feel less and less like myself these days. What am I writing right now? This code
  is so gross! I don't even remember what it was for. All code is making me feel ill.
  */
  function bringJoy(Jy) {
Jy.slice()
Jy.splice()
return Jy
  }`,
      };
    } else if (bossThreeCheckCounter > 3) {
      return `Go away, they reminded me we're trying to bring Joy back into our lives. We just keep missing this one thing. Do we splice or slice? ... Wait, what are we doing again?`;
    }
  },
  bossFour: (bossFourCheckCounter, boss1, boss2) => {
    if (bossFourCheckCounter === 0) {
      return `You're pretty sure of yourself as you approach one of the three figures huddled around the pentagram... The creature cackles to itself. You barely hear it muttering between laughs.`;
    } else if (bossFourCheckCounter === 1) {
      return `I'm losing myself... I remember... we were working on a procrastination app... or was it a face analyzer app... We're lost without Joy.`;
    } else if (bossFourCheckCounter === 2) {
      return `Students? Did you say students? Are you... She-Who-Knows? No, you look too lost. If I see a student around here, I'm going to slice them.`;
    } else if (bossFourCheckCounter === 3) {
      return `Quiet, we're almost finished bringing Joy back into our lives. I just... I just... can't remember... splice?`;
    } else if (bossFourCheckCounter > 3 && boss1 > 3 && boss2 > 3) {
      return {
        lines: [1, 6, 9, 10],
        text: `All three creatures slowly look up from what they are doing and stare at you. It's almost as if they finally realized what you are, all at once. Their thoughts are transprent to you, you don't need a keyboard to see it - you're the missing piece they want to splice or slice. They all lunge at you, desperately grabbing at you, but you instinctively pull out your keyboard. Lines of code appear before you, but it seems unfinished.`,
        code: `/*jshint esversion: 6, asi: true*/
        /*
        NoTeS? No-TES. NO. Time. Extended. Service. Wait, what am I writing? I need to get more sleep.
        I feel less and less like myself these days. What am I writing right now? This code
        is so gross! I don't even remember what it was for. All code is making me feel ill.
        */
        function bringJoy(Jy) {
      Jy.slice()
      Jy.splice()
      return Jy
        }`,
      };
    } else if (bossFourCheckCounter > 3) {
      return `The being goes back to muttering quietly under its breath.`;
    }
  },
  bossFive: (bossFiveCheckCounter, bossSixCheckCounter) => {
    if (bossFiveCheckCounter === 0) {
      return `One of the two figures before you looks wizened and powerful; he's obviously a powerful summoner. You cannot understand what he's saying... it sounds like Valheim.`;
    } else if (bossFiveCheckCounter === 1) {
      return `The summoner notices you and speaks clearly, "You saw the creatures from the previous room? Hah, are they still trying to bring Joy to this hellish dimension? A fool's errand; Joy is imprisoned soon after being released. It is a never ending cycle."`;
    } else if (bossFiveCheckCounter === 2) {
      return `There is but one escape here, and I alone know the way..."`;
    } else if (bossFiveCheckCounter === 3) {
      return `Desperate to know how to escape, you ask how, but the summoner only laughs and turns his back to you. He materializes a terminal out of thin air. He is completely ignoring you now.`;
    } else if (bossFiveCheckCounter > 3 && bossSixCheckCounter <= 3) {
      return `"Now what is that warrior yelling about? Have you talked to him? He asked my help to get him treasure and escape, so I gave him my answer. Now I hear him cursing loudly. Find out what he wants!"`;
    } else if (bossFiveCheckCounter > 3 && bossSixCheckCounter > 3) {
      return {
        lines: [1, 9, 1, 9],
        text: `... Must ... get ... the ... gold. Flash! Into a wall.... again. Urgh! You interrupted me and now I'm dead! I should not have listened to you, I was right the first time! It's time I repay the favor.". The wizard yells out towards the warrior. It's 1v1 time.`,
        code: `/*jshint esversion: 6, asi: true*/
        /*
        You deliberate on which answer is the correct one.
        */
        function chooseAnswer() {
          let guess;
          function wizardsGuess(guess) {
            guess = 'vision bonus'
            return guess;
          }
          return wizardsGuess(guess)
        }`,
      };
    }
  },
  bossSix: (bossSixCheckCounter, bossFiveCheckCounter) => {
    if (bossSixCheckCounter === 0) {
      return `One of the two figures before you looks like a mighty warrior.`;
    } else if (bossSixCheckCounter === 1) {
      return `His eyes carry the wisdom of someone who played chess in their youth. But they also carry a look of disdain when glancing at you. He might have the answers you seek...`;
    } else if (bossSixCheckCounter === 2) {
      return ` The warriors smirks at you and speaks: "You wish to escape this place, but you dont see the big picture. There is no problem that cant be solved with more tables! Use more tables to avoid sequels to your problems!."`;    
    } else if (bossSixCheckCounter === 3) {
      return `"I once wished to travel all over the world and have the natives let me stay in their abodes as tribute. Yet now I am swarmed by their problems. No one listens to me. No one uses more tables..."`;
    } else if (bossSixCheckCounter > 3 && bossFiveCheckCounter <=3) {
      return `"Now what is that wizard yelling about? Have you talked to him? He asked my help to get him treasure and escape, so I gave him my answer. Now I hear him cursing loudly. Find out what he wants!"`;
    } else if (bossSixCheckCounter > 3 && bossFiveCheckCounter > 3) {
      return {
        lines: [1, 9, 1, 9],
        text: `The warrior hears the wizard's lamentations. He has never backed out of a fight. He also whips open a terminal and starts typing furiously...`,
        code: `/*jshint esversion: 6, asi: true*/
        /*
        You deliberate on which answer is the correct one.
        */
        function yourAnswer() {
          return function warriorsGuess() {
            let warriorsGuess = 'more tables';
            return warriorsGuess;
          }
        }`,
      };
    }
  },
  bossSeven: (bossSevenCheckCounter) => {
    if (bossSevenCheckCounter === 0) {
      return `...`;
    } else if (bossSevenCheckCounter === 1) {
      return `....`;
    } else if (bossSevenCheckCounter === 2) {
      return `.....`;
    } else if (bossSevenCheckCounter === 3) {
      return `I'm glad you spent the effort to talk to me! Here, take this gift. It fell off a UFO I saw. I've been hiding it very well, but I have a feeling you need it more now. Escape you ask? No, there's no escape. Maybe Yenso knows but the one time I asked the look on his face was so sad I couldn't bring myself to push the issue. I haven't brought it up since.
      *** Eye Nana gives you a Worm - it burrows into your skin immediately, the pain is immense but you feel untold power coursing through your body ***`;
    } else if (bossSevenCheckCounter > 3) {
      return `.....`;
    }
  },
  bossEight: (bossEightCheckCounter, Iyana) => {
    if (bossEightCheckCounter === 0) {
      return `This world... it's an illusion, convincing as it is insidious. We're just bits and voltage waiting for change. Oh? You're not surprised. You must know the truth.`;
    } else if (bossEightCheckCounter === 1) {
      return `Funny. You remind me of someone I knew long ago, but the name escapes me. This world slowly erodes your memory, turning you into a thrall for Tish, who herself is just as trapped and lost.`;
    } else if (bossEightCheckCounter === 2) {
      return `I've tried to resist in every way possible. Do you not see how far I've come? But my strength fades... I can only hope you surpass my own limits.`;
    } else if (bossEightCheckCounter > 2 && Iyana > 2) {
      return {
        lines: [1, 9, 10, 15],
        text: `My purpose? Ahh, well Tish made me her virus protection. I'm not even sure the old code works any more... Wait... Why do I feel the need to scan you suddenly??? I see that disgusting worm wriggling in your body! YOU TRICKED ME. How did you evade detection?!? Time to die!`,
        code: `/*jshint esversion: 6, asi: true*/
      /*
      As you're attacked by the antivirus creature, a small portion of Tish's antivirus code is made available to you.
      It's so complicated and dense, you're sure you will die. The worm senses its host's immediate danger and
      immediately deploys its anti-antivirus protocal! You've bought yourself some time as the antivirus creature
      bears down on you as if in slo-mo. Just enough time to find the pertinent snippet you need! It's so well-written,
      all you need to do is run it!
      */
      function antivirusProgram(virus) {
        return virus = 'veryDead';
      }`,
      };
    } else if (bossEightCheckCounter > 2) {
      return `I mean, really, what is the purpose beyond this digital cage? It's not so different, so why the struggle? At least here there seems to be a definitive purpose here. I have a function to perform. Have you talked to Eye Nana It pays to know her.`;
    }
  },
  bossFinal: (
    bossFinalCheckCounter,
    cat1CheckCounter,
    cat2CheckCounter,
    dogCheckCounter
  ) => {
    if (
      bossFinalCheckCounter === 0 &&
      cat1CheckCounter === 0 &&
      cat2CheckCounter === 0 &&
      dogCheckCounter === 0
    ) {
      return `You reach an enchantress shouting what sounds like an ancient spell. "FREYA! PTAHMOSE! LEXIE", she shouts. You try to get her attention.`;
    } else if (
      bossFinalCheckCounter === 1 &&
      cat1CheckCounter === 0 &&
      cat2CheckCounter === 0 &&
      dogCheckCounter === 0
    ) {
      return `"Don't talk to me right now. My fur babies are loose!", she yells at you. You realize that spell was actually her pets' names. Begrudgingly, you decide to look for them.`;
    } else if (
      bossFinalCheckCounter === 1 &&
      cat1CheckCounter === 1 &&
      cat2CheckCounter === 0 &&
      dogCheckCounter === 0
    ) {
      return `"You found Freya! Where did you go, you naughty girl?!", the enchantress exclaims as you hand over the cat. "Please help me find Ptahmose and Lexie too", the enchantress pleads. You have no choice.`;
    } else if (
      bossFinalCheckCounter === 1 &&
      cat1CheckCounter === 0 &&
      cat2CheckCounter === 1 &&
      dogCheckCounter === 0
    ) {
      return `"That's Ptahmose! Well done! Was he digging up dead animals again?", the enchantress says, looking overjoyed. You realize that finding her cats as well would gain you her favor, so you decide to continue your search.`;
    } else if (
      bossFinalCheckCounter === 1 &&
      cat1CheckCounter === 0 &&
      cat2CheckCounter === 0 &&
      dogCheckCounter === 1
    ) {
      return `"Lexie!", the enchantress says happily as you hand over the dog. "Thank you! Did you see my cats anywhere? Please help me find them too.". The dog looks at you, its expressive eyes begging you not to comply. "Sorry Lexie, I need to get out of here.", as you turn around and start searching.`;
    } else if (
      bossFinalCheckCounter === 1 &&
      cat1CheckCounter === 1 &&
      cat2CheckCounter === 1 &&
      dogCheckCounter === 0
    ) {
      return `"Amazing. You must be really good with cats, to have found both. Freya and Ptahmose thank you!", claims the enchantress. The cats' faces definitely disagree. You silently empathize with the dog, before starting to look for him.`;
    } else if (
      bossFinalCheckCounter === 1 &&
      cat1CheckCounter === 1 &&
      cat2CheckCounter === 0 &&
      dogCheckCounter === 1
    ) {
      return `"Great job! Please help me find that pompous Ptahmose while I keep Freya from tormenting Lexie.", says the enchantress. You feel sorry for the dog, but decide that no amount of pupster smiles is worth staying stuck in this nightmare.`;
    } else if (
      bossFinalCheckCounter === 1 &&
      cat1CheckCounter === 0 &&
      cat2CheckCounter === 1 &&
      dogCheckCounter === 1
    ) {
      return `"Well done! Only Freya is left now. Please find her while I keep Ptahmose from harassing Lexie." The dog looks at you, its eyes pleading you to let that cat stay lost forever. "I'm sorry Lexie. Not my fight. I hope you'll forgive me.", you mumble as you start the search for the final feline.`;
    } else if (
      bossFinalCheckCounter === 1 &&
      cat1CheckCounter === 1 &&
      cat2CheckCounter === 1 &&
      dogCheckCounter === 1
    ) {
      return `"You did it! You found them all! I can't thank you enough. I hope this diploma makes up for all the torture you've been through! Now wake up and be somebody!!", the enchantress says as she vanishes with her pets. "It's finally over!", you sigh as you grab the diploma.`;
    }
  },
  cat1: () => {
    return `Judging by her goddess-like confidence, you guess this must be Freya. She gives you a sarcastic look as you pick her up, as if expecting you to thank her to letting you touch her.`;
  },
  cat2: () => {
    return `"You must be Ptahmose!", you exclaim. The cat looks at you like you're a lowly commoner in the presence of a Vizier. It allows you to pick it up, expecting major worship and groveling.`;
  },
  dog: () => {
    return `The poor dog looks harassed and tired. "Poor Lexie! Were those two felines picking on you?", you ask as you pick her up. Her short legs dangle in the air, as she gives you the cutest smile as if to say, "Thank you hooman, for saving me from those two hell demons!". `;
  },
  keeper: (keeperCheckCounter) => {
    if (keeperCheckCounter === 0) {
      return `Greetings! I am the Keeper of Secrets. Like the super secret mirror that the enchantress told me not to tell anyone about or the fact that it even exists. Umm, wait... aarrgh I did it again!`;
    } else {
      return `You will not trick me again traveller. Find those pets and take them to the enchantress.`;
    }
  },
  tree: (treeCheckCounter) => {
    if (treeCheckCounter === 0) {
      return `Just a regular tree. Not everything needs a dialogue chain.`;
    } else {
      return `A tree, again...`;
    }
  },
  closedChest: (closedChestCheckCounter) => {
    if (closedChestCheckCounter === 0) {
      return `You find a locked chest. You wonder about the treasures it might hold. There must be a way to open it. TIme to look around.`;
    } else {
      return `Locked. Time to look around for a way to open it.`;
    }
  },
  certificate: () => {
    return `You feel chills down your spine as you grab the certificate, as if you had been immersed in an icy cold bath. But all of a sudden, the feeling's gone. You jump up, finally awake in your own room in front of your computer. It's over...`;
  },
  fountain: (fountainCheckCounter) => {
    if (fountainCheckCounter === 0) {
      return `A water fountain. A welcome sight after what you've been through. Go ahead, take a drink."`;
    } else {
      return `"This water has a mild but strange taste.", you think as you take another drink. "I'm sure it's fine.", you think ... and hope. `;
    }
  },
};
export default gameFuncs;
