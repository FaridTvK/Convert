// JavaScript
const showdown = require("showdown");
var Gherkin = require("@cucumber/gherkin");
var Messages = require("@cucumber/messages");
const fs = require("fs");
var uuidFn = Messages.IdGenerator.uuid();
var builder = new Gherkin.AstBuilder(uuidFn);
var matcher = new Gherkin.GherkinClassicTokenMatcher(); // or Gherkin.GherkinInMarkdownTokenMatcher()
var parser = new Gherkin.Parser(builder, matcher);
const path = require('path');




/**
 * @description
 * @param {String} dir
 * @returns {Object[]} 
 * 
 */
function readFilesSync(dir) {
    const files = [];
    fs.readdirSync(dir).forEach(filename => {
        const filepath = path.resolve(dir, filename);
        const stat = fs.statSync(filepath);
        const isFile = stat.isFile();
        if (isFile) files.push(filepath);
    });

    return files;
}




const files = readFilesSync('/home/praktikant/Documents/final Convert/Feature');






fs.rmSync("build", { recursive: true, force: true })
fs.mkdirSync("build");

let generatedUl = "";

let finishedContent = "";
let template = "";
let myUl = [];




function convertFeatureToMarkdown(doc) {


    let result = "";

    result += `# ${doc.feature.keyword}: ${doc.feature.name}\n`;
    result += "\n";

    result += doc.feature.description + "\n\n";

    for (const featureChild of doc.feature.children) {
        if (featureChild.rule != null) {
            const rule = featureChild.rule;





            result += `## ${rule.keyword}: ${rule.name}\n`;
            result += "\n";
            for (const ruleChild of rule.children) {
                const scenario = ruleChild.scenario;

                result += `### ${scenario.keyword}: ${scenario.name}\n`;
                result += "\n";

                for (const step of scenario.steps) {
                    result += `- **${step.keyword.trim()}** ${step.text} \n`;
                }

                result += "\n";
            }
        }

        for (let x of featureChild.rule.children) {
            for (let y of x.scenario.examples) {
                result += `\n`
                result += `|`
                for (let j of y.tableHeader.cells) {
                
                    result += ` ${j.value} \|`
                }
                for (let k of y.tableBody) {
                    result += `\n`
                    result += `|`
                    for (let o of k.cells) {
                        result += `${o.value} \|`


                    }
                }
                result += `\n`
            }
        }
    }

    return result;

}











for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let rule = ""


    var gherkinDocument = parser.parse(

        fs.readFileSync(file, "utf8")

    );

    let myLis = [];
    for (let featureChild of gherkinDocument.feature.children) {
        Mrule = featureChild.rule.name;

        for (let x of featureChild.rule.children) {
            for (let y of x.scenario.examples) {
                // console.log(x.scenario.examples)
                for (let j of y.tableHeader.cells) {
                    console.log(j.value)
                }
                for (let k of y.tableBody) {
                    for (let o of k.cells) {
                        console.log(o.value)
                    }
                }
            }
        }

        myLis.push(Mrule)
    }



    const markdownText = convertFeatureToMarkdown(gherkinDocument);





    fs.writeFileSync(`build/output${i}.md`, markdownText);




    const htmlText = new showdown.Converter().makeHtml(markdownText);






    fs.writeFileSync(`build/output${i}.html`, htmlText);



    let li = " ";
    let j = 0
    for (myLi of myLis) {
        li += `<a href="output${i}.html#regel${myLis[j].replaceAll(" ", "").toLocaleLowerCase()}"  target="iframe_a"> ${myLi}</a>${"\n"}`
        j++
    }

    generatedUl = `
    <li>
    <div class="directory">
    <a href="output${i}.html" target="iframe_a">${file.substring(49, 54)}</a> <br/>
    ${li.toString()}
    </div>
    </li> `;


    myUl.push(generatedUl)

}


template = fs.readFileSync("index.html").toString();
finishedContent = template.replace(
    "___NAVIGATION_PLACEHOLDER___",
    myUl.join(`\n`)
);

fs.writeFileSync("build/index.html", finishedContent);





