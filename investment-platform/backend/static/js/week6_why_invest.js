// NBA 遊戲相關的 JavaScript 功能
let gameState = {
  cardSelected: false,
  teamScored: false
};

// 卡牌選擇功能
function selectCard(cardIndex) {
  if (gameState.cardSelected) return;
  
  gameState.cardSelected = true;
  
  // 禁用所有卡牌點擊
  document.querySelectorAll('.strategy-card').forEach(card => {
    card.classList.add('disabled');
  });
  
  // 定義三種可能的結果
  const results = [
    {
      icon: '🏆',
      result: 'BANG!! 壓哨絕殺！',
      subtext: '你是世界冠軍！',
      performance: '+50%',
      class: 'winner'
    },
    {
      icon: '❌',
      result: '天啊！球被抄截了！',
      subtext: '你輸了這場比賽...',
      performance: '-40%',
      class: 'loser'
    },
    {
      icon: '😑',
      result: '球彈框而出...',
      subtext: '進入延長賽。',
      performance: '+5%',
      class: 'neutral'
    }
  ];
  
  // 隨機打亂結果分配給三張卡片
  const shuffledResults = [...results].sort(() => Math.random() - 0.5);
  
  // 依序翻開所有卡片
  shuffledResults.forEach((result, index) => {
    setTimeout(() => {
      flipCard(index, result, index === cardIndex);
    }, index * 300);
  });
  
  // 顯示選中卡片的結果
  const selectedResult = shuffledResults[cardIndex];
  setTimeout(() => {
    showCardResult(selectedResult);
  }, 1200);
}

function flipCard(cardIndex, result, isSelected) {
  const card = document.getElementById(`card${cardIndex}`);
  const cardBack = card.querySelector('.card-back');
  const cardFront = card.querySelector('.card-front');
  
  // 設定正面內容
  cardFront.innerHTML = `
    <div class="card-icon">${result.icon}</div>
    <div class="card-result">${result.result}</div>
    <div class="card-performance">${result.performance}</div>
  `;
  
  // 設定樣式
  cardFront.className = `card-front ${result.class}`;
  
  // 如果是選中的卡片，添加特殊邊框
  if (isSelected) {
    card.style.border = '4px solid #ff6b35';
    card.style.boxShadow = '0 0 20px rgba(255, 107, 53, 0.5)';
  }
  
  // 翻牌動畫
  cardBack.style.display = 'none';
  cardFront.classList.remove('hidden');
  cardFront.style.display = 'flex';
}

function showCardResult(result) {
  const resultBox = document.getElementById('superstarResult');
  resultBox.innerHTML = `
    <div class="superstar-result-content">
      <span class="superstar-result-icon">${result.icon}</span>
      <div class="superstar-result-title">${result.result}</div>
      <div class="superstar-result-subtitle">${result.subtext}</div>
      <div class="superstar-result-performance">資產評價：${result.performance}</div>
    </div>
  `;
  
  resultBox.className = `superstar-result show result-${result.class === 'winner' ? 'positive' : result.class === 'loser' ? 'negative' : 'neutral'}`;
  resultBox.classList.remove('hidden');
  resultBox.style.display = 'block';
  
  // 延遲顯示彈窗
  setTimeout(() => {
    showGamePopup();
  }, 2000);
}

// 團隊計分功能
function startTeamScoring() {
  if (gameState.teamScored) return;
  
  gameState.teamScored = true;
  
  // 禁用按鈕
  const btn = document.getElementById('team-btn');
  btn.disabled = true;
  btn.textContent = '計分中...';
  
  // 顯示計分板
  const scoringSection = document.getElementById('teamScoringSection');
  scoringSection.classList.remove('hidden');
  scoringSection.style.display = 'block';
  
  // 隱藏所有球員得分和總分
  const teamTotal = document.getElementById('teamTotal');
  teamTotal.classList.add('hidden');
  teamTotal.style.display = 'none';
  
  // 模擬每個球員的得分
  const players = ['score1', 'score2', 'score3', 'score4', 'score5'];
  const scoreData = [
    { text: '助攻失誤... (-3%)', isNegative: true },
    { text: '投進三分！ (+8%)', isNegative: false },
    { text: '被犯規，罰球得分 (+5%)', isNegative: false },
    { text: '籃板被搶... (-2%)', isNegative: true },
    { text: '補籃得分！ (+7%)', isNegative: false }
  ];
  
  players.forEach((playerId, index) => {
    const scoreElement = document.getElementById(playerId);
    // 重置狀態
    scoreElement.textContent = '計分中...';
    scoreElement.classList.remove('positive', 'negative');
    
    setTimeout(() => {
      scoreElement.textContent = scoreData[index].text;
      
      // 添加顏色類別
      if (scoreData[index].isNegative) {
        scoreElement.classList.add('negative');
      } else {
        scoreElement.classList.add('positive');
      }
      
      // 最後一個球員計分完成後顯示總分
      if (index === players.length - 1) {
        setTimeout(() => {
          teamTotal.classList.remove('hidden');
          teamTotal.style.display = 'block';
          setTimeout(() => {
            showGamePopup();
          }, 1000);
        }, 500);
      }
    }, (index + 1) * 800);
  });
}

// 顯示遊戲總結彈窗
function showGamePopup() {
  const popup = document.getElementById('nbaPopup');
  popup.classList.remove('hidden');
  popup.classList.add('show');
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// 關閉遊戲總結彈窗
function closeNbaPopup() {
  const popup = document.getElementById('nbaPopup');
  popup.classList.add('hidden');
  popup.classList.remove('show');
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// AI 助手功能
function toggleAIChat() {
  const aiChat = document.getElementById('aiChat');
  if (aiChat.style.display === 'none' || aiChat.style.display === '') {
    aiChat.style.display = 'flex';
  } else {
    aiChat.style.display = 'none';
  }
}

function askPresetQuestion(question) {
  const messages = document.getElementById('aiMessages');
  
  // 添加用戶問題
  const userMessage = document.createElement('div');
  userMessage.className = 'ai-message';
  userMessage.innerHTML = `
    <span class="ai-icon">👤</span>
    <div class="message-content user-message-style">
      ${question}
    </div>
  `;
  messages.appendChild(userMessage);
  
  // 準備回答
  const answers = {
    '什麼是 ETF？為什麼要投資 ETF？': `ETF（Exchange Traded Fund）是交易所交易基金，具有以下優勢：

**什麼是 ETF？**
• 一籃子股票或債券的組合
• 在證券交易所買賣，像股票一樣簡單
• 追蹤特定指數的表現

**為什麼要投資 ETF？**
• **分散風險**：一次投資多家公司
• **成本低廉**：管理費用遠低於傳統基金
• **透明度高**：定期公告持股內容
• **流動性佳**：隨時可買賣
• **門檻較低**：幾千元就能開始投資`,

    'ETF 和股票基金有什麼不同？' : `ETF 和股票基金的主要差異：

**ETF（交易所交易基金）**
• 在證券交易所交易，價格即時變動
• 管理費用較低（通常0.1%-0.7%）
• 被動追蹤指數，不主動選股
• 透明度高，持股內容公開

**股票基金（共同基金）**
• 透過基金公司申購贖回
• 管理費用較高（通常1%-3%）
• 主動管理，基金經理人選股
• 持股內容較不透明

**建議：** 新手投資人可以從ETF開始，因為成本低、風險分散且容易理解。`,

    '如何選擇適合自己的 ETF？' : `選擇 ETF 的重要考量因素：

**1. 投資目標**
• 追求成長：選股票型ETF（如0050）
• 追求穩定收入：選債券型或高股息ETF（如0056）

**2. 風險承受度**
• 保守型：債券ETF、大型股ETF
• 積極型：科技股ETF、新興市場ETF

**3. 成本考量**
• 管理費用率（越低越好）
• 交易成本和稅務影響

**4. 規模和流動性**
• 選擇規模較大的ETF
• 確保每日交易量充足

**新手建議：** 從台灣50（0050）或高股息（0056）開始，逐步學習。`,

    'ETF 投資有哪些風險？' : `ETF 投資的主要風險：

**1. 市場風險**
• 跟隨大盤漲跌，無法完全避免市場波動
• 經濟衰退時，股票型ETF會下跌

**2. 追蹤誤差風險**
• ETF表現可能與追蹤指數略有差異
• 管理費用會影響報酬率

**3. 流動性風險**
• 規模較小的ETF可能交易量不足
• 市場恐慌時可能出現折溢價

**4. 匯率風險**
• 投資海外ETF會面臨匯率波動
• 新台幣升值會影響海外投資報酬

**風險管理建議：**
• 分散投資不同類型ETF
• 定期定額降低進場成本
• 長期持有減少短期波動影響`,

    '0050 和 0056 有什麼差別？' : `0050 vs 0056 詳細比較：

**元大台灣50（0050）**
• **追蹤指數**：台灣50指數
• **組成**：台灣市值前50大公司
• **特色**：代表台灣整體經濟表現
• **股息**：年配息約2-4%
• **適合**：追求資本增值的投資人

**元大高股息（0056）**
• **追蹤指數**：台灣高股息指數
• **組成**：預期股息殖利率較高的公司
• **特色**：提供相對穩定的現金流
• **股息**：年配息約4-6%
• **適合**：追求穩定配息的投資人

**選擇建議：**
• 年輕人：可考慮0050，追求長期成長
• 退休族群：可考慮0056，重視現金流
• 也可兩者都配置，平衡成長與收益`
  };
  
  // 添加AI回答
  setTimeout(() => {
    const aiResponse = document.createElement('div');
    aiResponse.className = 'ai-message';
    aiResponse.innerHTML = `
      <span class="ai-icon">🤖</span>
      <div class="message-content typing-animation">
        ${answers[question] || '抱歉，我還在學習這個問題的答案。請嘗試其他問題。'}
      </div>
    `;
    messages.appendChild(aiResponse);
    
    // 滾動到最新消息
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
  
  // 滾動到最新消息
  messages.scrollTop = messages.scrollHeight;
}

// NBA 遊戲 - 戰術卡選擇
let tacticalGameState = {
  cardSelected: false
};

function selectTacticalCard(cardIndex) {
  if (tacticalGameState.cardSelected) return;
  
  tacticalGameState.cardSelected = true;
  
  // 立即禁用所有卡片，防止重複點擊
  const allCards = document.querySelectorAll('.tactical-card');
  allCards.forEach(card => {
    card.style.pointerEvents = 'none';
    card.style.opacity = '0.5';
    card.style.cursor = 'not-allowed';
  });
  
  // 隨機結果（每次都重新隨機排序）
  const results = [
    { icon: '🏆', text: '絕殺成功', percentage: '+50%', type: 'success', colorClass: 'positive' },
    { icon: '❌', text: '失誤', percentage: '-40%', type: 'failure', colorClass: 'negative' },
    { icon: '😐', text: '平淡表現', percentage: '+5%', type: 'neutral', colorClass: 'neutral' }
  ];
  
  // 使用時間戳和隨機數確保每次都不同
  const shuffled = [...results].sort(() => Math.random() - 0.5);
  
  // 翻開所有卡片
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const card = document.getElementById(`tactical-card-${i}`);
      const result = shuffled[i];
      
      // 如果是被選中的卡片，恢復透明度
      if (i === cardIndex) {
        card.style.opacity = '1';
      } else {
        // 未被選中的卡片保持低透明度
        card.style.opacity = '0.4';
      }
      
      card.classList.add('flipped', result.colorClass);
      card.innerHTML = `
        <div class="card-icon">${result.icon}</div>
        <div class="card-label">${result.text}</div>
      `;
      
      if (i === cardIndex) {
        card.style.borderColor = '#2196F3';
        card.style.boxShadow = '0 0 15px rgba(33, 150, 243, 0.4)';
        
        // 顯示結果卡片
        setTimeout(() => {
          const resultHtml = `
            <div class="result-card ${result.type}">
              <div class="result-icon">${result.icon}</div>
              <div class="result-title">${result.text}</div>
              <div class="result-percentage">${result.percentage}</div>
            </div>
          `;
          document.getElementById('superstarResult').innerHTML = resultHtml;
          document.getElementById('superstarResult').classList.remove('hidden');
        }, 500);
      }
    }, i * 400);
  }
}

// 啟動團隊遊戲
function startDreamTeamGame() {
  const btn = document.getElementById('start-dreamteam-game');
  const scoringSection = document.getElementById('teamScoringSection');
  
  btn.style.display = 'none';
  scoringSection.classList.remove('hidden');
  scoringSection.style.display = 'block';
  
  // 模擬計分
  const players = ['score1', 'score2', 'score3', 'score4', 'score5'];
  const scoreData = [
    { text: '助攻失誤... (-3%)', isNegative: true },
    { text: '投進三分！ (+8%)', isNegative: false },
    { text: '被犯規，罰球得分 (+5%)', isNegative: false },
    { text: '籃板被搶... (-2%)', isNegative: true },
    { text: '補籃得分！ (+7%)', isNegative: false }
  ];
  
  players.forEach((playerId, index) => {
    setTimeout(() => {
      const scoreElement = document.getElementById(playerId);
      scoreElement.textContent = scoreData[index].text;
      scoreElement.classList.remove('positive', 'negative');
      scoreElement.classList.add(scoreData[index].isNegative ? 'negative' : 'positive');
      
      if (index === players.length - 1) {
        setTimeout(() => {
          const totalHtml = `
            <div class="team-result-summary">
              <div class="description">雖然有失誤，但靠著團隊合作，穩穩拿下勝利！</div>
              <div class="total-score">+15%</div>
              <div class="text-center mt-3">
                <button class="simple-button blue" onclick="showGameConclusion()">
                  📊 查看遊戲總結
                </button>
              </div>
            </div>
          `;
          document.getElementById('teamTotal').innerHTML = totalHtml;
          document.getElementById('teamTotal').classList.remove('hidden');
          document.getElementById('teamTotal').style.display = 'block';
        }, 500);
      }
    }, (index + 1) * 800);
  });
}

// 新增：顯示遊戲總結區塊
function showGameConclusion() {
  const conclusionBlock = document.getElementById('game-result-conclusion');
  if (conclusionBlock) {
    conclusionBlock.style.display = 'block';
    
    // 平滑滾動到總結區塊
    setTimeout(() => {
      conclusionBlock.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  }
}

// 手機拍賣遊戲變数
let phoneStoryState = {
  currentStep: 0,
  storyActive: false
};

// 劇情步驟數據
const phoneStorySteps = [
  {
    content: `
      <div class="story-year">年份：2023 年 (低利率時代)</div>
      <p>市場上推出了一款「債券手機 B-1」，售價 <strong>$10,000</strong>，承諾「每年固定給你 <strong class="highlight-interest-rate">$200 利息 (2%)</strong>」。</p>
      <p>你覺得很划算，就買了。📱✨</p>
    `,
    btnText: "👇 繼續下一年..."
  },
  {
    content: `
      <div class="story-year">年份：2024 年 (央行升息啦！)</div>
      <p>手機公司推出了新款「債券手機 B-2」，功能更強！售價同樣是 <strong>$10,000</strong>，但承諾「每年固定給你 <strong class="highlight-high-rate">$500 利息 (5%)</strong>」！</p>
      <div class="story-highlight">
        📈 市場利率從 2% 暴漲到 5%！
      </div>
    `,
    btnText: "👇 你決定賣掉舊的 B-1..."
  },
  {
    content: `
      <p>你帶著你的「舊 B-1」(年領 $200) 來到二手拍賣會，想賣 <strong>$10,000</strong>。</p>
      <p style="text-align: center; font-size: 2rem; margin: 20px 0;">🏪💰</p>
      <p>一位買家 🧔 走了過來...</p>
    `,
    btnText: "👇 詢問買家報價"
  },
  {
    content: `
      <div class="buyer-speech">
        <p><strong>買家 🧔 說：</strong></p>
        <p>「你開什麼玩笑？我花 $10,000 就能買到年領 $500 (5%) 的新款 B-2，我為什麼要花 $10,000 買你這支年領 $200 (2%) 的舊 B-1？」</p>
        <br>
        <p>「我最多只願意出 <strong class="highlight-high-rate">$9,400</strong> 買你這支舊手機！(因為這樣我才不虧)」</p>
      </div>
      <div class="story-highlight" style="background: #ffebee; border-left-color: #f44336; color: #c62828;">
        💸 你的手機瞬間貶值了 $600！
      </div>
    `,
    btnText: "👇 查看分析結果",
    isLastStep: true
  }
];

function nextStoryStep() {
  if (phoneStoryState.currentStep >= phoneStorySteps.length) return;
  
  const btn = document.getElementById('start-game-btn');
  const storyDisplay = document.getElementById('storyDisplay');
  
  btn.disabled = true;
  btn.textContent = '劇情進展中...';
  
  setTimeout(() => {
    const currentStep = phoneStorySteps[phoneStoryState.currentStep];
    storyDisplay.innerHTML = `<div class="story-content">${currentStep.content}</div>`;
    
    storyDisplay.style.animation = 'slideInFromRight 0.5s ease-out';
    
    phoneStoryState.currentStep++;
    
    btn.disabled = false;
    btn.textContent = currentStep.btnText;
    
    if (currentStep.isLastStep) {
      btn.onclick = showConclusionBlock;
      btn.id = 'show-result-btn';
    }
  }, 800);
}

function showConclusionBlock() {
  const conclusionBlock = document.getElementById('conclusion-block');
  const gameBtn = document.getElementById('show-result-btn');
  
  gameBtn.style.display = 'none';
  
  conclusionBlock.style.display = 'block';
  
  setTimeout(() => {
    conclusionBlock.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }, 100);
}

// 添加滑入動畫樣式
const phoneSlideStyle = document.createElement('style');
phoneSlideStyle.textContent = `
  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(phoneSlideStyle);
