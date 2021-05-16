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
      return {
        lines: [1, 2, 3, 4, 5, 6, 7, 8, 10],
        text: `Your keyboard beeps and its blinking light becomes solid. It's connected to the door somehow. Images flash before your eyes, converting the laws of this world into a familiar form - JAVASCRIPT! You understand now; the way forward is changing this door from locked to unlocked. All the rest of the code is readOnly`,
        code: `
/*
My notes: Experimented with making a door today!
It was the first door I've ever made, but I'm pretty proud of it.
There's still so much more to be done.
I created a simple lock by setting tileMap[${door.x}][${door.y}] = 'L'; For 'Locked Door'!
Note: 'U' for Unlocked Door.
*/
function door1(tileMap) {
  return tileMap[${door.x}][${door.y}] = 'L';
}`,
      };
    }
  },
  andStatue: (andStatueCheckCounter) => {
    if (andStatueCheckCounter=== 0) {
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
    } else if (golem2CheckCounter > 0 && ringCheckCounter === 1) {
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
      return `All I do now is absorb heat day in and day out, or should I say computer cycle in and computer cycle out; my room is hotter than Midland!`;
    } else if (bossOneCheckCounter === 3) {
      return {
        lines: [1, 2, 3, 4, 5, 6, 8],
        text: `I grow weary on reminiscing; my heart aches for my family. You too shall know my pain. - the dragon begins to inhale, flames from about the room begin to coalesce in front of its mouth - your ring sends a jolt of electricity through your body and you once again see the world in code`,
        code: `
        /*
        My notes: Yet another day, teaching bright-eyed and bushy-tailed students how to select DOM elements using jQuery!
        It's such a joy to see the fire of creativity in them! A question from one of my students today inspired me to write code to
        optimize the thermal regulation of my CPU! I love programming, and I love teaching!
        */
       function heatRegulation() {
         return 'something'
       }`,
      };
    } else if (bossOneCheckCounter > 3) {
      return `...boss dialogue last...`;
    }
  },
  bossTwo: (bossTwoCheckCounter) => {
    if (bossTwoCheckCounter === 0) {
      return `You warily approach one of the three figures huddled around the pentagram... The creature hisses, then grins evilly at you. The sound echoes in the dimly lit room.`;
    } else if (bossTwoCheckCounter === 1) {
      return `Get back to the work at hand. Cazasa, stay focused, you're responsible for writing all our functions. We're close to bringing Joy back into our lives!`;
    } else if (bossTwoCheckCounter === 2) {
      return `Every one says my name wrong. But I don't care. What's my name? Hah, hah, hah... Like I'd tell you. *smiles*`;
    } else if (bossTwoCheckCounter === 3) {
      return `I wrote this code to bring our Joy back, it broke, but we're fixing it.. Almost. It's missing something... Mejas, did you finish the back-end?`;
    } else if (bossTwoCheckCounter > 3) {
      return `Focus, keep coding!`;
    }
  },
  bossThree: (bossThreeCheckCounter) => {
    if (bossThreeCheckCounter === 0) {
      return `You throw caution to the wind as you approach one of the three figures huddled around the pentagram... The creature spits at you. Disgusting.`;
    } else if (bossThreeCheckCounter === 1) {
      return `They call me... the Menace.. Or was it Sinned? I know. It's Cazasa. Cazasa the Great, nice to meet you. *attempts to spit on you again*`;
    } else if (bossThreeCheckCounter === 2) {
      return `These other two sad creatures have lost themselves. Not me though! I know who I am! I forget what we're doing though...`;
    } else if (bossThreeCheckCounter === 3) {
      return `The other two creatures howl loudly at Cazasa the Great.`;
    } else if (bossThreeCheckCounter > 3) {
      return `Go away, they reminded me we're trying to bring Joy back into our lives. We just keep missing this one thing... Wait, what are we doing again?`;
    }
  },
  bossFour: (bossFourCheckCounter) => {
    if (bossFourCheckCounter === 0) {
      return `You're pretty sure of yourself as you approach one of the three figures huddled around the pentagram... The creature cackles to itself. You barely hear it muttering between laughs.`;
    } else if (bossFourCheckCounter === 1) {
      return `I'm losing myself... I remember... we were working on a procrastination app... or was it a face analyzer app... We're lost without Joy.`;
    } else if (bossFourCheckCounter === 2) {
      return `Students? Did you say students? Are you... She-Who-Knows? No, you look too lost.`;
    } else if (bossFourCheckCounter === 3) {
      return `Quiet, we're almost finished bringing Joy back into our lives. I need to finish the back-end.`;
    } else if (bossFourCheckCounter > 3) {
      return `The being goes back to muttering quietly under its breath.`;
    }
  },
  bossFive: (bossFiveCheckCounter) => {
    if (bossFiveCheckCounter === 0) {
      return `One of the two figures before you looks wizened and powerful; he's obviously a powerful summoner. You cannot understand what he's saying... it sounds like Valheim.`;
    } else if (bossFiveCheckCounter === 1) {
      return `The summoner notices you and speaks clearly, "You saw the creatures from the previous room? Hah, are they still trying to bring Joy to the hellish dimension? A fool's errand."`;
    } else if (bossFiveCheckCounter === 2) {
      return `There is but one escape here, and I know I alone know the way..."`;
    } else if (bossFiveCheckCounter === 3) {
      return `Desperate to know how to escape, you ask, but the summoner only laughs and turns his back to you. He materializes a terminal out of thin air. He is completely ignoring you now.`;
    } else if (bossFiveCheckCounter > 3) {
      return `... Must ... get ... the ... gold.`;
    }
  },
  bossSix: (bossSixCheckCounter) => {
    if (bossSixCheckCounter === 0) {
      return `One of the two figures before you looks like a mighty warrior. - Tony`;
    } else if (bossSixCheckCounter === 1) {
      return `...boss dialogue 2/4...`;
    } else if (bossSixCheckCounter === 2) {
      return `...boss dialogue 3/4...`;
    } else if (bossSixCheckCounter === 3) {
      return `...boss dialogue 4/4...`;
    } else if (bossSixCheckCounter > 3) {
      return `...boss dialogue last...`;
    }
  },
  bossSeven: (bossSevenCheckCounter) => {
    if (bossSevenCheckCounter === 0) {
      return `Iyana`;
    } else if (bossSevenCheckCounter === 1) {
      return `...boss dialogue 2/4...`;
    } else if (bossSevenCheckCounter === 2) {
      return `...boss dialogue 3/4...`;
    } else if (bossSevenCheckCounter === 3) {
      return `...boss dialogue 4/4...`;
    } else if (bossSevenCheckCounter > 3) {
      return `...boss dialogue last...`;
    }
  },
  bossEight: (bossEightCheckCounter) => {
    if (bossEightCheckCounter === 0) {
      return `Senyo`;
    } else if (bossEightCheckCounter === 1) {
      return `...boss dialogue 2/4...`;
    } else if (bossEightCheckCounter === 2) {
      return `...boss dialogue 3/4...`;
    } else if (bossEightCheckCounter === 3) {
      return `...boss dialogue 4/4...`;
    } else if (bossEightCheckCounter > 3) {
      return `...boss dialogue last...`;
    }
  },
  bossFinal: (bossFinalCheckCounter, cat1CheckCounter, cat2CheckCounter, dogCheckCounter) => {
    if (bossFinalCheckCounter === 0 && cat1CheckCounter === 0 && cat2CheckCounter === 0 && dogCheckCounter === 0) {
      return `You reach an enchantress shouting what sounds like an ancient spell. "FREYA! PTAHMOSE! LEXIE", she shouts. You try to get her attention.`;
    } else if (bossFinalCheckCounter === 1 && cat1CheckCounter === 0 && cat2CheckCounter === 0 && dogCheckCounter === 0) {
      return `"Don't talk to me right now. My fur babies are loose!", she yells at you. You realize that spell was actually her pets' names. Begrudgingly, you decide to look for them.`;
    } else if (bossFinalCheckCounter === 1 && cat1CheckCounter === 1 && cat2CheckCounter === 0 && dogCheckCounter === 0) {
      return `"You found Freya! Where did you go, you naughty girl?!", the enchantress exclaims as you hand over the cat. "Please help me find Ptahmose and Lexie too", the enchantress pleads. You have no choice.`;
    } else if (bossFinalCheckCounter === 1 && cat1CheckCounter === 0 && cat2CheckCounter === 1 && dogCheckCounter === 0) {
      return `"That's Ptahmose! Well done! Was he digging up dead animals again?", the enchantress says, looking overjoyed. You realize that finding her cats as well would gain you her favor, so you decide to continue your search.`;
    } else if (bossFinalCheckCounter === 1 && cat1CheckCounter === 0 && cat2CheckCounter === 0 && dogCheckCounter === 1) {
      return `"Lexie!", the enchantress says happily as you hand over the dog. "Thank you! Did you see my cats anywhere? Please help me find them too.". The dog looks at you, its expressive eyes begging you not to comply. "Sorry Lexie, I need to get out of here.", as you turn around and start searching.`;
    } else if (bossFinalCheckCounter === 1 && cat1CheckCounter === 1 && cat2CheckCounter === 1 && dogCheckCounter === 0) {
      return `"Amazing. You must be really good with cats, to have found both. Freya and Ptahmose thank you!", claims the enchantress. The cats' faces definitely disagree. You silently empathize with the dog, before starting to look for him.`;
    } else if (bossFinalCheckCounter === 1 && cat1CheckCounter === 1 && cat2CheckCounter === 0 && dogCheckCounter === 1) {
      return `"Great job! Please help me find that pompous Ptahmose while I keep Freya from tormenting Lexie.", says the enchantress. You feel sorry for the dog, but decide that no amount of pupster smiles is worth staying stuck in this nightmare.`;
    } else if (bossFinalCheckCounter === 1 && cat1CheckCounter === 0 && cat2CheckCounter === 1 && dogCheckCounter === 1) {
      return `"Well done! Only Freya is left now. Please find her while I keep Ptahmose from harassing Lexie." The dog looks at you, its eyes pleading you to let that cat stay lost forever. "I'm sorry Lexie. Not my fight. I hope you'll forgive me.", you mumble as you start the search for the final feline.`;
    } else if (bossFinalCheckCounter === 1 && cat1CheckCounter === 1 && cat2CheckCounter === 1 && dogCheckCounter === 1) {
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
  diploma: () => {
    return `You feel chills down your spine as you grab the diploma, as if you had been immersed in an icy cold bath. But all of a sudden, the feeling's gone. You jump up, finally awake in your own room in front of your computer. It's over...`;
  },
  fountain: (fountainCheckCounter) => {
    if (fountainCheckCounter=== 0) {
      return `A water fountain. A welcome sight after what you've been through. Go ahead, take a drink."`;
    } else {
      return `"This water has a mild but strange taste.", you think as you take another drink. "I'm sure it's fine.", you think ... and hope. `;
    }
  },
};
export default gameFuncs;
