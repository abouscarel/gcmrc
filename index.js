const inquirer = require('inquirer');
const shell = require('shelljs');

const start = async () => {
  // Find Jira Code
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }
  const branchName = shell.exec("git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ \1/'", {silent: true}).stdout
  let splittedBranchName = branchName.split('/')
  if (splittedBranchName.length < 2) {
    console.log('Nom de branch incorrect.\nLe format doit être : <Type de story>/<Projet>-<Numero de la story>-<Description>')
    process.exit()
  }
  splittedBranchName = splittedBranchName[splittedBranchName.length - 1].split('-')
  let jiraCode = `${splittedBranchName[0]}-${splittedBranchName[1]}`


  const prompt = inquirer.createPromptModule();
  let answer = await prompt({
    type: 'confirm',
    name: 'item',
    message: `Le Code item Jira est il correct ? ${jiraCode}`,
    default: true
  })

  if (answer.item === false) {
    let jiraCodeAnswer = await prompt({
      type: 'input',
      name: 'jiraCode',
      message: `Entrez votre Code Item Jira ?`,
    })
    if (!jiraCodeAnswer.jiraCode) {
      console.log('Code Jira incorrect.')
      process.exit()
    }
    jiraCode = jiraCodeAnswer.jiraCode
  }

  let section = 'N/C'
  let sectionAnswer = await prompt({
    type: 'input',
    name: 'section',
    message: `Quel est la section impacté ?`,
  })
  if (sectionAnswer.section) {
    section = sectionAnswer.section
  }
  

  let commitMessage = null
  let commitMessageAnswer = await prompt({
    type: 'input',
    name: 'commitMessage',
    message: `Message de commit :`,
  })
  if (commitMessageAnswer.commitMessage) {
    commitMessage = commitMessageAnswer.commitMessage
  } else {
    console.log('Message de commit incorrect.')
    process.exit()
  }


  console.log('\ncommit message :', `${jiraCode} - ${section} - ${commitMessage}`)

}

start()