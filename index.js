const inquirer = require('inquirer');

const start = async () => {
  const prompt = inquirer.createPromptModule();
  const answer = await prompt({
    type: 'confirm',
    name: 'item',
    message: 'Jira code name is correct ?',
  })

  console.log('answer', answer)
}

start()