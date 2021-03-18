/*********************************************
 *
 *  PART -1
 *  just some little helper functions
 *  and imports
 *
*/

// built in module
// fs = "File System"
var fs = require('fs');

var drawLine = function() {
  console.log('*'.repeat(40));
}

var logKeyAndValue = function(key, value) {
  console.log(key + ':');
  console.log('    ' + value);
  space();
}

var space = function() {
  console.log('');
}

var clearAndReprintCommand = function() {
  console.clear();
  drawLine();
  var args = Array.from(process.argv);
  var command = [
    'node',
    'presentation.js',
    ...args.slice(2)
  ];
  logKeyAndValue('Command', command.join(' '));
  drawLine();
}

















/*********************************************
 *
 *  PART 0
 *  process.argv
 *    (the command that started this program)
 *    0 node
 *    1 this file
 *    2+ any arguments passed along
 */


// if there are
if (process.argv.length < 3) {
  clearAndReprintCommand();
  logKeyAndValue('process.argv[0]', process.argv[0]);
  logKeyAndValue('process.argv[1]', process.argv[1]);
  drawLine();
}

if (process.argv[2] === 'list') {
  clearAndReprintCommand();
  for (let i = 0; i < process.argv.length; i++) {
    logKeyAndValue('process.argv[' + i + ']', process.argv[i]);
  }
  drawLine();
}







/*********************************************
 *
 *  PART 2
 *    Let's Create a Stream from a File
 */
if (process.argv[2] === '2') {
  clearAndReprintCommand();

  // create a stream
  var fileName = __dirname + '/songs.csv';
  var stream = fs.createReadStream(fileName);

  // what does it look like?
  console.log(stream);

  drawLine();
}


















/*********************************************
 *
 *  PART 3
 *    Read Stream
 */
 if (process.argv[2] === '3') {
  clearAndReprintCommand();

  // create a stream
  var fileName = __dirname + '/songs.csv';
  var stream = fs.createReadStream(fileName);

  // set the encoding - otherwise it's just a raw buffer
  stream.setEncoding('utf8');

  // when the stream emits data
  stream.on('data', (chunk) => {
    // do this with "chunk"
    console.log(chunk.length);
    console.log(chunk.substring(0, 50) + '...');
    space();
  });

  // what is 2 ^ 16?
  logKeyAndValue('2 ^ 16', Math.pow(2, 16));

  drawLine();
}













/*********************************************
 *
 *  PART 4
 *    Read Stream - Hilight New Lines
 */
 if (process.argv[2] === '4') {
  clearAndReprintCommand();

  // create a stream
  var fileName = __dirname + '/songs.csv';
  var stream = fs.createReadStream(fileName);

  // set the encoding - otherwise it's just a raw buffer
  stream.setEncoding('utf8');

  // when the stream emits data
  stream.on('data', (chunk) => {
    // do this with "chunk"
    var text = chunk.substring(0, 50);
    // make it real obvious that the lines are all over the place
    var highlighted = text.replace(/\n/g, '___NEW_LINE___');
    console.log(highlighted + '...');
    space();
  });

  // what is 2 ^ 16?
  logKeyAndValue('2 ^ 16', Math.pow(2, 16));

  drawLine();
}









/*********************************************
 *
 *  PART
 */
 if (process.argv[2] === '5') {
  clearAndReprintCommand();

  // create a stream
  var fileName = __dirname + '/songs.csv';
  var stream = fs.createReadStream(fileName);

  // set the encoding - otherwise it's just a raw buffer
  stream.setEncoding('utf8');

  var counter = 0;
  // when the stream emits a chunk
  stream.on('data', (chunk) => {
    // increment our counter
    counter++;
  });

  stream.on('end', () => {
    logKeyAndValue('How many chunks?', counter);
  });

  drawLine();
}








/*********************************************
 *
 *  PART 6
 *    starting a stream
 */
 if (process.argv[2] === '6') {
  clearAndReprintCommand();

  // create a stream
  var fileName = __dirname + '/songs.csv';
  var stream = fs.createReadStream(fileName);

  // set the encoding - otherwise it's just a raw buffer
  stream.setEncoding('utf8');

  var counter = 0;
  /*
  // when the stream emits a chunk
  stream.on('data', (chunk) => {
    // increment our counter
    counter++;
  });
  */

  stream.on('end', () => {
    logKeyAndValue('How many chunks?', counter);
    drawLine();
  });

}











/*********************************************
 *
 *  PART 7
 *    stopping and restarting a stream
 */
 if (process.argv[2] === '7') {
  clearAndReprintCommand();

  // create a stream
  var fileName = __dirname + '/songs.csv';
  var stream = fs.createReadStream(fileName);

  // set the encoding - otherwise it's just a raw buffer
  stream.setEncoding('utf8');

  // when the stream emits a chunk
  stream.on('data', (chunk) => {
    // pause the stream
    stream.pause();

    var excerpt = chunk.substring(0, 50) + '...';
    logKeyAndValue('Start of Chunk', excerpt);
    // in 1500 ms resume the stream
    setTimeout(() => {
      stream.resume();
    }, 1500);
  });


  stream.on('end', () => {
    console.log('It\'s all done!');
    drawLine();
  });

}











/*********************************************
 *
 *  PART 8
 *    Let's Create a Write Stream
 */
 if (process.argv[2] === '8') {
  clearAndReprintCommand();

  // fs is imported already at the top
  // var fs = require('fs');
  var file = fs.createWriteStream('./file.txt');

  file.write('hello\n');
  file.write('world!\n');

  file.end();

  drawLine();
}
















/*********************************************
 *
 *  PART 9
 *    Let's Combine Them
 */
 if (process.argv[2] === '9') {
  clearAndReprintCommand();


  // create a read stream
  var fileName = __dirname + '/songs.csv';
  var stream = fs.createReadStream(fileName);

  // create a write stream
  // fs is imported already at the top
  // var fs = require('fs');
  var file = fs.createWriteStream('./file.txt');

  // keep count of our chunks
  var counter = 0;

  stream.on('data', (chunk) => {
    counter++;
    file.write(counter + '\n');
  });

  stream.on('end', () => {
    file.end();
    drawLine();
  });

}

