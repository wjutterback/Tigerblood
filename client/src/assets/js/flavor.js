const gameFuncs = {
  deadBody: (bodyCheckCounter) => {
    if (bodyCheckCounter === 0) {
      return `You find a desiccated corpse, withered and ancient looking, sporting the finest bling you've ever seen. Despite your dire circumstances, you refuse to leave behind such beautiful craftmanship. It looks good on your finger.`;
    } else
      return 'What a beautiful, incredibly dead, person. Thanks for the ring!';
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
  door: (bodyCheckCounter) => {
    if (bodyCheckCounter === 0) {
      return `It's a sturdy door. There's no way you're going to force your way through.`;
    }
    if (bodyCheckCounter > 0) {
      return `Your ring begins to feel warm, images swarm in your mind, converting the laws of this world into a familiar form - JAVASCRIPT!`;
    }
  },
  fire: (fireCheckCounter) => {
    if (fireCheckCounter === 0){
      return `Despite its appearance, the fire emits no warmth.`;
    } else {
      return `Still no warmth. At least it provides barely enought light to look around`;
    }    
  },
  hotLava: (hotLavaCheckCounter) => {
    if (hotLavaCheckCounter === 0){
      return `Lava?! Really?! It's not passable. Maybe it needs to be cooled down somehow...`;
    } else {
      return `Yup. Hot lava again. Time to find a way to cool it down.`;
    }    
  },
  keypad: (keypadCheckCounter) => {
    if (keypadCheckCounter === 0){
      return `A keyboard? In a dungeon? What purpose could this serve?`;
    } else {
      return `A familiar sight. Time to get started. Now, what was that syntax again...?`;
    }    
  },
  golem: (golemCheckCounter) => {
    if (golemCheckCounter === 0){
      return `That's one creepy statue. Its eyes seem to follow you across the room.`;
    } else {
      return `The statue keeps getting creepier somehow. Its expressions make you very uneasy`;
    }    
  },
  helpStone: (bodyCheckCounter) => {
    if (bodyCheckCounter === 0) {
      return `The last thing you remember is you were coding Project 3... Tish invited you to a Zoom call, you accepted... and now you're in a dungeon. What is going on?`;
    } else
      return `As you touch the strange stone, the ring fills you with warmth. You understand everything now. Tish has trapped your whole class inside a bitcoin app! It makes sense why she kept bragging the GPU shortage didn't affect her! You are the code and every movement performs some pointless hash in search of cryptocurrency.`;
  },
};
export default gameFuncs;
