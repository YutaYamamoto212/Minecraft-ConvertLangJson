const fs = require('fs');

const inputDir = 'input';
const outputDir = 'output';

// Check if the input directory exists. If it doesn't, create it.
try {
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir);
    console.log("Error: The 'input' directory does not exist, so recreated it. Put one or more language files in JSON format into that directory you want to convert, and run the converter again.");
    process.exit(0);
  }
} catch (err) {
  console.log("An error occurred while creating the 'input' directory:", err);
  process.exit(1);
}

// Check if there are any JSON files in the input directory.
const inputFiles = fs.readdirSync(inputDir).filter(file => file.endsWith('.json'));
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

// Convert the JSON files and save them in the output directory.
let validFiles = 0;
let parseErrors = 0; // added this variable to count the number of errors while parsing JSON files
let saveErrors = 0; // added this variable to count the number of errors while saving files
for (const inputFile of inputFiles) {
  // Read the contents of the input file.
  let contents = fs.readFileSync(`${inputDir}/${inputFile}`, 'utf-8');
  
  // Remove comments from the contents.
  contents = contents.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$|^\s*#.*$/gm, '$1');

  // Check if the contents is a valid JSON object.
  let obj;
  try {
    obj = JSON.parse(contents);
  } catch (err) {
    console.log(`Warning: ${inputFile} is not a valid JSON file. Skipping it.`);
    parseErrors++; // increment the error count
    continue;
  }

  // Convert the JSON object to LANG.
  let output = '';
  for (const key of Object.keys(obj)) {
    // Use replace to replace newline characters with '\n'
    output += `${key}=${obj[key].replace(/\n/g, '\\n')}\n`;
  }

  // Save the output in the output directory.
  const outputFile = inputFile.replace('.json', '.lang');
  try {
    fs.writeFileSync(`${outputDir}/${outputFile}`, output);
  } catch (err) {
    console.log(`An error occurred while saving ${outputFile}:`, err);
  saveErrors++; // increment the error count
  }
  
  validFiles++;
}

if (validFiles === 0) {
  console.log("Error: No valid JSON files available for conversion.");
  process.exit(0);
}

const errorCount = parseErrors + saveErrors; // total number of errors
if (errorCount == 1) { // check if there was an error
  console.log(`Files were successfully converted, but ${errorCount} error was found. Please check the log.`);
} else if (errorCount >= 2) { // check if there were two or more errors
  console.log(`Files were successfully converted, but ${errorCount} errors were found. Please check the log.`);
} else if (validFiles > 0) {
  console.log("Conversion of all JSON files has been successfully completed and saved in the 'output' directory!");
} else {
  console.log("No files were successfully saved. Please check the log.");
}