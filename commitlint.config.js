module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nova funcionalidade
        'fix', // Correção de bug
        'docs', // Documentação
        'style', // Formatação, missing semi colons, etc
        'refactor', // Refatoração de código
        'test', // Adição ou correção de testes
        'chore', // Mudanças no processo de build ou ferramentas
        'perf', // Melhoria de performance
        'ci', // Mudanças no CI
        'build', // Mudanças no sistema de build
        'revert', // Reversão de commit
      ],
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
};
