(function () {
  'use strict';

  const ANSWERS = {
    grammar2: ['My', 'My', 'Her', 'Her', 'Our', 'Their', 'His'],
    grammar3: ['How', 'Where', 'How old', 'What', 'When', 'Who'],
    vocab4: ['D', 'F', 'A', 'B', 'G', 'E', 'C'],
    vocab5: ['sad', 'easy', 'small', 'big', 'hot', 'new'],
    vocab6: ['ather', 'aughter', 'irl', 'usband', 'rother', 'hildren', 'oman'],
    howto7: [
      'How are your children?',
      "They're good.",
      'Are you OK?',
      "I'm tired.",
      "How's your new cat?",
      "It's great!",
      'How are your classes?',
      "They're great!",
      'Thanks for the coffee.',
      'No problem.'
    ],
    readingTf: ['F', 'T', 'F', 'F', 'F'],
    readingMatch: ['B', 'D', 'A', 'E', 'C'],
    readingCorrect: ['Our', 'and', 'How old', 'and', "When's"],
    readingShort6: ['Ben'],
    readingShort7: ['51', 'fifty-one']
  };

  const MAX_SCORE = 60;

  var correctAnswersFlat = [].concat(
    ANSWERS.grammar2,
    ANSWERS.grammar3,
    ANSWERS.vocab4,
    ANSWERS.vocab5,
    ANSWERS.vocab6,
    ANSWERS.howto7,
    ANSWERS.readingTf,
    ANSWERS.readingMatch,
    ANSWERS.readingCorrect,
    ANSWERS.readingShort6,
    ANSWERS.readingShort7
  );

  var correctAnswersDisplay = [].concat(
    [
      '1 My name is Yan…',
      '2 My teacher is nice.',
      '3 Her name is Mrs Greeves.',
      '4 Her classroom is here.',
      '5 Our house is very big.',
      '6 Their names are Terry and Chloe.',
      '7 His name is Jim.'
    ],
    [
      'How are you today?',
      'Where is Hannah from?',
      'How old is your sister?',
      'What is your name?',
      'When is your birthday?',
      'Who is your teacher?'
    ],
    [
      'twelve → D 12',
      'eighteen → F 18',
      'fifteen → A 15',
      'twenty → B 20',
      'eighty → G 80',
      'thirty-two → E 32',
      'twenty-three → C 23'
    ],
    [
      '1 sad (new/old are opposites)',
      '2 easy (hot/cold are temperature)',
      '3 small (happy/sad are feelings)',
      '4 big (good/bad are evaluation)',
      '5 hot (easy/difficult are difficulty)',
      '6 new (big/small are size)'
    ],
    [
      'mother and father',
      'son and daughter',
      'boy and girl',
      'husband and wife',
      'brother and sister',
      'parents and children',
      'man and woman'
    ],
    [
      'How are your children?',
      "They're good.",
      'Are you OK?',
      "I'm tired.",
      "How's your new cat?",
      "It's great!",
      'How are your classes?',
      "They're great!",
      'Thanks for the coffee.',
      'No problem.'
    ],
    [
      'Sam is Spanish. — False',
      'Victoria is in New York. — True',
      'Gary is a nurse. — False',
      'Jennifer is in China. — False',
      'Ben is British. — False'
    ],
    [
      'Sam — B. is in Spain',
      'Victoria — D. is Colombian',
      'Gary — A. is 52 years old',
      'Jennifer — E. is 17 years old',
      'Ben — C. is in London'
    ],
    [
      'We → Our teacher',
      'father → and (mother and father)',
      'What old → How old',
      'to → and (Jim and Jade)',
      "Who's → When's (our class)"
    ],
    ['Sam\'s brother\'s name is Ben.'],
    ['Sam\'s mother is 51 / fifty-one.']
  );

  var correctAnswersShort = [].concat(
    ['My', 'My', 'Her', 'Her', 'Our', 'Their', 'His'],
    ['How', 'Where', 'How old', 'What', 'When', 'Who'],
    ['D', 'F', 'A', 'B', 'G', 'E', 'C'],
    ['sad', 'easy', 'small', 'big', 'hot', 'new'],
    ['father', 'daughter', 'girl', 'husband', 'brother', 'children', 'woman'],
    [
      'How are your children?', "They're good.", 'Are you OK?', "I'm tired.",
      "How's your new cat?", "It's great!", 'How are your classes?', "They're great!",
      'Thanks for the coffee.', 'No problem.'
    ],
    ['F', 'T', 'F', 'F', 'F'],
    ['B', 'D', 'A', 'E', 'C'],
    ['Ben'],
    ['51']
    ['Our', 'and', 'How old', 'and', "When's"],
  );

  var sectionThemes = [
    '1. Притяжательные местоимения',
    '2. Вопросительные слова',
    '3. Счёт до 100',
    '4. Прилагательные',
    '5. Лексика: родственники',
    '6. Порядок слов в предложении',
    '7. Reading comprehension',
    '8. Reading comprehension',
    '9. Reading comprehension',
    '10. Reading comprehension',
    '11. Общая языковая эрудиция',
  ];

  const toastEl = document.getElementById('result-toast');
  const checkBtn = document.getElementById('check-btn');
  const nameInput = document.getElementById('user-name');
  const confirmModal = document.getElementById('confirm-modal');
  const confirmSubmitBtn = document.getElementById('confirm-submit-btn');
  const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
  const scoreDisplay = document.getElementById('score-display');

  var questionNames = [
    'g2-1', 'g2-2', 'g2-3', 'g2-4', 'g2-5', 'g2-6', 'g2-7',
    'g3-1', 'g3-2', 'g3-3', 'g3-4', 'g3-5', 'g3-6',
    'match4-1', 'match4-2', 'match4-3', 'match4-4', 'match4-5', 'match4-6', 'match4-7',
    'v5-1', 'v5-2', 'v5-3', 'v5-4', 'v5-5', 'v5-6',
    'v6-1', 'v6-2', 'v6-3', 'v6-4', 'v6-5', 'v6-6', 'v6-7',
    'w7-1a', 'w7-1b', 'w7-2a', 'w7-2b', 'w7-3a', 'w7-3b', 'w7-4a', 'w7-4b', 'w7-5a', 'w7-5b',
    'tf-1', 'tf-2', 'tf-3', 'tf-4', 'tf-5',
    'matchR-1', 'matchR-2', 'matchR-3', 'matchR-4', 'matchR-5',
    'rc-1', 'rc-2', 'rc-3', 'rc-4', 'rc-5',
    'rs6-1', 'rs7-1'
  ];

  var STORAGE_KEY = 'u2a-form';
  var saveFormTimeout = null;
  var SAVE_DELAY_MS = 400;

  function getFieldValue(name) {
    if (name.indexOf('tf-') === 0) {
      var checked = document.querySelector('input[name="' + name + '"]:checked');
      return checked ? checked.value : '';
    }
    var el = document.querySelector('.test-section [name="' + name + '"]');
    return el ? el.value : '';
  }

  function setFieldValue(name, value) {
    if (name === 'user-name') {
      if (nameInput) nameInput.value = value || '';
      return;
    }
    if (name.indexOf('tf-') === 0) {
      document.querySelectorAll('input[name="' + name + '"]').forEach(function (r) {
        r.checked = r.value === value;
      });
      return;
    }
    var el = document.querySelector('.test-section [name="' + name + '"]');
    if (el) el.value = value || '';
  }

  function saveFormToStorage() {
    try {
      var data = { 'user-name': nameInput ? nameInput.value : '' };
      questionNames.forEach(function (name) {
        data[name] = getFieldValue(name);
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Не удалось сохранить форму', e);
    }
  }

  function loadFormFromStorage() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (data['user-name'] !== undefined) setFieldValue('user-name', data['user-name']);
      questionNames.forEach(function (name) {
        if (data[name] !== undefined && data[name] !== '') setFieldValue(name, data[name]);
      });
    } catch (e) {
      console.warn('Не удалось загрузить форму', e);
    }
  }

  function scheduleSaveForm() {
    if (saveFormTimeout) clearTimeout(saveFormTimeout);
    saveFormTimeout = setTimeout(function () {
      saveFormTimeout = null;
      saveFormToStorage();
    }, SAVE_DELAY_MS);
  }

  function clearFormAndStorage() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setFieldValue('user-name', '');
    questionNames.forEach(function (name) {
      setFieldValue(name, '');
    });
    clearFeedback();
    if (scoreDisplay) {
      scoreDisplay.classList.add('hidden');
      scoreDisplay.textContent = '';
    }
    showToast('Форма очищена', 'info');
  }

  function isAllFilled() {
    for (var i = 0; i < questionNames.length; i++) {
      var v = getFieldValue(questionNames[i]);
      if (normalizeText(String(v)) === '') return false;
    }
    return true;
  }

  function hasName() {
    return nameInput && normalizeText(nameInput.value) !== '';
  }

  function showModal() {
    if (confirmModal) confirmModal.classList.remove('hidden');
  }

  function hideModal() {
    if (confirmModal) confirmModal.classList.add('hidden');
  }

  function showToast(message, type) {
    toastEl.textContent = message;
    toastEl.className = 'toast ' + (type || 'info');
    toastEl.classList.remove('hidden');
    setTimeout(function () {
      toastEl.classList.add('hidden');
    }, 5000);
  }

  function normalizeText(s) {
    return (s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function clearFeedback() {
    document.querySelectorAll('.test-section input, .test-section select').forEach(function (el) {
      el.classList.remove('correct', 'incorrect');
    });
    document.querySelectorAll('.tf-list li').forEach(function (li) {
      li.classList.remove('correct', 'incorrect');
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function sendMessageToTelegram(token, chatId, message, parseMode) {
    var url = 'https://api.telegram.org/bot' + token + '/sendMessage';
    var data = {
      chat_id: chatId,
      text: message
    };
    if (parseMode) data.parse_mode = parseMode;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) { return response.json(); })
      .then(function (result) { console.log('Сообщение отправлено:', result); })
      .catch(function (error) { console.error('Ошибка при отправке сообщения:', error); });
  }

  function answersMatch(userVal, correctVal, isTextInput) {
    if (isTextInput) {
      var u = normalizeText(userVal);
      var c = normalizeText(correctVal);
      if (u === c) return true;
      if (c === "when's" && (u === "when's" || u === "when is")) return true;
      if (c === "how old" && u === "how old") return true;
      return false;
    }
    return (userVal || '') === (correctVal || '');
  }

  function checkGrammar2() {
    var score = 0;
    for (var i = 0; i < 7; i++) {
      var select = document.querySelector('select[name="g2-' + (i + 1) + '"]');
      var value = select ? select.value : '';
      var correct = value === ANSWERS.grammar2[i];
      if (correct) score++;
      if (select) select.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkGrammar3() {
    var score = 0;
    for (var i = 0; i < 6; i++) {
      var input = document.querySelector('input[name="g3-' + (i + 1) + '"]');
      var value = normalizeText(input ? input.value : '');
      var expected = normalizeText(ANSWERS.grammar3[i]);
      var correct = value === expected;
      if (correct) score++;
      if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkVocab4() {
    var score = 0;
    for (var i = 0; i < 7; i++) {
      var select = document.querySelector('select[name="match4-' + (i + 1) + '"]');
      var value = select ? select.value : '';
      var correct = value === ANSWERS.vocab4[i];
      if (correct) score++;
      if (select) select.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkVocab5() {
    var score = 0;
    for (var i = 0; i < 6; i++) {
      var input = document.querySelector('input[name="v5-' + (i + 1) + '"]');
      var value = normalizeText(input ? input.value : '');
      var expected = normalizeText(ANSWERS.vocab5[i]);
      var correct = value === expected;
      if (correct) score++;
      if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkVocab6() {
    var score = 0;
    for (var i = 0; i < 7; i++) {
      var input = document.querySelector('input[name="v6-' + (i + 1) + '"]');
      var value = normalizeText(input ? input.value : '');
      var expected = normalizeText(ANSWERS.vocab6[i]);
      var correct = value === expected;
      if (correct) score++;
      if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkHowto7() {
    var score = 0;
    for (var i = 0; i < 10; i++) {
      var names = ['w7-1a', 'w7-1b', 'w7-2a', 'w7-2b', 'w7-3a', 'w7-3b', 'w7-4a', 'w7-4b', 'w7-5a', 'w7-5b'];
      var input = document.querySelector('input[name="' + names[i] + '"]');
      var value = normalizeText(input ? input.value : '');
      var expected = normalizeText(ANSWERS.howto7[i]);
      var correct = value === expected;
      if (correct) score++;
      if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkReadingTf() {
    var score = 0;
    for (var i = 0; i < 5; i++) {
      var name = 'tf-' + (i + 1);
      var checked = document.querySelector('input[name="' + name + '"]:checked');
      var value = checked ? checked.value : '';
      var correct = value === ANSWERS.readingTf[i];
      if (correct) score++;
      var li = document.querySelector('.tf-list li:nth-child(' + (i + 1) + ')');
      if (li) li.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkReadingMatch() {
    var score = 0;
    for (var i = 0; i < 5; i++) {
      var select = document.querySelector('select[name="matchR-' + (i + 1) + '"]');
      var value = select ? select.value : '';
      var correct = value === ANSWERS.readingMatch[i];
      if (correct) score++;
      if (select) select.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkReadingCorrect() {
    var score = 0;
    var alternatives = [
      ['our'],
      ['and'],
      ['how old'],
      ['and'],
      ["when's", 'when is']
    ];
    for (var i = 0; i < 5; i++) {
      var input = document.querySelector('input[name="rc-' + (i + 1) + '"]');
      var value = normalizeText(input ? input.value : '');
      var opts = alternatives[i];
      var correct = opts.some(function (opt) { return value === opt; });
      if (correct) score++;
      if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkReadingShort6() {
    var input = document.querySelector('input[name="rs6-1"]');
    var value = normalizeText(input ? input.value : '');
    var correct = value === 'ben';
    if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    return correct ? 1 : 0;
  }

  function checkReadingShort7() {
    var input = document.querySelector('input[name="rs7-1"]');
    var value = normalizeText(input ? input.value : '');
    var correct = value === '51' || value === 'fifty-one';
    if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    return correct ? 1 : 0;
  }

  function collectErrors() {
    var errors = [];
    var idx = 0;
    var sections = [
      { names: ['g2-1', 'g2-2', 'g2-3', 'g2-4', 'g2-5', 'g2-6', 'g2-7'], text: false, theme: sectionThemes[0] },
      { names: ['g3-1', 'g3-2', 'g3-3', 'g3-4', 'g3-5', 'g3-6'], text: true, theme: sectionThemes[1] },
      { names: ['match4-1', 'match4-2', 'match4-3', 'match4-4', 'match4-5', 'match4-6', 'match4-7'], text: false, theme: sectionThemes[2] },
      { names: ['v5-1', 'v5-2', 'v5-3', 'v5-4', 'v5-5', 'v5-6'], text: true, theme: sectionThemes[3] },
      { names: ['v6-1', 'v6-2', 'v6-3', 'v6-4', 'v6-5', 'v6-6', 'v6-7'], text: true, theme: sectionThemes[4] },
      { names: ['w7-1a', 'w7-1b', 'w7-2a', 'w7-2b', 'w7-3a', 'w7-3b', 'w7-4a', 'w7-4b', 'w7-5a', 'w7-5b'], text: true, theme: sectionThemes[5] },
      { names: ['tf-1', 'tf-2', 'tf-3', 'tf-4', 'tf-5'], text: false, theme: sectionThemes[6] },
      { names: ['matchR-1', 'matchR-2', 'matchR-3', 'matchR-4', 'matchR-5'], text: false, theme: sectionThemes[7] },
      { names: ['rc-1', 'rc-2', 'rc-3', 'rc-4', 'rc-5'], text: true, theme: sectionThemes[8] },
      { names: ['rs6-1'], text: true, alternatives: [['ben']], theme: sectionThemes[9] },
      { names: ['rs7-1'], text: true, alternatives: [['51', 'fifty-one']], theme: sectionThemes[10] }
    ];
    for (var s = 0; s < sections.length; s++) {
      var section = sections[s];
      for (var i = 0; i < section.names.length; i++) {
        var name = section.names[i];
        var userVal = getFieldValue(name);
        var correctVal = correctAnswersFlat[idx];
        var correctDisplay = correctAnswersDisplay[idx];
        var correctShort = correctAnswersShort[idx];
        var isText = section.text;
        var correct = false;
        if (name.indexOf('rc-') === 0) {
          var alternatives = [
            ['our'], ['and'], ['how old'], ['and'], ["when's", 'when is']
          ];
          var rcIdx = parseInt(name.replace('rc-', ''), 10) - 1;
          correct = alternatives[rcIdx].indexOf(normalizeText(userVal)) !== -1;
        } else if (section.alternatives) {
          var altIdx = section.names.indexOf(name);
          var opts = section.alternatives[altIdx];
          correct = opts && opts.some(function (opt) { return normalizeText(userVal) === normalizeText(opt); });
        } else {
          correct = answersMatch(userVal, correctVal, isText);
        }
        if (!correct) {
          errors.push({
            num: idx + 1,
            user: normalizeText(String(userVal)) === '' ? '(пусто)' : userVal,
            correct: correctDisplay,
            correctShort: correctShort,
            theme: section.theme
          });
        }
        idx++;
      }
    }
    return errors;
  }

  function doCheck() {
    clearFeedback();

    var s1 = checkGrammar2();
    var s2 = checkGrammar3();
    var s3 = checkVocab4();
    var s4 = checkVocab5();
    var s5 = checkVocab6();
    var s6 = checkHowto7();
    var s7 = checkReadingTf();
    var s8 = checkReadingMatch();
    var s9 = checkReadingCorrect();
    var s10 = checkReadingShort6();
    var s11 = checkReadingShort7();

    var total = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9 + s10 + s11;
    var pct = Math.round((total / MAX_SCORE) * 100);
    var errors = collectErrors();

    var sectionScores = [
      { section: 'grammar-2', score: s1, max: 7 },
      { section: 'grammar-3', score: s2, max: 6 },
      { section: 'vocab-4', score: s3, max: 7 },
      { section: 'vocab-5', score: s4, max: 6 },
      { section: 'vocab-6', score: s5, max: 7 },
      { section: 'howto-7', score: s6, max: 10 },
      { section: 'reading-tf', score: s7, max: 5 },
      { section: 'reading-match', score: s8, max: 5 },
      { section: 'reading-correct', score: s9, max: 5 },
      { section: 'reading-short-6', score: s10, max: 1 },
      { section: 'reading-short-7', score: s11, max: 1 }
    ];
    sectionScores.forEach(function (item) {
      var badge = document.querySelector('.test-section[data-section="' + item.section + '"] .score-badge');
      if (badge) badge.textContent = item.score + '/' + item.max;
    });

    if (scoreDisplay) {
      scoreDisplay.textContent = 'Общие баллы: ' + MAX_SCORE + '. Фактически набранных: ' + total + ' из ' + MAX_SCORE + ' баллов (' + pct + '%).';
      scoreDisplay.classList.remove('hidden');
    }

    var msg = 'Результат: ' + total + ' из ' + MAX_SCORE + ' баллов (' + pct + '%). ';
    if (total >= MAX_SCORE-2) {
      msg += 'Отлично!';
      showToast(msg, 'success');
    } else if (pct >= 70) {
      msg += 'Хороший результат.';
      showToast(msg, 'success');
    } else {
      msg += 'Проверьте себя ещё разок';
      showToast(msg, 'info');
    }

    var userName = nameInput ? nameInput.value.trim() : '';
    var resultLabel = total === MAX_SCORE ? 'Отлично!' : (pct >= 70 ? 'Хороший результат.' : 'Проверьте ошибки.');

    function padRight(str, len) {
      var s = String(str);
      return s.length >= len ? s.slice(0, len) : s + (new Array(len - s.length + 1).join(' '));
    }

    var telegramMsg = '<b>Результат теста Unit 2A</b>\n\n';
    telegramMsg += '<pre>';
    telegramMsg += '┌────────────┬──────────────────────┐\n';
    telegramMsg += '│ Имя        │ ' + padRight(escapeHtml(userName), 20) + '│\n';
    telegramMsg += '├────────────┼──────────────────────┤\n';
    telegramMsg += '│ Баллы      │ ' + padRight(total + ' / ' + MAX_SCORE + ' (' + pct + '%)', 20) + '│\n';
    telegramMsg += '│ Результат  │ ' + padRight(escapeHtml(resultLabel), 20) + '│\n';
    telegramMsg += '└────────────┴──────────────────────┘';
    telegramMsg += '</pre>';

    if (errors.length > 0) {
      var numCol = 3;
      var userCol = 14;
      var correctCol = 24;
      var sep = ' │ ';
      var headerNum = padRight('№', numCol);
      var headerUser = padRight('Ваш ответ', userCol);
      var headerCorrect = padRight('Правильно', correctCol);
      var byTheme = {};
      errors.forEach(function (e) {
        if (!byTheme[e.theme]) byTheme[e.theme] = [];
        byTheme[e.theme].push(e);
      });
      telegramMsg += '\n\n<b>Ошибки по темам</b>\n';
      var themeOrder = sectionThemes.filter(function (t) { return byTheme[t]; });
      themeOrder.forEach(function (theme) {
        var list = byTheme[theme];
        var useLongCorrect = theme === '6. Порядок слов в предложении' || theme === '7. Reading comprehension' || theme === '8. Reading comprehension';
        var colCorrect = useLongCorrect ? 45 : correctCol;
        var headerCorrectCur = padRight('Правильно', colCorrect);
        telegramMsg += '\n<b>' + escapeHtml(theme) + '</b>\n<pre>';
        telegramMsg += '┌─────┬─────────────────┬' + (new Array(colCorrect + 1).join('─')) + '┐\n';
        telegramMsg += '│' + sep + headerNum + sep + headerUser + sep + headerCorrectCur + ' │\n';
        telegramMsg += '├─────┼─────────────────┼' + (new Array(colCorrect + 1).join('─')) + '┤\n';
        list.forEach(function (e) {
          var num = padRight(e.num, numCol);
          var user = padRight(escapeHtml(e.user).slice(0, userCol), userCol);
          var correctText = useLongCorrect ? e.correct : (e.correctShort || e.correct);
          var correct = escapeHtml(String(correctText));
          if (correct.length > colCorrect) correct = correct.slice(0, colCorrect - 2) + '..';
          correct = padRight(correct, colCorrect);
          telegramMsg += '│' + sep + num + sep + user + sep + correct + ' │\n';
        });
        telegramMsg += '└─────┴─────────────────┴' + (new Array(colCorrect + 1).join('─')) + '┘';
        telegramMsg += '</pre>\n';
      });
    }

    var botToken = '8543757949:AAHkb7EeGKgHpNsH7DJN0sc3jgoM-3U4Ibg';
    var chatId = '385632170';
    sendMessageToTelegram(botToken, chatId, telegramMsg, 'HTML');
  }

  if (checkBtn) {
    checkBtn.addEventListener('click', function () {
      if (!hasName()) {
        showToast('Введите имя', 'info');
        if (nameInput) nameInput.focus();
        return;
      }
      if (!isAllFilled()) {
        showModal();
      } else {
        doCheck();
      }
    });
  }

  if (confirmSubmitBtn) {
    confirmSubmitBtn.addEventListener('click', function () {
      hideModal();
      if (!hasName()) {
        showToast('Введите имя', 'info');
        if (nameInput) nameInput.focus();
        return;
      }
      doCheck();
    });
  }
  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener('click', hideModal);
  }
  if (confirmModal) {
    var backdrop = confirmModal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', hideModal);
  }

  loadFormFromStorage();

  var container = document.querySelector('.container');
  if (container) {
    container.addEventListener('input', function (e) {
      if (e.target && (e.target.name === 'user-name' || questionNames.indexOf(e.target.name) !== -1)) scheduleSaveForm();
    });
    container.addEventListener('change', function (e) {
      if (e.target && (e.target.name === 'user-name' || questionNames.indexOf(e.target.name) !== -1)) scheduleSaveForm();
    });
  }

  var clearFormBtn = document.getElementById('clear-form-btn');
  if (clearFormBtn) clearFormBtn.addEventListener('click', clearFormAndStorage);
})();
