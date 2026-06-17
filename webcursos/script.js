/* -------------------------------------------------------------
   DHIA PLAY - CORE DE LOGICA E BANCO DE DADOS LOCAL (SCRIPT.JS)
   ------------------------------------------------------------- */

// --- 1. BANCO DE DADOS DE CURSOS MOCKADOS (DADOS DE EXIBIÇÃO) ---
const COURSES_DATA = [
  {
    id: 1,
    title: "Engenharia de Prompt para Iniciantes",
    category: "Prompt",
    isPremium: false,
    image: "images/course_prompt.png",
    duration: "4 horas",
    difficulty: "Iniciante",
    description: "Aprenda a estruturar prompts profissionais para obter respostas precisas de LLMs, automatizar tarefas diárias e maximizar sua produtividade.",
    lessons: [
      {
        id: "c1_l1",
        title: "1. Introdução à Engenharia de Prompt",
        duration: "08:30",
        description: `
          <p>Seja bem-vindo ao curso de Engenharia de Prompt! Nesta primeira aula, vamos entender as bases e o contexto por trás desse novo campo de conhecimento.</p>
          <h2>O que é Engenharia de Prompt?</h2>
          <p>É a habilidade de estruturar prompts (instruções de texto) de forma que as IAs generativas consigam nos fornecer as respostas exatas de que precisamos. Entenderemos a diferença entre entrada estruturada e linguagem natural simples.</p>
        `
      },
      {
        id: "c1_l2",
        title: "2. Técnicas de Few-Shot Prompting",
        duration: "12:15",
        description: `
          <p>Nesta aula prática, exploramos a técnica de Few-Shot Prompting, que consiste em dar exemplos de entradas e saídas esperadas para calibrar a resposta da IA.</p>
          <h2>Por que usar exemplos?</h2>
          <p>Modelos de linguagem aprendem a replicar padrões. Ao fornecer 2 ou 3 exemplos de formatação de tradução ou classificação de texto, você garante que a IA responda no mesmo tom e formato.</p>
        `
      },
      {
        id: "c1_l3",
        title: "3. Raciocínio por Cadeia de Pensamento (CoT)",
        duration: "15:40",
        description: `
          <p>Aprenda a ativar a lógica analítica das IAs usando o Chain-of-Thought (Cadeia de Pensamento) para resolver problemas matemáticos, de lógica e tomada de decisões.</p>
          <h2>Como aplicar:</h2>
          <p>Basta instruir o modelo a explicar o raciocínio passo a passo antes de entregar a resposta final. Exemplo: <i>"Pense passo a passo para calcular a margem de lucro e justifique..."</i></p>
        `
      }
    ]
  },
  {
    id: 2,
    title: "Orquestração de Agentes Autônomos de IA",
    category: "Agentes",
    isPremium: true,
    image: "images/course_agents.png",
    duration: "8 horas",
    difficulty: "Intermediário",
    description: "Construa sistemas autônomos multi-agentes que cooperam entre si para resolver tarefas de negócios complexas usando Python e CrewAI.",
    lessons: [
      {
        id: "c2_l1",
        title: "1. Entendendo Sistemas Multi-Agentes",
        duration: "10:20",
        description: `
          <p>Descubra o conceito de Agentes de IA e por que a arquitetura colaborativa multi-agentes supera os chatbots tradicionais em tarefas industriais complexas.</p>
          <h2>O conceito de Agente:</h2>
          <p>Diferente de um simples prompt, um agente possui um papel específico (role), um objetivo (goal), autonomia para planejar e acesso a ferramentas como buscadores web ou editores de arquivo.</p>
        `
      },
      {
        id: "c2_l2",
        title: "2. Criando sua primeira Crew com CrewAI",
        duration: "18:45",
        description: `
          <p>Aprenda a instalar, configurar e programar sua primeira equipe (Crew) com agentes especializados de pesquisa e escrita usando Python.</p>
          <h2>Estrutura básica:</h2>
          <p>Criamos um Agente Pesquisador e um Agente Escritor, conectando-os a tarefas interdependentes onde a saída de um é a entrada do outro.</p>
        `
      },
      {
        id: "c2_l3",
        title: "3. Integração de Ferramentas de Busca Personalizadas",
        duration: "14:10",
        description: `
          <p>Dê poder de ação aos seus agentes conectando APIs de busca em tempo real (como Serper API) para que possam coletar dados atualizados do mercado.</p>
        `
      }
    ]
  },
  {
    id: 3,
    title: "Programação e Desenvolvimento Assistido por IA",
    category: "Programacao",
    isPremium: true,
    image: "images/course_dev.png",
    duration: "6 horas",
    difficulty: "Avançado",
    description: "Acelere seu fluxo de codificação integrando editores modernos como o Cursor e copilotos para refatorar código e gerar testes em segundos.",
    lessons: [
      {
        id: "c3_l1",
        title: "1. A Revolução do Editor Cursor",
        duration: "11:15",
        description: `
          <p>Explore a IDE Cursor, um fork do VS Code que traz inteligência integrada ao contexto do seu repositório de arquivos local de forma nativa.</p>
          <h2>Ferramentas principais:</h2>
          <p>Entenda o uso do atalho Ctrl+K para gerar código inline e Ctrl+L para conversar com a IA referenciando seu codebase através do símbolo @.</p>
        `
      },
      {
        id: "c3_l2",
        title: "2. Refatoração e Geração de Testes Unitários",
        duration: "16:30",
        description: `
          <p>Aprenda a usar modelos avançados como Claude 3.5 Sonnet para analisar complexidades de código legado e criar baterias de testes automatizados seguros.</p>
        `
      }
    ]
  },
  {
    id: 4,
    title: "Fundamentos de LLMs (Grandes Modelos de Linguagem)",
    category: "Prompt",
    isPremium: false,
    image: "images/course_prompt.png",
    duration: "5 horas",
    difficulty: "Iniciante",
    description: "Uma imersão na arquitetura Transformer, aprendizado por reforço (RLHF) e no funcionamento estatístico das inteligências artificiais conversacionais.",
    lessons: [
      {
        id: "c4_l1",
        title: "1. A Arquitetura Transformer",
        duration: "12:50",
        description: `
          <p>Descubra como o artigo científico 'Attention Is All You Need' do Google revolucionou o processamento de linguagem natural introduzindo o mecanismo de atenção.</p>
        `
      },
      {
        id: "c4_l2",
        title: "2. Pré-Treino, Fine-Tuning e Alinhamento",
        duration: "14:20",
        description: `
          <p>Aprenda a diferença entre o treinamento bruto de uma IA (leitura de dados web) e o processo de alinhamento por feedback humano (RLHF) para torná-la um assistente prestativo.</p>
        `
      }
    ]
  }
];

// --- 2. GERENCIADOR DE ESTADO GLOBAL (SPA E USUÁRIOS) ---
let currentUser = null;
let activeCourse = null;
let activeLessonIndex = 0;

// Variáveis para Simular o Player de Vídeo
let videoInterval = null;
let isPlaying = false;
let playTime = 0; // Segundos transcorridos
let totalPlayDuration = 180; // Segundos simulados (3 minutos)
let playbackSpeed = 1.0;
let isMuted = false;

// Ouvintes de Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initApp();
  setupEventListeners();
  renderCatalog();
});

// Inicialização da Sessão
function initApp() {
  const session = localStorage.getItem("dhia_play_session");
  if (session) {
    currentUser = JSON.parse(session);
    updateUserNavUI();
  }
}

// Atualiza Navbar e Menu após login/logout
function updateUserNavUI() {
  const navAuthItem = document.getElementById("nav-auth-item");
  const navUserItem = document.getElementById("nav-user-item");
  const menuDashboardItem = document.getElementById("menu-dashboard-item");
  const navUsernameSpan = document.getElementById("nav-username-span");

  if (currentUser) {
    navAuthItem.style.display = "none";
    navUserItem.style.display = "block";
    menuDashboardItem.style.display = "block";
    navUsernameSpan.innerText = currentUser.name.split(" ")[0]; // Primeiro nome
  } else {
    navAuthItem.style.display = "block";
    navUserItem.style.display = "none";
    menuDashboardItem.style.display = "none";
  }
}

// --- 3. SISTEMA DE ROTAS DE PÁGINA ÚNICA (SPA) ---
function navigateTo(routeId) {
  // Desativar rota ativa
  document.querySelectorAll(".spa-route").forEach(route => {
    route.classList.remove("active-route");
  });
  // Desativar links ativos no menu
  document.querySelectorAll(".nav-menu li").forEach(li => {
    li.classList.remove("active-menu");
  });

  // Ativar nova rota
  const activeRoute = document.getElementById(routeId);
  if (activeRoute) {
    activeRoute.classList.add("active-route");
  }

  // Parar player se sair da sala de aula
  if (routeId !== "route-classroom") {
    stopVideoSimulator();
  }

  // Sincronizar o menu
  if (routeId === "route-home") {
    document.getElementById("menu-home-btn").parentElement.classList.add("active-menu");
  } else if (routeId === "route-dashboard") {
    document.getElementById("menu-dashboard-btn").parentElement.classList.add("active-menu");
  }

  // Rolar para o topo
  window.scrollTo(0, 0);
}

// --- 4. RENDERIZADOR DO CATÁLOGO PRINCIPAL (ESTILO NETFLIX) ---
function renderCatalog() {
  const freeGrid = document.getElementById("free-courses-grid");
  const premiumGrid = document.getElementById("premium-courses-grid");

  freeGrid.innerHTML = "";
  premiumGrid.innerHTML = "";

  COURSES_DATA.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    
    // Configura selos de restrição
    let lockBadgeHtml = "";
    let freeBadgeHtml = "";
    if (course.isPremium) {
      lockBadgeHtml = `<div class="course-lock-badge"><i class="fa-solid fa-lock"></i></div>`;
    } else {
      freeBadgeHtml = `<div class="course-free-badge">Grátis</div>`;
    }

    card.innerHTML = `
      <div class="course-thumbnail-container">
        ${freeBadgeHtml}
        ${lockBadgeHtml}
        <img src="${course.image}" class="course-thumbnail" alt="${course.title}">
        <div class="course-overlay-play">
          <div class="play-icon-circle"><i class="fa-solid fa-play"></i></div>
        </div>
      </div>
      <div class="course-details">
        <div class="course-meta-tags">
          <span class="course-difficulty">${course.difficulty}</span>
          <span class="course-duration"><i class="fa-regular fa-clock"></i> ${course.duration}</span>
        </div>
        <h3 class="course-card-title">${course.title}</h3>
        <p class="course-card-desc">${course.description}</p>
        <span class="course-card-action">Assistir Trilha <i class="fa-solid fa-arrow-right"></i></span>
      </div>
    `;

    // Clique no card de curso
    card.addEventListener("click", () => {
      handleCourseSelection(course);
    });

    if (course.isPremium) {
      premiumGrid.appendChild(card);
    } else {
      freeGrid.appendChild(card);
    }
  });
}

// --- 5. CONTROLE DE MATRÍCULA E PÁGINA DE CURSO ---
function handleCourseSelection(course) {
  if (course.isPremium && !currentUser) {
    // Exibe login se tentar acessar curso Premium deslogado
    openAuthModal("login");
    return;
  }

  // Matricular usuário no curso (se logado e ainda não matriculado)
  if (currentUser) {
    enrollUserInCourse(course.id);
  }

  // Iniciar Sala de Aula
  launchClassroom(course, 0);
}

// Matricula o usuário logado e cria a trilha de progresso no localStorage
function enrollUserInCourse(courseId) {
  const progressKey = `dhia_progress_${currentUser.email}`;
  let userProgress = localStorage.getItem(progressKey);
  
  if (userProgress) {
    userProgress = JSON.parse(userProgress);
  } else {
    userProgress = {};
  }

  // Se não matriculado ainda, inicializa a lista de aulas concluídas
  if (!userProgress[courseId]) {
    userProgress[courseId] = {
      courseId: courseId,
      completedLessons: []
    };
    localStorage.setItem(progressKey, JSON.stringify(userProgress));
  }
}

// --- 6. SALA DE AULA SIMULADA (CLASSROOM LOUNGE) ---
function launchClassroom(course, lessonIndex) {
  activeCourse = course;
  activeLessonIndex = lessonIndex;
  
  navigateTo("route-classroom");
  loadLessonData();
  renderPlaylist();
}

// Carrega os dados da aula ativa no player e abas
function loadLessonData() {
  const lesson = activeCourse.lessons[activeLessonIndex];
  
  document.getElementById("lesson-tag").innerText = activeCourse.category;
  document.getElementById("lesson-title").innerText = lesson.title;
  document.getElementById("lesson-course-title").innerText = activeCourse.title;
  document.getElementById("tab-desc").innerHTML = lesson.description;

  // Resetar o Player
  stopVideoSimulator();
  document.getElementById("video-banner-title").innerText = lesson.title;
  document.getElementById("video-time").innerText = `0:00 / ${lesson.duration}`;

  // Carrega Comentários
  loadLessonComments();
}

// Renderiza a Playlist lateral de Aulas
function renderPlaylist() {
  const playlistUl = document.getElementById("lessons-playlist");
  playlistUl.innerHTML = "";

  // Busca progresso de aulas completadas do localStorage
  let completedList = [];
  if (currentUser) {
    const progressKey = `dhia_progress_${currentUser.email}`;
    const progressData = JSON.parse(localStorage.getItem(progressKey) || "{}");
    if (progressData[activeCourse.id]) {
      completedList = progressData[activeCourse.id].completedLessons;
    }
  }

  activeCourse.lessons.forEach((lesson, index) => {
    const li = document.createElement("li");
    li.className = "lesson-item";
    if (index === activeLessonIndex) {
      li.classList.add("active-lesson-item");
    }

    const isCompleted = completedList.includes(lesson.id);
    if (isCompleted) {
      li.classList.add("completed-lesson");
    }

    li.innerHTML = `
      <div class="lesson-item-left">
        <span class="lesson-play-indicator"><i class="fa-solid ${index === activeLessonIndex ? 'fa-volume-high' : 'fa-play'}"></i></span>
        <div class="lesson-title-meta">
          <span class="lesson-playlist-title">${lesson.title}</span>
          <span class="lesson-playlist-duration">${lesson.duration}</span>
        </div>
      </div>
      <div class="lesson-checkbox" data-lesson-id="${lesson.id}">
        <i class="fa-solid fa-check"></i>
      </div>
    `;

    // Clicar no texto da aula abre a aula
    li.querySelector(".lesson-item-left").addEventListener("click", () => {
      launchClassroom(activeCourse, index);
    });

    // Clicar na caixinha de check conclui/desconclui a aula (apenas se logado)
    const checkbox = li.querySelector(".lesson-checkbox");
    checkbox.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!currentUser) {
        openAuthModal("login");
        return;
      }
      toggleLessonCompletion(lesson.id, checkbox);
    });

    playlistUl.appendChild(li);
  });
}

// Inverte a conclusão de uma aula
function toggleLessonCompletion(lessonId, checkboxEl) {
  const progressKey = `dhia_progress_${currentUser.email}`;
  let progressData = JSON.parse(localStorage.getItem(progressKey) || "{}");
  
  if (!progressData[activeCourse.id]) {
    progressData[activeCourse.id] = { courseId: activeCourse.id, completedLessons: [] };
  }

  const completed = progressData[activeCourse.id].completedLessons;
  const index = completed.indexOf(lessonId);

  if (index > -1) {
    // Desmarcar conclusão
    completed.splice(index, 1);
    checkboxEl.closest(".lesson-item").classList.remove("completed-lesson");
  } else {
    // Marcar conclusão
    completed.push(lessonId);
    checkboxEl.closest(".lesson-item").classList.add("completed-lesson");
  }

  localStorage.setItem(progressKey, JSON.stringify(progressData));
}

// --- 7. SIMULADOR DO REPRODUTOR DE VÍDEO ---
const videoPlayBtn = document.getElementById("video-play-btn");
const videoMuteBtn = document.getElementById("video-mute-btn");
const videoSpeedBtn = document.getElementById("video-speed-btn");
const videoTimeline = document.getElementById("video-timeline");
const videoTimelineFill = document.getElementById("video-timeline-fill");
const videoTimelineKnob = document.getElementById("video-timeline-knob");
const videoBannerPlayIcon = document.getElementById("video-banner-play-icon");

function startVideoSimulator() {
  if (isPlaying) return;

  isPlaying = true;
  videoPlayBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  document.getElementById("video-banner").style.display = "none";

  // Duração mockada baseada na aula
  const lesson = activeCourse.lessons[activeLessonIndex];
  const parts = lesson.duration.split(":");
  totalPlayDuration = parseInt(parts[0]) * 60 + parseInt(parts[1]);

  videoInterval = setInterval(() => {
    // Incrementar tempo baseado na velocidade do player (multiplica velocidade)
    playTime += playbackSpeed;

    if (playTime >= totalPlayDuration) {
      playTime = totalPlayDuration;
      stopVideoSimulator();
      
      // Auto concluir a aula ao terminar o vídeo (Experiência incrível!)
      if (currentUser) {
        autoCompleteActiveLesson();
      }
    }

    updateVideoPlayerUI();
  }, 1000);
}

function stopVideoSimulator() {
  isPlaying = false;
  if (videoInterval) {
    clearInterval(videoInterval);
    videoInterval = null;
  }
  videoPlayBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  if (playTime === 0 || playTime >= totalPlayDuration) {
    document.getElementById("video-banner").style.display = "block";
    playTime = 0;
  }
}

// Auto completa a lição ativa quando o vídeo simulado chega ao fim
function autoCompleteActiveLesson() {
  const lesson = activeCourse.lessons[activeLessonIndex];
  const progressKey = `dhia_progress_${currentUser.email}`;
  let progressData = JSON.parse(localStorage.getItem(progressKey) || "{}");
  
  if (!progressData[activeCourse.id]) {
    progressData[activeCourse.id] = { courseId: activeCourse.id, completedLessons: [] };
  }

  const completed = progressData[activeCourse.id].completedLessons;
  if (!completed.includes(lesson.id)) {
    completed.push(lesson.id);
    localStorage.setItem(progressKey, JSON.stringify(progressData));
    
    // Atualiza a playlist lateral para mostrar o check verde
    renderPlaylist();
    alert(`Parabéns! Você concluiu a aula: "${lesson.title}"`);
  }
}

function updateVideoPlayerUI() {
  // Atualiza barra de progresso
  const percent = (playTime / totalPlayDuration) * 100;
  videoTimelineFill.style.width = `${percent}%`;
  videoTimelineKnob.style.left = `${percent}%`;

  // Formata Timers
  const formattedCurrent = formatTime(playTime);
  const formattedTotal = activeCourse.lessons[activeLessonIndex].duration;
  document.getElementById("video-time").innerText = `${formattedCurrent} / ${formattedTotal}`;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// Cliques nos botões do player
videoPlayBtn.addEventListener("click", () => {
  if (isPlaying) {
    stopVideoSimulator();
  } else {
    startVideoSimulator();
  }
});

videoBannerPlayIcon.addEventListener("click", startVideoSimulator);

// Mute Toggle
videoMuteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  if (isMuted) {
    videoMuteBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  } else {
    videoMuteBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  }
});

// Speed Toggle (1.0x -> 1.5x -> 2.0x -> 1.0x)
videoSpeedBtn.addEventListener("click", () => {
  if (playbackSpeed === 1.0) {
    playbackSpeed = 1.5;
  } else if (playbackSpeed === 1.5) {
    playbackSpeed = 2.0;
  } else {
    playbackSpeed = 1.0;
  }
  videoSpeedBtn.innerText = `${playbackSpeed.toFixed(1)}x`;
});

// Fullscreen Simulator
document.getElementById("video-fullscreen-btn").addEventListener("click", () => {
  const player = document.getElementById("video-simulator");
  if (!document.fullscreenElement) {
    player.requestFullscreen().catch(err => {
      alert("Simulador de Tela Cheia ativado!");
    });
  } else {
    document.exitFullscreen();
  }
});

// --- 8. SISTEMA DE COMENTÁRIOS DA SALA DE AULA ---
const commentTextarea = document.getElementById("classroom-comment-textarea");
const commentForm = document.getElementById("classroom-comment-form");

function loadLessonComments() {
  const lesson = activeCourse.lessons[activeLessonIndex];
  const commentsKey = `dhia_comments_${activeCourse.id}_${lesson.id}`;
  const comments = JSON.parse(localStorage.getItem(commentsKey) || "[]");

  const commentsList = document.getElementById("classroom-comments-list");
  document.getElementById("lesson-comments-count").innerText = comments.length;
  commentsList.innerHTML = "";

  if (comments.length === 0) {
    commentsList.innerHTML = `<p style="color: var(--text-muted); font-style: italic; font-size: 13.5px;">Nenhuma dúvida postada nesta aula. Deixe sua contribuição abaixo!</p>`;
    return;
  }

  comments.forEach(comment => {
    const item = document.createElement("div");
    item.className = "comment-item";
    item.innerHTML = `
      <div class="comment-header">
        ${comment.author}
        <span class="comment-date">${comment.date}</span>
      </div>
      <div class="comment-text">${comment.text}</div>
    `;
    commentsList.appendChild(item);
  });
}

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser) {
    openAuthModal("login");
    return;
  }

  const text = commentTextarea.value.trim();
  if (!text) return;

  const lesson = activeCourse.lessons[activeLessonIndex];
  const commentsKey = `dhia_comments_${activeCourse.id}_${lesson.id}`;
  const comments = JSON.parse(localStorage.getItem(commentsKey) || "[]");

  const now = new Date();
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = now.toLocaleDateString('pt-BR', options);

  const newComment = {
    author: currentUser.name,
    text: text,
    date: formattedDate
  };

  comments.push(newComment);
  localStorage.setItem(commentsKey, JSON.stringify(comments));
  
  commentTextarea.value = "";
  loadLessonComments();
});

// --- 9. RENDERIZADOR DO DASHBOARD DO ESTUDANTE ---
function renderDashboard() {
  if (!currentUser) return;

  document.getElementById("dash-greeting-title").innerText = `Olá, ${currentUser.name}!`;

  // Calcular estatísticas
  const progressKey = `dhia_progress_${currentUser.email}`;
  const progressData = JSON.parse(localStorage.getItem(progressKey) || "{}");

  const enrolledCourseIds = Object.keys(progressData);
  const enrolledCount = enrolledCourseIds.length;

  let totalCompletedLessons = 0;
  let totalLessonsInEnrolled = 0;

  enrolledCourseIds.forEach(cId => {
    const course = COURSES_DATA.find(c => c.id === parseInt(cId));
    if (course) {
      totalCompletedLessons += progressData[cId].completedLessons.length;
      totalLessonsInEnrolled += course.lessons.length;
    }
  });

  const progressPercent = totalLessonsInEnrolled > 0 
    ? Math.round((totalCompletedLessons / totalLessonsInEnrolled) * 100) 
    : 0;

  document.getElementById("stat-courses-count").innerText = enrolledCount;
  document.getElementById("stat-lessons-count").innerText = totalCompletedLessons;
  document.getElementById("stat-progress-percent").innerText = `${progressPercent}%`;

  // Renderizar a lista de cursos matriculados
  const enrolledGrid = document.getElementById("enrolled-courses-grid");
  enrolledGrid.innerHTML = "";

  if (enrolledCount === 0) {
    enrolledGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
        <i class="fa-solid fa-book" style="font-size: 48px; margin-bottom: 16px; color: var(--accent-purple);"></i>
        <p>Você ainda não iniciou nenhum curso. Escolha uma trilha no catálogo e comece!</p>
      </div>
    `;
    return;
  }

  enrolledCourseIds.forEach(cId => {
    const course = COURSES_DATA.find(c => c.id === parseInt(cId));
    if (course) {
      const completedCount = progressData[cId].completedLessons.length;
      const totalCount = course.lessons.length;
      const pct = Math.round((completedCount / totalCount) * 100);

      const card = document.createElement("div");
      card.className = "course-card";
      card.innerHTML = `
        <div class="course-thumbnail-container">
          <img src="${course.image}" class="course-thumbnail" alt="${course.title}">
          <div class="course-overlay-play">
            <div class="play-icon-circle"><i class="fa-solid fa-play"></i></div>
          </div>
        </div>
        <div class="course-details">
          <div class="course-meta-tags">
            <span class="course-difficulty">${course.difficulty}</span>
            <span class="course-duration">${course.duration}</span>
          </div>
          <h3 class="course-card-title">${course.title}</h3>
          
          <div class="course-progress-container">
            <div class="progress-bar-label">
              <span>Progresso</span>
              <span>${pct}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        launchClassroom(course, 0);
      });

      enrolledGrid.appendChild(card);
    }
  });
}

// --- 10. CONFIGURAÇÃO DE EVENTOS E INTERAÇÃO (LOGIN/CADASTRO) ---
const authModal = document.getElementById("auth-modal");
const loginContainer = document.getElementById("auth-login-container");
const registerContainer = document.getElementById("auth-register-container");

function openAuthModal(type) {
  authModal.classList.add("active");
  if (type === "login") {
    loginContainer.style.display = "block";
    registerContainer.style.display = "none";
  } else {
    loginContainer.style.display = "none";
    registerContainer.style.display = "block";
  }
}

function closeAuthModal() {
  authModal.classList.remove("active");
}

function setupEventListeners() {
  // Navbar logo click
  document.getElementById("nav-brand-logo").addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("route-home");
  });

  // Home links
  document.getElementById("menu-home-btn").addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("route-home");
  });

  document.getElementById("hero-start-btn").addEventListener("click", () => {
    document.getElementById("courses-section").scrollIntoView({ behavior: "smooth" });
  });

  // Dashboard links
  document.getElementById("menu-dashboard-btn").addEventListener("click", (e) => {
    e.preventDefault();
    renderDashboard();
    navigateTo("route-dashboard");
  });

  // Modais de Auth
  document.getElementById("nav-login-btn").addEventListener("click", () => openAuthModal("login"));
  document.getElementById("login-close-btn").addEventListener("click", closeAuthModal);
  document.getElementById("register-close-btn").addEventListener("click", closeAuthModal);

  document.getElementById("switch-to-register").addEventListener("click", () => openAuthModal("register"));
  document.getElementById("switch-to-login").addEventListener("click", () => openAuthModal("login"));

  // Logout Actions
  document.getElementById("dash-logout-btn").addEventListener("click", performLogout);
  document.getElementById("nav-profile-btn").addEventListener("click", () => {
    if (confirm("Deseja sair da sua conta?")) {
      performLogout();
    }
  });

  // Formulário de Cadastro (Register)
  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim().toLowerCase();
    const password = document.getElementById("reg-password").value;

    let users = JSON.parse(localStorage.getItem("dhia_users") || "{}");
    if (users[email]) {
      alert("Este e-mail já está cadastrado. Faça login!");
      return;
    }

    users[email] = { name, email, password };
    localStorage.setItem("dhia_users", JSON.stringify(users));

    alert("Conta criada com sucesso! Faça login para continuar.");
    openAuthModal("login");
  });

  // Formulário de Login
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("dhia_users") || "{}");
    const user = users[email];

    if (!user || user.password !== password) {
      alert("E-mail ou senha incorretos.");
      return;
    }

    // Salvar Sessão
    currentUser = { name: user.name, email: user.email };
    localStorage.setItem("dhia_play_session", JSON.stringify(currentUser));

    updateUserNavUI();
    closeAuthModal();
    alert(`Bem-vindo, ${user.name}!`);

    // Redireciona para o Painel
    renderDashboard();
    navigateTo("route-dashboard");
  });

  // Classroom Tab Toggles
  document.querySelectorAll(".lesson-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".lesson-tab-btn").forEach(b => b.classList.remove("active-tab"));
      document.querySelectorAll(".lesson-tab-pane").forEach(p => p.classList.remove("active-pane"));

      btn.classList.add("active-tab");
      const targetPane = document.getElementById(btn.getAttribute("data-tab"));
      if (targetPane) targetPane.classList.add("active-pane");
    });
  });

  // Mobile menu hambúrguer toggle
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = mobileToggle.querySelector("i");
    icon.className = navMenu.classList.contains("active") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  });
}

function performLogout() {
  localStorage.removeItem("dhia_play_session");
  currentUser = null;
  activeCourse = null;
  
  updateUserNavUI();
  navigateTo("route-home");
  alert("Sessão encerrada.");
}
