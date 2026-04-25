window.NOTES_MODULES = window.NOTES_MODULES || {};
window.NOTES_MODULES['module-5'] = [
  {
    "id": "web-mining-foundations-and-content",
    "module": "module-5",
    "title": "Web Mining Foundations and Web Content Mining",
    "coverage": [
      "Web Mining",
      "Web Content Mining"
    ],
    "intro": "This topic introduces web mining as the application of mining methods to web data and explains how web content mining extracts useful structure from page level information such as text, tags, media, and metadata.",
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/e/ee/KDD_process.png",
      "alt": "KDD process diagram as a reminder that web mining also follows a staged knowledge discovery process",
      "caption": "Web mining still follows the larger knowledge discovery logic: data must be collected, prepared, structured, mined, and interpreted in context.",
      "creditLabel": "Wikimedia Commons",
      "creditUrl": "https://commons.wikimedia.org/wiki/File:KDD_process.png"
    },
    "references": [
      {
        "label": "Knowledge Discovery and Data Mining: Towards a Unifying Framework",
        "url": "https://cdn.aaai.org/KDD/1996/KDD96-014.pdf"
      }
    ],
    "sections": [
      {
        "heading": "What Makes Web Mining Distinct",
        "paragraphs": [
          "Web mining applies data mining techniques to data generated on or about the web. The web is different from many traditional databases because it is large, distributed, dynamic, semi structured, linked, and behavior rich. It contains page content, hyperlink structure, server logs, clickstreams, queries, and user interaction traces. These multiple data types create different mining subfields. Web content mining studies what is on the pages. Web structure mining studies how pages link to one another. Web usage mining studies how users interact with the site or service. Understanding this three way split is the conceptual foundation of the module.",
          "The web also introduces special challenges. Content is heterogeneous, pages change quickly, users arrive with short attention spans, and the same action can be logged at many layers. A web mining workflow must therefore combine information retrieval, text analysis, graph analysis, and behavioral mining. In many applications, the value comes from combining them. A search engine uses page content, hyperlink authority, and query behavior together. An e commerce site may combine product descriptions, navigation paths, and purchase histories."
        ]
      },
      {
        "heading": "Web Content Mining",
        "paragraphs": [
          "Web content mining focuses on extracting knowledge from the actual material of web pages. This material may include text, headlines, product descriptions, article bodies, metadata, tags, images, and sometimes structured markup. The problem resembles text mining but with additional web specific complexity. Pages contain navigation menus, ads, layout noise, scripts, and markup that may distract from the main semantic content. Good web content mining therefore often begins with content extraction or cleaning before features are generated.",
          "Typical tasks include topic discovery, document classification, information extraction, sentiment analysis, summarization, entity recognition, duplicate detection, and recommendation support. Search engines rely heavily on content mining to understand which pages are relevant to a query. E commerce sites use it to categorize products and align them with search intent. News platforms use it to cluster related stories and surface emerging themes. The main idea is that the page is not treated merely as a document to be stored but as a source of features, concepts, and signals."
        ]
      },
      {
        "heading": "Representation and Preprocessing for Web Content",
        "paragraphs": [
          "To mine web content effectively, the raw page must be converted into a usable representation. Text may be tokenized, normalized, stemmed, or lemmatized. Stop words may be removed, and terms may be weighted using frequency based schemes. HTML structure can also be informative. Content inside title tags, headings, anchor text, and metadata often carries more semantic weight than boilerplate page furniture. Multimedia pages may require captions, metadata, or visual descriptors. Thus preprocessing is not a fixed recipe but a representation design problem.",
          "Students should note that web content mining often sits between classical data mining and information retrieval. Retrieval techniques help identify relevant documents, while mining techniques discover patterns within or across those documents. This intersection is why the later text mining part of the syllabus fits naturally after web mining."
        ]
      },
      {
        "heading": "Applications and Limits",
        "paragraphs": [
          "Web content mining supports personalization, search ranking, topical organization, spam detection, sentiment discovery, price comparison, and domain specific extraction. A university portal may mine course pages for subject categories. A travel platform may mine hotel descriptions and reviews. A government site may mine policy documents for entity extraction and issue clustering. The usefulness is broad because most web value is mediated through content.",
          "Its main limitations include noise, ambiguity, multilingual variation, and rapid page churn. Content alone also misses user behavior and collective judgment carried through links or clicks. That is why web mining is usually taught as a family of related views. Content mining explains what is present, structure mining explains endorsement and connectivity, and usage mining explains how people actually move through the web space."
        ]
      },
      {
        "heading": "Worked Example and Revision View",
        "paragraphs": [
          "A news website offers a good example of web content mining. Thousands of articles are published over time, each with titles, tags, body text, author data, and embedded links. A content mining system may extract named entities, detect topics, identify duplicate or near duplicate stories, classify articles into sections, and summarize emerging themes. If the same platform only looked at clicks, it would know what readers visited but not what the pages were actually about. Content mining adds semantic understanding. This is why search, recommendation, and digital publishing systems rarely depend on usage signals alone.",
          "For examination purposes, a complete answer should begin with the threefold division of web mining and then zoom in on content mining as the branch concerned with page level information. After defining it, mention the main preprocessing issues: HTML parsing, noise removal, tokenization, and representation. Then discuss common tasks such as classification, extraction, summarization, and topic discovery. Ending with one or two applications makes the answer feel grounded rather than purely definitional.",
          "A common mistake is to describe web content mining as if it were identical to ordinary database querying. It is not. Content mining deals with unstructured or semi structured information and often requires natural language processing or information retrieval techniques before mining can even begin. Remembering that difference helps keep the topic conceptually clear.",
          "Students can also note that web content mining becomes stronger when combined with metadata and page structure. Titles, headings, anchor text, and markup often help the system distinguish core content from template noise. Mentioning that layered representation shows a better grasp of how web pages differ from plain text files."
        ]
      }
    ]
  },
  {
    "id": "web-structure-mining-pagerank-hits",
    "module": "module-5",
    "title": "Web Structure Mining: PageRank and CLEVER or HITS",
    "coverage": [
      "Web Structure Mining",
      "Page Rank",
      "Clever"
    ],
    "intro": "This topic explains how hyperlink structure can be mined as a graph and covers the core ideas behind PageRank and the CLEVER or HITS approach of hubs and authorities.",
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/3/3c/OperationsEN.jpg",
      "alt": "HITS algorithm operations image showing authority and hub updates",
      "caption": "Structure mining treats the web as a directed graph. In HITS style analysis, authority and hub scores reinforce one another across the link network.",
      "creditLabel": "Wikimedia Commons",
      "creditUrl": "https://commons.wikimedia.org/wiki/File:OperationsEN.jpg"
    },
    "references": [
      {
        "label": "The Anatomy of a Large-Scale Hypertextual Web Search Engine",
        "url": "https://research.google/pubs/the-anatomy-of-a-large-scale-hypertextual-web-search-engine/"
      },
      {
        "label": "Authoritative sources in a hyperlinked environment",
        "url": "https://cir.nii.ac.jp/crid/1363388845908649088"
      }
    ],
    "sections": [
      {
        "heading": "Why Link Structure Matters",
        "paragraphs": [
          "Web structure mining analyzes the hyperlink graph of the web or of a website. Each page can be seen as a node and each hyperlink as a directed edge. This graph contains information that is not present in the page text alone. A page heavily cited by other strong pages may deserve more attention than a page that merely repeats the same keywords. In this sense, links behave partly like recommendations, references, or votes, though with important caveats because links can also be noisy, strategic, or manipulative. Structure mining studies these patterns of linkage to estimate authority, discover communities, and improve ranking.",
          "This was a major breakthrough in web search because pure keyword matching struggled with relevance and spam. By analyzing how pages point to one another, search systems gained a second source of evidence that was difficult to fake at scale in the early web. The two most famous approaches in this area are PageRank and HITS, also connected in some contexts with the CLEVER project. Both treat the web as a graph, but they emphasize structure differently."
        ]
      },
      {
        "heading": "PageRank",
        "paragraphs": [
          "PageRank assigns importance scores to pages based on the structure of incoming links. The core intuition is recursive: a page is important if it is linked to by other important pages. The algorithm can be viewed through a random surfer model. Imagine a user randomly following hyperlinks, with occasional random jumps to another page. The stationary probability of landing on a page becomes its PageRank score. This approach smooths the effect of link traps and gives a global authority measure over the graph.",
          "In practical terms, not all links contribute equally. A link from a highly ranked page carries more authority than a link from an obscure page, and a page that spreads its links widely passes less weight through any single edge. PageRank was influential because it turned hyperlink structure into a mathematically grounded ranking signal and helped search systems distinguish authoritative pages from superficially keyword rich pages."
        ]
      },
      {
        "heading": "HITS and CLEVER",
        "paragraphs": [
          "HITS, often associated with the discovery of hubs and authorities, takes a more topic sensitive view. In this framework, good authorities are pages that many good hubs point to, and good hubs are pages that point to many good authorities. The two scores reinforce one another iteratively. A topical directory or curated resource page may be a strong hub. A definitive research page or official documentation page may be a strong authority. This dual scoring captures an important distinction that PageRank does not represent explicitly.",
          "The CLEVER line of work used these ideas to identify authoritative information sources in a hyperlink environment. Compared with global PageRank, HITS style methods are often discussed as query dependent or topic centered because the authority structure can depend on the subgraph induced by the user query. The conceptual takeaway is simple: PageRank measures global recursive importance, while HITS measures mutually reinforcing hub and authority roles within a topic specific graph."
        ]
      },
      {
        "heading": "Strengths, Limits, and Comparative View",
        "paragraphs": [
          "Structure mining methods are powerful because they capture collective linking behavior. They can improve ranking quality, reveal communities, identify central pages, and support authority estimation even when content signals alone are ambiguous. They are especially valuable in domains where citation or referral patterns are meaningful. However, structure is not pure truth. Links may be navigational rather than endorsing, some domains are sparsely linked, and adversarial link manipulation can distort ranking. This is why modern systems combine structure with content and usage signals rather than relying on structure alone.",
          "A concise comparison is useful for exams. PageRank gives a global importance score based on recursive incoming link prestige and random surfing intuition. HITS or CLEVER distinguishes hubs from authorities and is often more topic centered. Both belong to web structure mining because both extract knowledge from the link graph rather than the page text or usage logs."
        ]
      },
      {
        "heading": "Worked Example and Revision View",
        "paragraphs": [
          "Imagine a student searching for reliable notes on graph algorithms. Many pages may contain the phrase graph algorithms, but not all are equally trustworthy. A pure content system may retrieve lecture notes, forum posts, spam pages, and outdated materials together. Structure mining adds a second opinion. If respected university pages, established tutorials, and widely referenced resources all link to one specific page, that page gains authority beyond mere keyword presence. This is the intuition behind structure based ranking. Link patterns are treated as evidence about significance, not just as navigation mechanics.",
          "The PageRank and HITS distinction is worth practicing in sentence form. PageRank says an important page is linked by other important pages and models this recursively over the graph. HITS says a good authority is pointed to by good hubs, and a good hub points to good authorities. The first produces a global prestige signal. The second produces mutually reinforcing role signals, often discussed in relation to a topic specific subgraph. Writing that contrast clearly in an answer usually earns strong conceptual credit.",
          "Another common exam mistake is to treat links as if they always express approval. Real links can be navigational, promotional, critical, or accidental. That is why structure mining is powerful but not sufficient on its own. Modern web systems blend structure with content and usage evidence. Mentioning this limitation makes the answer more realistic and mature.",
          "If the syllabus uses the term CLEVER, students should connect it explicitly with the hub and authority viewpoint rather than leaving it as a detached name. That one extra clarification often makes the answer feel much more complete."
        ]
      }
    ]
  },
  {
    "id": "web-usage-mining",
    "module": "module-5",
    "title": "Web Usage Mining: Preprocessing, Data Structures, Pattern Discovery, and Pattern Analysis",
    "coverage": [
      "Web Usage Mining",
      "Preprocessing",
      "Data structures",
      "Pattern Discovery",
      "Pattern Analysis"
    ],
    "intro": "This topic explains how user interaction logs are prepared and mined to reveal navigation behavior, usage patterns, and actionable website intelligence.",
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/e/e4/CRISP_DM.png",
      "alt": "CRISP-DM diagram representing the staged nature of web usage mining",
      "caption": "Usage mining is especially preprocessing heavy because raw web logs are noisy and must be transformed into users, sessions, paths, and events before patterns make sense.",
      "creditLabel": "Wikimedia Commons",
      "creditUrl": "https://commons.wikimedia.org/wiki/File:CRISP_DM.png"
    },
    "references": [
      {
        "label": "Web usage mining survey summary",
        "url": "https://www.citedrive.com/en/discovery/web-usage-mining/"
      }
    ],
    "sections": [
      {
        "heading": "What Usage Mining Studies",
        "paragraphs": [
          "Web usage mining focuses on behavioral data generated by users as they interact with web resources. The raw inputs commonly include server logs, proxy logs, browser side events, clickstreams, session records, and transaction traces. The objective is to understand how users navigate, which paths are common, where they drop out, what sequences lead to conversion, and how the site can be improved. Because this is behavior focused, usage mining complements both content and structure mining. Content explains what pages contain. Structure explains how they link. Usage explains how people actually move through them.",
          "Typical applications include personalization, recommendation, site redesign, conversion optimization, caching strategy, fraud monitoring, and adaptive content delivery. An online store may mine session sequences to identify pages causing abandonment. An educational site may study learning paths. A news platform may mine return patterns and scroll behavior. In each case, value comes from turning raw event traces into understandable usage regularities."
        ]
      },
      {
        "heading": "Preprocessing for Usage Mining",
        "paragraphs": [
          "Preprocessing is often the hardest part of web usage mining. Raw logs contain image requests, bot traffic, repeated refreshes, incomplete sessions, and technical events that do not map neatly to human behavior. Analysts therefore clean the logs, remove irrelevant requests, identify unique users as far as possible, divide activity into sessions, reconstruct paths, and format the data into structures suitable for mining. User identification itself can be difficult because IP addresses may be shared and cookies may be absent or deleted. Session identification often depends on inactivity thresholds or explicit event boundaries.",
          "Without this preprocessing, discovered patterns can be meaningless. A path may reflect browser caching behavior rather than user intent. A spike in activity may reflect crawlers rather than real visitors. This is why usage mining is an excellent example of the general KDD lesson: preprocessing quality strongly shapes mining quality. In usage mining especially, the raw data is not yet the user behavior model. It is only a technical trace from which behavior must be inferred."
        ]
      },
      {
        "heading": "Data Structures and Pattern Discovery",
        "paragraphs": [
          "Once logs are cleaned and structured, several data representations become useful: sessions, transaction sets, path sequences, user profiles, access matrices, graphs, and summarized clickstream tables. The choice depends on the mining task. Session sequences support path analysis and sequential pattern mining. User by page matrices support clustering or collaborative filtering. Transition graphs support navigation analysis. Structured representations turn messy event streams into analyzable objects.",
          "Pattern discovery methods in web usage mining include association rules on visited pages, sequential pattern mining over navigation paths, clustering of users or sessions, classification of user intent or conversion likelihood, and dependency analysis among events. For example, one may discover that users who visit the pricing page, then the FAQ page, then the demo request form are highly likely to convert. Another pattern may show that certain content clusters lead to long retention sessions."
        ]
      },
      {
        "heading": "Pattern Analysis and Business Use",
        "paragraphs": [
          "Pattern analysis is the stage where discovered regularities are filtered, visualized, and interpreted for action. Not every frequent path is interesting. Some patterns simply reflect mandatory navigation design. Analysts therefore rank patterns by usefulness, novelty, business relevance, or conversion impact. Visualization tools, dashboards, and domain constraints are often used here. The goal is to turn pattern discovery into site improvement, targeting, personalization, or operational learning.",
          "A concise exam close is that web usage mining studies user behavior through logs, but the mining only becomes meaningful after careful preprocessing and structured representation. The major stages are preprocessing, creation of suitable data structures, pattern discovery, and pattern analysis. Remembering that stage sequence is often enough to organize a full answer clearly."
        ]
      },
      {
        "heading": "Worked Example and Revision View",
        "paragraphs": [
          "Consider an online shopping site where many users move from the home page to a product category page, then to shipping information, and then leave without purchasing. Raw server logs will not explain that pattern immediately because they include image requests, bot visits, and fragmented sessions. After preprocessing, however, the analyst may reconstruct meaningful user sessions and discover that exit rates spike after shipping cost exposure. At that point usage mining becomes actionable. The site can test new layout choices, clearer cost visibility, or alternative recommendation flows. This example shows why usage mining is so valuable for practical optimization.",
          "A strong answer should also mention data structures explicitly. Many students say preprocessing and then jump straight to pattern discovery. But the syllabus includes data structures for a reason. Logs are often transformed into sessions, path sequences, user page matrices, or transition graphs before mining begins. Without that intermediate representation, it is hard to apply clustering, association, sequential pattern mining, or classification meaningfully.",
          "The easiest way to remember the topic is as a four stage chain. Clean the logs. Build structured behavioral representations. Discover patterns. Interpret those patterns for decisions. If those four verbs are clearly explained and illustrated with one realistic website example, the answer becomes both technically correct and easy to follow.",
          "A final refinement is to note that usage mining can reveal both individual behavior and collective flow structure. Some patterns help personalize recommendations for one user, while others help redesign the site for everyone. This distinction gives the topic a stronger managerial interpretation."
        ]
      }
    ]
  },
  {
    "id": "text-mining-and-information-retrieval",
    "module": "module-5",
    "title": "Text Mining and Information Retrieval: Analysis, Measures, Methods, Indexing, and Query Processing",
    "coverage": [
      "Text Mining",
      "Text Data Analysis and information Retrieval",
      "Basic measures for Text retrieval",
      "Text Retrieval methods",
      "Text Indexing Techniques",
      "Query Processing Techniques"
    ],
    "intro": "This topic combines the core ideas of text mining and information retrieval and explains how text is represented, indexed, measured, retrieved, and processed in response to user queries.",
    "image": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Invertedindex.png",
      "alt": "Inverted index diagram showing terms mapped to document lists",
      "caption": "The inverted index is the workhorse of retrieval systems because it turns a large text collection into a structure where query terms can be matched quickly.",
      "creditLabel": "Wikimedia Commons",
      "creditUrl": "https://commons.wikimedia.org/wiki/File:Invertedindex.png"
    },
    "references": [
      {
        "label": "Introduction to Information Retrieval",
        "url": "https://nlp.stanford.edu/IR-book/"
      },
      {
        "label": "Inverted index image source",
        "url": "https://commons.wikimedia.org/wiki/File:Invertedindex.png"
      }
    ],
    "sections": [
      {
        "heading": "Text Mining and Information Retrieval Basics",
        "paragraphs": [
          "Text mining extracts useful patterns, concepts, or structures from collections of unstructured or semi structured text. Information retrieval focuses on finding documents relevant to a user query. The two fields overlap strongly but are not identical. Retrieval is query driven and centered on efficient access to relevant documents. Text mining is broader and may include classification, clustering, topic discovery, sentiment analysis, summarization, entity extraction, and trend analysis over corpora. In modern systems, retrieval often supplies the relevant documents and text mining performs deeper analysis over them.",
          "Text data analysis begins with the recognition that language is high dimensional, variable, and context dependent. The same concept may appear under different surface forms, while the same word may carry different meanings across contexts. Mining and retrieval systems therefore require preprocessing such as tokenization, stop word removal, stemming or lemmatization, term weighting, and representation choices such as bag of words or vector space models. These steps convert free text into structured features suitable for matching and analysis."
        ]
      },
      {
        "heading": "Basic Retrieval Measures and Retrieval Methods",
        "paragraphs": [
          "The basic measures for text retrieval include precision and recall, along with related evaluation measures such as F score. Precision asks how many retrieved documents are relevant. Recall asks how many relevant documents were retrieved. In ranked retrieval, additional concerns arise because the order of returned documents matters. Still, precision and recall remain foundational because they capture the relevance tradeoff at the heart of retrieval. A system that retrieves every document gets high recall but poor precision. A system that retrieves only a few safe documents may get high precision but low recall.",
          "Text retrieval methods range from Boolean retrieval to vector space retrieval and probabilistic retrieval. Boolean retrieval treats the query as a logical expression of terms and returns exact matches to the expression. It is simple but rigid. Vector space methods represent documents and queries as weighted term vectors and rank documents by similarity, often cosine similarity. Probabilistic methods estimate the likelihood that a document is relevant to a query based on term evidence and statistical modeling. Each method represents a different balance between interpretability, flexibility, and ranking quality."
        ]
      },
      {
        "heading": "Text Indexing Techniques",
        "paragraphs": [
          "Efficient retrieval depends on indexing because scanning every document for every query is impossible at scale. The central indexing structure is the inverted index, which maps each term to the list of documents in which it appears, often together with positions and frequency information. This reverses the natural document to term view and allows query terms to locate candidate documents quickly. Additional structures may support phrase search, positional matching, wildcard handling, or compression. Index construction is therefore a core systems problem in information retrieval.",
          "Good indexing also depends on normalization choices. Tokenization decides what counts as a term. Case folding, stemming, stop word handling, and document segmentation all influence the final index. A strong student answer should mention that indexing is not merely storage optimization. It shapes what the retrieval system can answer efficiently and accurately."
        ]
      },
      {
        "heading": "Query Processing Techniques",
        "paragraphs": [
          "Query processing techniques transform a user query into something the retrieval engine can execute well. This may include tokenizing the query, removing or retaining stop words depending on context, applying stemming, expanding terms, correcting spelling, rewriting the query, and ranking candidate documents. In Boolean retrieval, the system evaluates logical expressions over posting lists. In ranked retrieval, it computes similarity or probabilistic relevance scores. Phrase queries may require positional intersections. Multi term queries often involve efficient merging of postings and selective scoring strategies.",
          "From a system viewpoint, query processing is the bridge between user language and indexed representation. From an analytical viewpoint, it is where the system interprets intent under uncertainty. That is why modern retrieval combines indexing efficiency with linguistic and statistical processing. A clean exam conclusion is that text mining and retrieval rely on structured text representation, evaluation through relevance measures, efficient indexing through inverted files, and query processing that maps human requests onto those structures. Together they make large scale text collections searchable and analyzable."
        ]
      },
      {
        "heading": "Worked Example and Revision View",
        "paragraphs": [
          "Suppose a user types machine learning decision tree pruning into a retrieval system. The engine does not inspect every document one by one. It processes the query terms, consults the inverted index, retrieves candidate posting lists, and then evaluates which documents best match the combined evidence. If the system supports stemming, pruning and prune may be matched together. If the system supports phrase or proximity logic, documents where decision and tree occur near one another may score higher. If spelling correction or query expansion is active, related terms may be introduced. This example shows how query processing, indexing, and retrieval ranking work together as a pipeline rather than as isolated ideas.",
          "For exams, it helps to organize this wide topic into a stable order. Start with the distinction between text mining and information retrieval. Then explain representation and preprocessing. After that define precision and recall and mention retrieval models such as Boolean, vector space, and probabilistic retrieval. Next explain the inverted index as the core indexing structure. Finally describe query processing as the stage that interprets the user request and executes efficient retrieval. This ordering mirrors the logic of a real system and makes the answer easier to remember.",
          "A frequent mistake is to memorize one formula or one indexing structure but not explain how the pieces connect. Retrieval quality depends on measures, methods, indexing, and query processing together. Text mining adds deeper analytical tasks on top of the retrieved or indexed corpus. If students keep that systems view in mind, the entire text mining unit feels far more coherent.",
          "It is also helpful to say that retrieval is usually query driven and document focused, while text mining may be corpus driven and pattern focused even when no single user query is present. That sentence cleanly separates the two while still showing why they overlap so closely in practice."
        ]
      }
    ]
  }
]
;

