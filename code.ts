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
  console.log(create_cloze_tests(words, examples).join(";"));
}
function create_cloze_tests(words:string[], examples:string[][]) :string[]{
  const answer:string[] = [];
  console.log(words);
  const regExp = RegExp(words.join("|"));
  for (const example of examples) {
    const {word,result}=create_cloze_test(example[0],regExp)
    answer.push([[result,example[1]].join("\n\n"),word].join(","));
  }
  return answer;
}
function create_cloze_test(example:string,regExp:RegExp):{word:string,result:string}{
  const result:string[] = [];
  let correct_word = "";
  for(const word of example.split(" ")) {
    if (regExp.test(word)) {
      result.push("( )")
      correct_word=word
    }else{
      result.push(word);
    }
  }
  return {result:result.join(" "),word:correct_word};
}