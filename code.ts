function myFunction() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const words: string[] = [];
  const examples: string[][] = [];
  for (const paragraph of body.getParagraphs()) {
    // console.log(paragraph.getText())
    const text = paragraph.getText();
    const sentences = text.split(/\r\n|\r|\n/);
    // console.log([sentences.length,sentences])
    if (sentences.length == 1) {
      const word = sentences[0].split(" - ")[0];
      if (word.split(" ").length == 1) {
        words.push(word);
      }
    } else {
      examples.push(sentences);
    }
  }
  // console.log(examples);
  console.log(Array(create_cloze_tests(words, examples)).join("\n"));
}
function* create_cloze_tests(words:string[], examples:string[][]) : Generator<[string,string], void, unknown>{
  console.log(words);
  const regExp = RegExp(words.join("|"));
  for (const example of examples) {
    yield [create_cloze_test(example[0],regExp),example[1]]; 
  }
}
function create_cloze_test(example:string,regExp:RegExp):string{
  return Array(create_cloze_test_inner(example,regExp)).join(" ");
}
function* create_cloze_test_inner(example:string,regExp:RegExp){
  for(const word in example.split(" ")) {
    if (regExp.test(word)) {
      yield "( )"
    }else{
      yield word
    }
  }
}