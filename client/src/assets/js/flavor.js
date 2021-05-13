const gameFuncs = {
  deadBody: (bodyCheckCounter, messageCheckCounter) => {
    if (bodyCheckCounter === 0 && messageCheckCounter === 0) {
      return `You find a desiccated corpse, withered and ancient looking, sporting the finest bling you've ever seen. You gaze longingly at such beautiful craftmanship, but you're not a thief.`;
    } else if (bodyCheckCounter > 0 && messageCheckCounter === 0) {
      return `You notice some writing on the floor next to the body ... written with blood. You take a deep breath and move closer to read it.`;
    } else if (bodyCheckCounter > 0 && messageCheckCounter > 0) {
      return `The initials B.E. sound familiar, but the thought escapes you as the body dissipates into thin air - leaving behind the ring promised to you.`;
    }
  },
  helpMessage: (messageCheckCounter) => {
    if (messageCheckCounter === 0) {
      const a = `I don't know who you are. Please believe. There is no way I can convince you that this is not one of her tricks. But I don't care.`;
      const b = `I spent the last of my power to give you help, and my blood in the hopes you escape this place. The ring will allow you to view the elemental composition of this world, changing it to your will, but it will test the limits of your Joyous Spirit. Fizz Buzz. - B.E.`;
      return `${a} ${b}`;
    } else if (messageCheckCounter === 1) {
      return `Fizz Buzz? Joyous Spirit? They must have been delirious from loss of blood.`;
    } else if (messageCheckCounter > 1) {
      return `Very macabre. You shove the thought of their desperation out of your mind.`;
    }
  },
  door: (ringVar, door) => {
    if (ringVar === 0) {
      return `It's a simple but sturdy door. There's no way you're going to force your way through.`;
    }
    if (ringVar === 1) {
      return {
        lines: [1, 2, 3, 4, 5, 6, 7, 8, 10],
        text: `Your ring begins to feel warm, images swarm in your mind, converting the laws of this world into a familiar form - JAVASCRIPT! You understand now; the way forward is changing this door from locked to unlocked. All the rest of the code is readOnly`,
        code: `
/*
My notes: Experimented with making a door today!
It was the first door I've ever made, but I'm pretty proud of it.
There's still so much more to be done.
I created a simple lock by setting tileMap[${door.x}][${door.y}] = 'L'; For 'Locked Door'!
Note: 'U' for Unlocked Door.
*/
function door1(tileMap) {
  return tileMap[${door.x}][${door.y}] = 'L'
}`,
      };
    }
  },
  fire: (fireCheckCounter) => {
    if (fireCheckCounter === 0) {
      return `Despite its appearance, the fire emits no warmth.`;
    } else {
      return `Still no warmth. At least it provides enough light to look around`;
    }
  },
  hotLava: (hotLavaCheckCounter) => {
    if (hotLavaCheckCounter === 0) {
      return `Lava?! Really?! It's not passable. Maybe it needs to be cooled down somehow...`;
    } else {
      return `Yup. Hot lava again. Time to find a way to cool it down.`;
    }
  },
  keypad: (keypadCheckCounter) => {
    if (keypadCheckCounter === 0) {
      return `A keyboard? In a dungeon? What purpose could this serve?`;
    } else {
      return `A familiar sight. Time to get started. Now, what was that syntax again...?`;
    }
  },
  golem: (golemCheckCounter, ringCheckCounter) => {
    if (golemCheckCounter === 0 && ringCheckCounter === 0) {
      return `That's one creepy statue. Its eyes seem to follow you across the room. It blocks your way to the next area.`;
    } else if (golemCheckCounter > 0 && ringCheckCounter === 0) {
      return `The statue keeps getting creepier somehow. Its expression makes you very uneasy. There must be a way to remove it.`;
    } else if (golemCheckCounter > 0 && ringCheckCounter === 1) {
      return `The ring on your finger pulsates. The golem explodes, leaving behind nothing and clearing the way.`;
    }
  },
  helpStone: (bodyCheckCounter) => {
    if (bodyCheckCounter === 0) {
      return `Your memories start coming back. The last thing you remember is you were coding Project 3... Tish invited you to a Zoom call, you accepted... and now you're in a dungeon. What is going on?`;
    } else
      return `As you touch the strange stone, the ring fills you with warmth. You understand everything now. Tish has trapped your whole class inside a bitcoin app! It makes sense why she kept bragging the GPU shortage didn't affect her! You are the code and every movement performs some pointless hash in search of cryptocurrency.`;
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
      return `Get back to the work at hand. Everyone focus on the project. We need Joy!`;
    } else if (bossTwoCheckCounter === 2) {
      return `Every one says my name wrong. But I don't care. What's my name? Hah, hah, hah... Like I'd tell you. *smiles*`;
    } else if (bossTwoCheckCounter === 3) {
      return `I wrote this code to bring our Joy back, it broke, but I fixed it.. Almost. It's missing something...`;
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
      return `Quiet, we're almost finished bringing Joy back into our lives.`;
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
  // bossFinal: (bossFinalCheckCounter) => {
  //   if (bossFinalCheckCounter === 0 && catsCheckCounter === 0 && dogsCheckCounter) {
  //     return `"How did you get out so quickly? Oh, never mind. I can't talk right now. My fur babies are on the loose!"`;
  //   } else if (bossFinalCheckCounter === 1 && catsCheckCounter === 0 && dogsCheckCounter === 0) {
  //     return `"When I figure out who left the door open ..."`;
  //   } else if (bossFinalCheckCounter === 1 && catsCheckCounter === 1 && dogsCheckCounter === 0) {
  //     return `"You found one of my cats! Hurry, the other must be close."`;
  //   } else if (bossFinalCheckCounter === 1 && catsCheckCounter === 2 && dogsCheckCounter === 0) {
  //     return `"You found both my cats! Nice work! Now please help me find my dog too."`;
  //   } else if (bossFinalCheckCounter === 1 && catsCheckCounter === 0 && dogsCheckCounter === 1) {
  //     return `"You found my pupster! Please help me look around for my cats too!"`;
  //   } else if (bossFinalCheckCounter === 1 && catsCheckCounter === 1 && dogsCheckCounter === 1) {
  //     return `"Good work! Just one cat left. I'm sure I heard a noise over there!"`;
  //   } else if (bossFinalCheckCounter === 1 && catsCheckCounter === 2 && dogsCheckCounter === 1) {
  //     return `"You did it! Thank you very much. Your diploma is ready! Congratulation! Now go out there and be somebody!!`;
  //   }
  // },
};
export default gameFuncs;
