const fs = require('fs');
const path = require('path');
const inputDir = 'input';
const outputDir = 'output';

// Check if the input directory exists. If it doesn't, create it.
try {
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir);
    console.log("Error: The 'input' directory does not exist, so recreated it. Put one or more language files in LANG format into that directory you want to convert, and run the converter again.");
    process.exit(0);
  }
} catch (err) {
  console.log("An error occurred while creating the 'input' directory:", err);
  process.exit(1);
}

// Check if there are any LANG files in the input directory.
const inputFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.lang'));
if (inputFiles.length === 0) {
  console.log("Error: No files available for conversion.");
  process.exit(0);
}

// Check if the output directory exists. If it doesn't, create it.
try {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
} catch (err) {
  console.log("An error occurred while creating the 'output' directory:", err);
  process.exit(1);
}

// Convert the LANG files and save them in the output directory.
// Read a list of files in a directory
const files = fs.readdirSync(inputDir);

// Initialize a counter for the number of errors
let errorCount = 0;

// Iterate over each file
for (const file of files) {
  // Skip non-LANG files
  if (!file.endsWith('.lang')) continue;
  
  // Check if the passed is a file
  try {
    const stats = fs.lstatSync(path.join(inputDir, file));
    if (!stats.isFile()) continue;
  } catch (err) {
    console.log(`An error occurred while checking if ${file} is a file:`, err);
    process.exit(1);
  }

  // Read the file
  const content = fs.readFileSync(path.join(inputDir, file), 'utf8');

  // Split file into line array
  const lines = content.split('\n');

  // Initialize the result object
  const result = {};

  // Iterate over each line
  for (const line of lines) {
    // Skip lines beginning with '#', '//', '!', '=', 'pack.name' or 'pack.description'
    if (line.startsWith('#') || line.startsWith('//') || line.startsWith('!') || line.startsWith('=') || line.startsWith('pack.name') || line.startsWith('pack.description')) continue;

    // Search index for '=' sign
  const index = line.indexOf('=');

    // Skip lines that do not contain the '=' sign
    if (index === -1) continue;

    // Split the line into keys (before the '=' sign) and values (after the '=' sign)
    const key = line.substring(0, index);
    let value = line.substring(index + 1);

    // Delete any text after the '#' sign in the value, if present
    value = value.split('#')[0].trim();

    // Add key-value pairs to the result object
    result[key] = value;
  }

  // Generate output file names using input file names
  const outputFile = path.join('output', path.basename(file, '.lang') + '.json');

  // Try to write result object to file as JSON
  try {
    fs.writeFileSync(outputFile, JSON.stringify(result, (key, value) => {
      // Return the value as-is if it is not a string
      if (typeof value !== 'string') return value;

      // Return the value with the special characters unescaped
      return value.replace(/\\n/g, '\n');
    }, 2));
  } catch (err) {
    // Increment the error counter
    errorCount++;

    // Print an error message
    console.log(`An error occurred while saving the file ${outputFile}:`, err);
  }
}

// Print the final message
if (errorCount == 1) {
  console.log(`Files were successfully converted, but ${errorCount} error was found. Please check the log.`);
} else if (errorCount >= 2) {
  console.log(`Files were successfully converted, but ${errorCount} errors were found. Please check the log.`);
} else {
  console.log(`Conversion of all LANG files has been successfully completed and saved in the 'output' directory!`);
}

