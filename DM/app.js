const MODULES = [
  {
    id: "module-1",
    name: "Module 1",
    description: "Introduction to data warehousing, OLAP, and data mining fundamentals.",
    file: "./data/module-1.json",
  },
  {
    id: "module-2",
    name: "Module 2",
    description: "Preprocessing, cleaning, transformation, reduction, and discretization.",
    file: "./data/module-2.json",
  },
  {
    id: "module-3",
    name: "Module 3",
    description: "Advanced classification and clustering methods.",
    file: "./data/module-3.json",
  },
  {
    id: "module-4",
    name: "Module 4",
    description: "Association rule discovery and frequent pattern mining algorithms.",
    file: "./data/module-4.json",
  },
  {
    id: "module-5",
    name: "Module 5",
    description: "Web mining and text mining techniques for modern information systems.",
    file: "./data/module-5.json",
  },
];

const state = {
  topics: [],
  query: "",
  activeModule: "all",
  activeTopicId: null,
};

const elements = {
  topicList: document.querySelector("#topic-list"),
  moduleFilters: document.querySelector("#module-filters"),
  topicArticle: document.querySelector("#topic-article"),
  sectionNav: document.querySelector("#section-nav"),
  topicSearch: document.querySelector("#topic-search"),
  resetFilters: document.querySelector("#reset-filters"),
  topicCount: document.querySelector("#topic-count"),
  topicTotal: document.querySelector("#topic-total"),
  moduleTotal: document.querySelector("#module-total"),
  topicLinkTemplate: document.querySelector("#topic-link-template"),
};

async function loadTopics() {
  if (window.NOTES_MODULES) {
    state.topics = MODULES.flatMap((module) => window.NOTES_MODULES[module.id] || []);
  } else {
    const responses = await Promise.all(MODULES.map((module) => fetch(module.file)));
    const modules = await Promise.all(responses.map((response) => response.json()));
    state.topics = modules.flat();
  }
  elements.topicTotal.textContent = String(state.topics.length);
  elements.moduleTotal.textContent = String(MODULES.length);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function estimateWordCount(topic) {
  const chunks = [
    topic.intro,
    ...(topic.sections || []).flatMap((section) => section.paragraphs || []),
    buildExtendedStudyNote(topic),
  ];
  return chunks
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function estimateReadingTime(topic) {
  return Math.max(5, Math.round(estimateWordCount(topic) / 180));
}

function getModuleName(moduleId) {
  return MODULES.find((module) => module.id === moduleId)?.name ?? moduleId;
}

function buildExtendedStudyNote(topic) {
  const coverage = (topic.coverage || []).join(", ");
  const title = topic.title;
  const lower = `${title} ${coverage}`.toLowerCase();

  if (lower.includes("decision tree") || lower.includes("classification")) {
    return `A reliable revision habit for ${title} is to connect the concept to the whole supervised learning cycle rather than memorize it as a detached definition. Start from labeled training data, ask what structure the learner is trying to discover, explain how the model makes decisions on unseen tuples, and then state how success is judged. This frame automatically links split criteria, algorithm design, and evaluation instead of leaving them as separate facts. It also makes ${coverage} easier to explain through one realistic case such as loan approval, disease screening, spam filtering, or churn prediction. Strong answers usually define the concept, describe the mechanism, mention one important strength, one clear limitation, and one practical implication. That combination shows understanding rather than repetition, which is especially important in classification topics where many terms sound similar unless they are tied back to the purpose of making trustworthy label predictions. It is also good practice to mention why the classifier would be preferred over another approach in that scenario, because that final comparison shows real conceptual control instead of simple memorization.`;
  }

  if (lower.includes("clustering") || lower.includes("pam") || lower.includes("dbscan") || lower.includes("rock")) {
    return `When revising ${title}, the most useful question is what exactly counts as a cluster under this method. That question organizes the whole clustering unit. Partitioning methods assume a direct division into k groups, density methods search for dense connected regions, and categorical approaches rely on symbolic similarity or link structure rather than ordinary geometry. If a student can state that cluster definition clearly, the rest of the explanation becomes much easier. The topic ${coverage} also becomes more memorable when linked to one suitable data scenario, such as customer segmentation, spatial hotspot discovery, or grouping of symbolic transaction profiles. Examiners usually reward answers that explain the match between data type and algorithmic assumption, because clustering quality depends less on one universal formula and more on whether the chosen paradigm reflects the actual structure present in the data. A very strong answer also states what kind of cluster shape or data type would make the method perform poorly, because limitations are part of understanding.`;
  }

  if (lower.includes("association") || lower.includes("apriori") || lower.includes("fp-tree") || lower.includes("pincer") || lower.includes("itemset")) {
    return `A strong way to remember ${title} is to treat the whole association rule family as a search problem over an enormous space of item combinations. Support and confidence define which patterns matter, but the algorithmic challenge is how to find them without checking everything blindly. That is exactly why the syllabus moves from basic association rule ideas to Apriori, partition methods, pincer search, dynamic counting, and FP-growth. Each method preserves the same frequent pattern objective but changes the search route, the counting schedule, or the database representation. If you explain ${coverage} through that lens, the algorithms stop looking like unrelated names and instead appear as different efficiency strategies for the same combinatorial mining problem. Adding one realistic basket example and one warning that association is descriptive rather than causal usually makes the answer both accurate and convincing. A complete answer often sounds strongest when it ends by naming the main cost being reduced, such as candidate explosion, repeated scans, or wasted lattice exploration.`;
  }

  if (lower.includes("web ")) {
    return `The easiest way to keep ${title} clear is to identify which part of the web is being mined: content, link structure, or user behavior. That distinction is the spine of the web mining unit. Once it is stated, ${coverage} becomes easier to place, and later examples stop blending together. A strong answer usually combines process and purpose. It explains the kind of web data involved, the preprocessing needed to make that data useful, the analytical method applied, and the business or information value that results, such as search quality, personalization, recommendation, authority estimation, or site improvement. This matters because web mining is valuable only when the raw complexity of online traces is converted into better relevance, better navigation, or better understanding of user intent. Mentioning both the technical side and the decision side makes the topic much stronger. It also helps to note that web data changes rapidly, so freshness and noise handling are more important here than in many static database settings.`;
  }

  if (lower.includes("text ") || lower.includes("retrieval") || lower.includes("indexing") || lower.includes("query")) {
    return `A helpful way to revise ${title} is to see it as a pipeline from raw language to usable retrieval or analysis. Text is first normalized into structured features, then indexed for efficient access, then matched or ranked against queries, and finally mined for higher level patterns such as categories, entities, topics, or sentiments. Students often memorize precision, inverted indexes, or query processing steps separately, but the topic becomes much clearer when these parts are described as one connected system. In ${coverage}, the key examination advantage comes from showing how representation, evaluation, retrieval method, and query execution depend on one another. If one link is weak, the whole retrieval or mining process suffers. This systems view is what turns the text mining unit from a list of terms into a coherent model of how large text collections are searched and analyzed. Another good exam touch is to mention that ranking quality matters because returning the right document late is often nearly as unhelpful as not returning it at all.`;
  }

  if (lower.includes("preprocessing") || lower.includes("cleaning") || lower.includes("integration") || lower.includes("reduction") || lower.includes("discretization")) {
    return `One reason ${title} matters so much is that it explains why mining quality is determined long before the mining algorithm starts. When students revise preprocessing well, they stop seeing it as routine data housekeeping and start seeing it as a set of design decisions that shape validity, efficiency, and interpretability. The strongest answers on ${coverage} usually name the raw data problem, explain the preprocessing operation that addresses it, and then mention the tradeoff introduced by that choice. That structure shows judgment rather than ritual. In practice, many real projects spend more effort here than in model building, because a powerful algorithm cannot rescue badly prepared evidence. Mentioning that reality makes the answer sound more grounded and connects the preprocessing module back to the full KDD process in a very natural way. It also shows why preprocessing steps should be documented carefully, since later interpretation depends on knowing exactly how the data was altered before mining.`;
  }

  return `A dependable way to revise ${title} is to connect the formal definition with one concrete business or analytical scenario and then relate the topic back to the broader data mining workflow. Topics in this syllabus gain meaning when they are explained through purpose, method, and limitation rather than as isolated terms. For ${coverage}, a strong answer usually defines the idea, describes how it operates, notes one major advantage, one important limitation, and one example of where it improves decision making. That style of explanation is compact, clear, and much easier to remember under examination pressure than a purely memorized list of textbook points. If possible, close the answer by saying how the topic connects to data preparation, interpretation, or performance, because those links show mature understanding across the syllabus rather than narrow memorization of one heading.`;
}

function filterTopics() {
  const query = state.query.trim().toLowerCase();
  return state.topics.filter((topic) => {
    const inModule = state.activeModule === "all" || topic.module === state.activeModule;
    if (!inModule) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      topic.title,
      topic.intro,
      ...(topic.coverage || []),
      ...(topic.sections || []).map((section) => section.heading),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

function renderModuleFilters() {
  const fragment = document.createDocumentFragment();

  const allButton = document.createElement("button");
  allButton.type = "button";
  allButton.className = `module-filter ${state.activeModule === "all" ? "active" : ""}`;
  allButton.textContent = "All modules";
  allButton.addEventListener("click", () => {
    state.activeModule = "all";
    render();
  });
  fragment.appendChild(allButton);

  MODULES.forEach((module) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `module-filter ${state.activeModule === module.id ? "active" : ""}`;
    button.textContent = module.name;
    button.title = module.description;
    button.addEventListener("click", () => {
      state.activeModule = module.id;
      render();
    });
    fragment.appendChild(button);
  });

  elements.moduleFilters.replaceChildren(fragment);
}

function renderTopicList(topics) {
  elements.topicCount.textContent = `${topics.length} visible`;

  if (!topics.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
      <p class="eyebrow">No Match</p>
      <h3>Nothing matches the current filter.</h3>
      <p class="topic-coverage-line">Try a broader module selection or remove the search term.</p>
    `;
    elements.topicList.replaceChildren(empty);
    return;
  }

  if (!topics.some((topic) => topic.id === state.activeTopicId)) {
    state.activeTopicId = topics[0].id;
  }

  const fragment = document.createDocumentFragment();

  topics.forEach((topic) => {
    const node = elements.topicLinkTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".topic-module").textContent = getModuleName(topic.module);
    node.querySelector(".topic-title").textContent = topic.title;
    node.querySelector(".topic-coverage").textContent = (topic.coverage || []).slice(0, 2).join(" | ");

    if (topic.id === state.activeTopicId) {
      node.classList.add("active");
    }

    node.addEventListener("click", () => {
      state.activeTopicId = topic.id;
      render();
      window.location.hash = topic.id;
    });

    fragment.appendChild(node);
  });

  elements.topicList.replaceChildren(fragment);
}

function renderSectionNav(topic) {
  const fragment = document.createDocumentFragment();

  (topic.sections || []).forEach((section) => {
    const id = `${topic.id}-${slugify(section.heading)}`;
    const anchor = document.createElement("a");
    anchor.href = `#${id}`;
    anchor.textContent = section.heading;
    fragment.appendChild(anchor);
  });

  const extendedAnchor = document.createElement("a");
  extendedAnchor.href = `#${topic.id}-extended-study-note`;
  extendedAnchor.textContent = "Extended Study Note";
  fragment.appendChild(extendedAnchor);

  elements.sectionNav.replaceChildren(fragment);
}

function renderTopic(topic) {
  const moduleName = getModuleName(topic.module);
  const wordCount = estimateWordCount(topic);
  const readingTime = estimateReadingTime(topic);

  const header = document.createElement("header");
  header.className = "topic-header";
  header.innerHTML = `
    <div class="module-chip-row">
      <span class="module-chip">${moduleName}</span>
    </div>
    <div>
      <p class="eyebrow">Detailed Notes</p>
      <h1>${topic.title}</h1>
    </div>
    <p class="topic-coverage-line">${topic.intro}</p>
    <div class="coverage-row">
      ${(topic.coverage || []).map((item) => `<span class="coverage-chip">${item}</span>`).join("")}
    </div>
    <div class="meta-row">
      <span class="meta-pill">${wordCount.toLocaleString()} words</span>
      <span class="meta-pill">${readingTime} min read</span>
      <span class="meta-pill">Image credit included</span>
    </div>
  `;

  const layout = document.createElement("div");
  layout.className = "topic-layout";

  if (topic.image?.src) {
    const figure = document.createElement("figure");
    figure.className = "image-block";
    figure.innerHTML = `
      <img src="${topic.image.src}" alt="${topic.image.alt || topic.title}" loading="lazy">
      <figcaption class="image-caption-wrap">
        <h3>Reference Image</h3>
        <p class="image-caption">${topic.image.caption || ""}</p>
        <p class="image-caption">Source: <a href="${topic.image.creditUrl}" target="_blank" rel="noreferrer">${topic.image.creditLabel}</a></p>
      </figcaption>
    `;
    layout.appendChild(figure);
  }

  (topic.sections || []).forEach((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "topic-section";
    sectionElement.id = `${topic.id}-${slugify(section.heading)}`;
    sectionElement.innerHTML = `
      <h3>${section.heading}</h3>
      ${(section.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join("")}
    `;
    layout.appendChild(sectionElement);
  });

  const extendedNote = document.createElement("section");
  extendedNote.className = "topic-section";
  extendedNote.id = `${topic.id}-extended-study-note`;
  extendedNote.innerHTML = `
    <h3>Extended Study Note</h3>
    <p>${buildExtendedStudyNote(topic)}</p>
  `;
  layout.appendChild(extendedNote);

  if (topic.references?.length) {
    const sources = document.createElement("section");
    sources.className = "source-block";
    sources.innerHTML = `
      <h3>Selected References</h3>
      <ul class="source-list">
        ${topic.references.map((reference) => `<li><a href="${reference.url}" target="_blank" rel="noreferrer">${reference.label}</a></li>`).join("")}
      </ul>
    `;
    layout.appendChild(sources);
  }

  elements.topicArticle.replaceChildren(header, layout);
  renderSectionNav(topic);
}

function render() {
  renderModuleFilters();
  const filtered = filterTopics();
  renderTopicList(filtered);

  const topic = filtered.find((item) => item.id === state.activeTopicId) ?? filtered[0];
  if (topic) {
    renderTopic(topic);
  } else {
    elements.topicArticle.innerHTML = `
      <div class="empty-state">
        <p class="eyebrow">No Topic</p>
        <h3>Select a topic to start reading.</h3>
      </div>
    `;
    elements.sectionNav.replaceChildren();
  }
}

function attachEvents() {
  elements.topicSearch.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  elements.resetFilters.addEventListener("click", () => {
    state.query = "";
    state.activeModule = "all";
    elements.topicSearch.value = "";
    render();
  });

  window.addEventListener("hashchange", () => {
    const topicId = window.location.hash.replace("#", "").trim();
    if (topicId && state.topics.some((topic) => topic.id === topicId)) {
      state.activeTopicId = topicId;
      render();
    }
  });
}

async function init() {
  try {
    await loadTopics();
    const topicIdFromHash = window.location.hash.replace("#", "").trim();
    state.activeTopicId = state.topics.some((topic) => topic.id === topicIdFromHash)
      ? topicIdFromHash
      : state.topics[0]?.id ?? null;
    attachEvents();
    render();
  } catch (error) {
    elements.topicArticle.innerHTML = `
      <div class="empty-state">
        <p class="eyebrow">Load Error</p>
        <h3>The note data could not be loaded.</h3>
        <p class="topic-coverage-line">${error.message}</p>
      </div>
    `;
  }
}

init();

