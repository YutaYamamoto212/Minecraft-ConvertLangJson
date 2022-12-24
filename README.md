# Minecraft-ConvertLangJson
This tool allows you to convert Minecraft language files in different formats:  
- LANG: Java Edition 1.12.2 and below, and Bedrock Edition.  
- JSON: Java Edition 1.13 and above.  

# How to use?
First of all, first confirm which operation you want to perform:
- Convert LANG to JSON. 
- Convert JSON to LANG. 

## Convert LANG to JSON
First, you need to install node.js. To get it, click [HERE](https://nodejs.org/).
Second, go to the `LANG to JSON` directory.
Third, place the language files in LANG format to be converted in the `input` directory. You can place more than one file.
Fourth, double click on `convert.bat` and it will do the conversion.
Finally, the result of the conversion will be saved in the `output` directory.

- If you want to clear the `input` directory, double click on `clear_intput.bat`.
- If you want to clear the `output` directory, double click on `clear_output.bat`.

## Convert JSON to LANG
First, you need to install node.js. To get it, click [HERE](https://nodejs.org/).
Second, go to the `JSON to LANG` directory.
Third, place the language files in JSON format to be converted in the 'input' directory. You can place more than one file.
Fourth, double click on `convert.bat` and it will do the conversion.
Finally, the result of the conversion will be saved in the `output` directory.

- If you want to clear the `input` directory, double click on `clear_intput.bat`.
- If you want to clear the `output` directory, double click on `clear_output.bat`.

# Trobleshooting
1. Getting an error when double clicking `convert_json_to_lang.js` or `convert_lang_to_json.js`.
Please double-click `convert.bat` to run the conversion.

2. Getting `'node' is not recognized as an internal or external command.` message.
You may not have node.js installed, or your system environment variables may not be configured correctly.
Please install node.js to fix the problem.
If you are sure you have node.js installed and the problem continues, follow these steps:
(1) Open Control Panel -> System and Security -> System -> Advanced System Settings -> Environment Variables
(2) In "User variables" or "System variables" find variable `PATH` and add node.js folder path as value. Usually it is `C:\Program Files\nodejs;`. If variable doesn't exists, create it.
(3) Restart your computer.

3. Getting `Error: The 'input' directory does not exist, so recreated it. Put one or more language files in LANG/JSON format into that directory you want to convert, and run the converter again.` message.
You removed the 'input' directory, so the converter won't work. It will re-create the directory, prompt you to place one or more JSON files to be converted, and then re-run the converter.

4. Getting `An error occurred while creating the 'input'/'output directory.` message.
Please make sure that the directory where the converter is located has write permission, and there is no read-only file named `input` or `output`.

5. Getting `Error: No files available for conversion.` message.
Please make sure the 'input' directory has one or more JSON file you want to convert, otherwise the converter will not work properly.

6. Getting `Warning: <Filename> is not a valid JSON file. Skipping it.` message.
Make sure the JSON file is valid, otherwise it will be skipped. Please check for missing or extra commas, double quotes, colons and curly brackets and correct them.

7. Getting `An error occurred while saving <Filename>.` message.
Make sure that the `output` directory has write permissions and does not have a read-only file named the same as the file that will be saved.

8. Getting `Error: No valid JSON files available for conversion.` message.
Make sure all JSON files located in the `input` directory are valid. Please check for missing or extra commas, double quotes, colons and curly brackets and correct them.

If you can't solve these problems, or have a problem that I didn't list, welcome to my [Discord server](https://discord.gg/tqzdEaBAcn) for assistance.