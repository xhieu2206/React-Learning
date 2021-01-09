export const formatNumber = (num, type) => {
  var numSplit, int, dec, intReverse, numbersArray, strTemp, sign;

  num = Math.abs(num);
  num = num.toFixed(2);

  numSplit = num.split('.');

  int = numSplit[0];
  intReverse = int.split('').reverse().join('');
  numbersArray = [];

  dec = numSplit[1];

  while (intReverse.length > 3) {
    strTemp = intReverse.slice(0, 3);
    numbersArray.push(strTemp);
    intReverse = intReverse.replace(strTemp, '');
  }

  if (intReverse.length > 0) {
    numbersArray.push(intReverse);
  }

  numbersArray = numbersArray.join(',').split('').reverse().join('');

  sign = (type === 'inc') ? '+' : '-';
  return sign + ' ' + numbersArray + '.' + dec;
}
