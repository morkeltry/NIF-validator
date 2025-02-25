const div = 1;  // previously had figs backwards, so needed to divide by 9. This is unnecessary now.
validStartDigits = [' 1', ' 2', ' 3', '45', ' 5', ' 6', '70', '71', '72', '74', '75', '77', '79', ' 8', '90', '91', '98', '99'];

const inputStr = process.argv.slice(2)[0];

// Check if the input is a valid number and has the correct length
if (!/^\d+$/.test(inputStr)) {
    console.log("Input is not a valid number.");
    process.exit(1);
};

const input = Array.from(inputStr).map(Number);

const mod11Div = (fig, div) => {
  let i=9;
  let check = fig;
  while (i--) {
    check = (check*div)%11;
  }
  return check
}

const checkMod11 = input => {
  const totalSoFar = input
    .reduce((acc, el, idx)=> {
      let pos = 9-idx;
      console.log({acc});
      if (idx)      
        console.log(9,'->',pos+1,'=',acc,': -> ',((acc)%11)%10);  
      console.log('    ',pos,': ',el,'-> ',((pos*el)%11)%10); 
      acc += pos*el;
      console.log(9,'->',pos,': ',acc,'-> ',((acc)%11)%10);  
      console.log({acc},'\n');       
      return acc
    }, 0);
  console.log({totalSoFar});
  console.log('totalSoFar', totalSoFar, 'totalSoFar%11', totalSoFar%11, 
              '(11-(totalSoFar%11))%11', (11-(totalSoFar%11))%11, '', );
  
  return (11-(totalSoFar%11))%11;  
}
  

if (input.length == 8) {
  // set the ninth figure
  // to be the figure which, when we multiply it by 9 mod 11,
  // gives us the check digit needed to make a round (ie divisible by 11) number
  console.log('checkMod11(input)', checkMod11(input));  
  console.log('missing amount: ', mod11Div(checkMod11(input), div));  

  input[8] = mod11Div(checkMod11(input), div) %10;
  console.log('Check digit :', input[8]);
}

console.log(input.length, input);

input.forEach (fig=>{
  console.log(mod11Div(fig, div),'*',div,'mod 11 = ', fig);
  
})


if (input.length == 9) {
  const startDigits = ['1', '2', '3', '5', '6', '8'].includes(input[0])
    ? input.substr(0, 2)
    : ' ' + input[0];
  console.log(startDigits,
    validStartDigits.includes(startDigits)
    ? 'is a valid start'
    : 'are NOT valid start digits'
  );  
  console.log(input.join(''), 
    checkMod11(input)
     ? ' has INVALID checksum'
     : ' has valid checksum'
  );
} else {
  console.log('Enter 8 digits to get check digit, or 9 for validity check');    
  process.exit(1);

}