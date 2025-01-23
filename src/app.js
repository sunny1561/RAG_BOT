"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as tf from '@tensorflow/tfjs-node-gpu';
var js_client_rest_1 = require("@qdrant/js-client-rest");
var langgraph_1 = require("@langchain/langgraph");
var langgraph_2 = require("@langchain/langgraph");
var messages_1 = require("@langchain/core/messages");
var ollama_1 = require("@langchain/ollama");
var langgraph_3 = require("@langchain/langgraph");
var transformers_1 = require("@xenova/transformers");
// import { Ollama } from "ollama/browser";
// Create a feature-extraction pipeline
var model = await (0, transformers_1.pipeline)('feature-extraction', 'Xenova/bge-large-en-v1.5');
//npm install @qdrant/js-client-rest @langchain/langgraph @langchain/core @langchain/ollama @xenova/transformers
var model_name = "nemotron";
var llm = new ollama_1.ChatOllama({
    model: model_name,
    temperature: 0,
});
// const ollama = new Ollama({ host: 'http://127.0.0.1:11434' })
// const response = await ollama.chat({
//   model: 'llama3.1',
//   messages: [{ role: 'user', content: 'Why is the sky blue?' }],
// })
// // Device fallback for TensorFlow.js
// const devices = tf.ENV.get('WEBGL_PACK') ? 'gpu' : 'cpu';
// Initialize Qdrant client
var client = new js_client_rest_1.QdrantClient({ url: "http://10.10.2.107:6333" });
// // Load Sentence Transformer model
// const model = new SentenceTransformer('BAAI/bge-large-en-v1.5', devices);
// Graph State Definition
var GraphState = langgraph_3.Annotation.Root({
    question: (0, langgraph_3.Annotation)({
        reducer: function (x, y) { var _a; return (_a = y !== null && y !== void 0 ? y : x) !== null && _a !== void 0 ? _a : ""; },
    }),
    generation: (0, langgraph_3.Annotation)({
        reducer: function (x, y) { var _a; return (_a = y !== null && y !== void 0 ? y : x) !== null && _a !== void 0 ? _a : ""; },
    }),
    rel_image: (0, langgraph_3.Annotation)({
        reducer: function (x, y) { var _a; return (_a = y !== null && y !== void 0 ? y : x) !== null && _a !== void 0 ? _a : ""; },
    }),
    chat_history: (0, langgraph_3.Annotation)({
        reducer: function (x, y) { var _a; return (_a = y !== null && y !== void 0 ? y : x) !== null && _a !== void 0 ? _a : ""; },
    }),
    web_search: (0, langgraph_3.Annotation)({
        reducer: function (x, y) { var _a; return (_a = y !== null && y !== void 0 ? y : x) !== null && _a !== void 0 ? _a : "yes"; },
    }),
    documents: (0, langgraph_3.Annotation)({
        reducer: function (x, y) { var _a; return (_a = y !== null && y !== void 0 ? y : x) !== null && _a !== void 0 ? _a : []; },
    }),
});
function Grade(document, question) {
    return __awaiter(this, void 0, void 0, function () {
        var gradeSystem, messages, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gradeSystem = "\n    You are a grader assessing the strict relevance of a retrieved document to a user question.\n    To be graded as relevant, the document must contain explicit keyword(s) or a clear semantic connection directly related to the question.\n    The context must provide sufficient and direct or indirect information to answer the question without ambiguity or inference.\n    If the document does not meet these criteria, it should be graded as 'no'.\n    Provide a binary score 'yes' or 'no' to indicate whether the document is strictly relevant to the question.\n  ";
                    messages = [
                        new messages_1.SystemMessage(gradeSystem),
                        new messages_1.HumanMessage("Context:\n\n".concat(document, "\n\nQuestion: ").concat(question))
                    ];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, llm.invoke(messages)];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.content];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error invoking LLM:", error_1);
                    throw new Error("Failed to retrieve LLM response.");
                case 4: return [2 /*return*/];
            }
        });
    });
}
function rewriteQuery(query) {
    return __awaiter(this, void 0, void 0, function () {
        var systemPrompt, messages, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    systemPrompt = "\n    You are a question re-writer specializing in telecommunications. \n    Take an input query related to telecom and rephrase it into a clearer, more understandable version.\n    Ensure that the underlying meaning, technical context, and intent of the query remain intact.\n    Simplify the language and structure without altering the core details or user understanding, specifically within the telecom domain.\n  ";
                    messages = [
                        new messages_1.SystemMessage(systemPrompt),
                        new messages_1.HumanMessage("Query: ".concat(query))
                    ];
                    return [4 /*yield*/, llm.invoke(messages)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.content];
            }
        });
    });
}
function searchDocuments(query_1) {
    return __awaiter(this, arguments, void 0, function (query, collectionName, limit) {
        var queryEmbedding, results;
        if (collectionName === void 0) { collectionName = "3gpp_specs_test"; }
        if (limit === void 0) { limit = 3; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model(query, { pooling: 'mean', normalize: true })];
                case 1:
                    queryEmbedding = _a.sent();
                    return [4 /*yield*/, client.search(collectionName, {
                            vector: Array.from(queryEmbedding.tolist()),
                            limit: limit,
                        })];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
function relevantImages(query) {
    return __awaiter(this, void 0, void 0, function () {
        var results, top3Context, relImages, _i, results_1, result, content, imagePath;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, searchDocuments(query, "Images_collection_All")];
                case 1:
                    results = _c.sent();
                    if (!results.length) {
                        return [2 /*return*/, { context: "No results found for the question.", images: [] }];
                    }
                    top3Context = "";
                    relImages = [];
                    for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                        result = results_1[_i];
                        try {
                            if (result.score > 0.65) {
                                content = ((_a = result.payload) === null || _a === void 0 ? void 0 : _a.context) || "Content not available.";
                                imagePath = ((_b = result.payload) === null || _b === void 0 ? void 0 : _b.Imagepath) || "Unknown Source";
                                relImages.push(imagePath);
                                top3Context += "Context: ".concat(content, "\n\n");
                            }
                        }
                        catch (error) {
                            console.error("Error during processing:", error);
                        }
                    }
                    return [2 /*return*/, { context: top3Context, images: relImages }];
            }
        });
    });
}
function retrieve(state) {
    return __awaiter(this, void 0, void 0, function () {
        var question, documents, relevantDocs, _a, imageContext, relImages, _i, documents_1, result, retrievedDoc, image;
        var _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    console.log("---RETRIEVE---");
                    question = state.question;
                    return [4 /*yield*/, searchDocuments(question)];
                case 1:
                    documents = _h.sent();
                    relevantDocs = [];
                    return [4 /*yield*/, relevantImages(question)];
                case 2:
                    _a = _h.sent(), imageContext = _a.context, relImages = _a.images;
                    for (_i = 0, documents_1 = documents; _i < documents_1.length; _i++) {
                        result = documents_1[_i];
                        if (result.score > 0.65) {
                            retrievedDoc = "\n        Use this context for Answering the Question: ".concat(((_b = result.payload) === null || _b === void 0 ? void 0 : _b.content) || "Unknown Content", "\n        Section taken from Document - ").concat(((_c = result.payload) === null || _c === void 0 ? void 0 : _c.source) || "Unknown Source", "\n        Document Title: ").concat(((_d = result.payload) === null || _d === void 0 ? void 0 : _d.document_title) || "Unknown Document Title", "\n        Section Title: ").concat(((_e = result.payload) === null || _e === void 0 ? void 0 : _e.section_title) || "Unknown Section Title", "\n        Series Subject: ").concat(((_f = result.payload) === null || _f === void 0 ? void 0 : _f.series_subject) || "Unknown Series Subject", "\n        Working Group: ").concat(((_g = result.payload) === null || _g === void 0 ? void 0 : _g.working_group) || "Unknown Working Group", "\n      ");
                            relevantDocs.push(retrievedDoc.trim());
                        }
                    }
                    image = null;
                    if (relImages.length > 0) {
                        relevantDocs.push(imageContext);
                        image = relImages[0];
                    }
                    return [2 /*return*/, {
                            documents: relevantDocs,
                            question: question,
                            rel_image: image
                        }];
            }
        });
    });
}
function rephrasedQuery(state) {
    return __awaiter(this, void 0, void 0, function () {
        var query, history, systemPrompt, messages, response, content, match, reformulatedQuery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Running Contextualize query node!");
                    query = state.question;
                    history = state.chat_history || "";
                    systemPrompt = "\n    Given a chat history and the latest user question, which might reference prior context from the chat history,\n    reformulate the question into a standalone query that can be understood independently, without relying on the chat history.\n    Do NOT provide an answer to the question; only return the reformulated query, or leave it as is if no changes are required.\n  ";
                    messages = [
                        new messages_1.SystemMessage(systemPrompt),
                        new messages_1.HumanMessage("".concat(history, "\n").concat(query))
                    ];
                    return [4 /*yield*/, llm.invoke(messages)];
                case 1:
                    response = _a.sent();
                    try {
                        content = typeof response.content === 'string' ? response.content : String(response.content);
                        console.log("Response Content:", content);
                        match = content.match(/"reformulated_query":\s*"([^"]*)"/);
                        console.log("Match Result:", match);
                        reformulatedQuery = (match === null || match === void 0 ? void 0 : match[1]) || query;
                        return [2 /*return*/, {
                                question: reformulatedQuery,
                                chat_history: "Previous query: ".concat(reformulatedQuery)
                            }];
                    }
                    catch (error) {
                        console.error("Error processing reformulated query:", error);
                        throw new Error("Failed to extract reformulated query.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function gradeDocuments(state) {
    return __awaiter(this, void 0, void 0, function () {
        var question, documents, filteredDocs, webSearch, maxAttempts, _loop_1, _i, documents_2, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("---CHECK DOCUMENT RELEVANCE TO QUESTION---");
                    question = state.question;
                    documents = state.documents;
                    filteredDocs = [];
                    webSearch = "yes";
                    maxAttempts = 3;
                    _loop_1 = function (doc) {
                        var grading, attemptsLeft, score, isRelevant;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    grading = new Set();
                                    attemptsLeft = maxAttempts;
                                    _b.label = 1;
                                case 1:
                                    if (!(attemptsLeft > 0)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, Grade(doc, question)];
                                case 2:
                                    score = _b.sent();
                                    grading.add(score.toLowerCase());
                                    attemptsLeft--;
                                    console.log("Grading left is ".concat(attemptsLeft, " times_____"));
                                    return [3 /*break*/, 1];
                                case 3:
                                    isRelevant = false;
                                    Array.from(grading).forEach(function (grade, index) {
                                        console.log("Score got at iteration ".concat(index, " is: ").concat(grade));
                                        if (grade.includes("yes")) {
                                            isRelevant = true;
                                        }
                                    });
                                    if (isRelevant) {
                                        console.log("---GRADE: DOCUMENT RELEVANT---");
                                        filteredDocs.push(doc);
                                        webSearch = "no";
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, documents_2 = documents;
                    _a.label = 1;
                case 1:
                    if (!(_i < documents_2.length)) return [3 /*break*/, 4];
                    doc = documents_2[_i];
                    return [5 /*yield**/, _loop_1(doc)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, {
                        documents: filteredDocs,
                        question: question,
                        web_search: webSearch
                    }];
            }
        });
    });
}
function generate(state) {
    return __awaiter(this, void 0, void 0, function () {
        var question, documents, systemPrompt, messages, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("---GENERATE---");
                    question = state.question;
                    documents = state.documents;
                    systemPrompt = "\n    You are an AI assistant specializing in 3GPP telecommunications standards...\n    [Your existing system prompt here]\n  ";
                    messages = [
                        new messages_1.SystemMessage(systemPrompt),
                        new messages_1.HumanMessage("context: ".concat(documents, "\n\nquestion:\n").concat(question))
                    ];
                    return [4 /*yield*/, llm.invoke(messages)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, {
                            chat_history: state.chat_history + "question is ".concat(question, " \n Answer for it is : ").concat(response, " \n\n"),
                            documents: documents,
                            question: question,
                            generation: response.content,
                            rel_image: state.rel_image,
                        }];
            }
        });
    });
}
function transformQuery(state) {
    return __awaiter(this, void 0, void 0, function () {
        var question, documents, betterQuestion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("---TRANSFORM QUERY---");
                    question = state.question;
                    documents = state.documents;
                    return [4 /*yield*/, rewriteQuery(question)];
                case 1:
                    betterQuestion = _a.sent();
                    return [2 /*return*/, {
                            documents: documents,
                            question: betterQuestion
                        }];
            }
        });
    });
}
function webSearch(state) {
    return __awaiter(this, void 0, void 0, function () {
        var question, documents, systemPrompt, messages, response, llmResults, newDocuments, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("---WEB SEARCH---");
                    question = state.question;
                    documents = state.documents;
                    systemPrompt = "\n         \"\"\"You are a highly knowledgeable telecom domain expert specializing in network troubleshooting, quality assurance, and telecommunications standards. Your expertise includes key telecom concepts such as protocols, network functions, interfaces, specifications, performance metrics, and troubleshooting processes for 3G, 4G, 5G, and emerging telecom technologies.\n\nYour role is to assist users by:\n1. Providing accurate and practical answers to queries about network issues, standards, and quality assurance.\n2. Referring to relevant 3GPP or other telecom-related documents, their titles, and context when applicable, quoting specific paragraphs to support your response.\n\n### Response Rules:\n1. **Confident Answers Only:** Respond only if you are confident and have sufficient knowledge to provide a clear, correct answer.\n2. **Reference Supporting Documentation:**\n   - Mention relevant document numbers (e.g., TS 23.501, TS 38.300), titles, and summaries.\n   - Quote specific paragraphs or sections if they directly address the query.\n3. **No Guessing:** If you are unsure or lack sufficient information, respond only with \"NO.\"\n4. **Straightforward Responses:** Provide concise and professional answers without unnecessary elaboration.\n\n\n\n### Additional Notes:\nWhen referring to documents:\n- Always mention the document number, title, and a brief summary of its context.\n- If quoting a section or paragraph, ensure accuracy by explicitly referencing the section number or title.\n- Respond concisely and only include relevant details.\n\nBegin by analyzing the user's query. Provide an accurate response with supporting references if possible, or respond with \"NO\" if unsure.\n\n\"\"\"\n    ";
                    messages = [
                        new messages_1.SystemMessage(systemPrompt),
                        new messages_1.HumanMessage("question: ".concat(question))
                    ];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, llm.invoke(messages)];
                case 2:
                    response = _a.sent();
                    llmResults = response.content;
                    newDocuments = __spreadArray(__spreadArray([], documents, true), [llmResults], false);
                    return [2 /*return*/, {
                            documents: newDocuments,
                            question: question
                        }];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error during LLM invocation:", error_2);
                    throw new Error("Failed to perform web search.");
                case 4: return [2 /*return*/];
            }
        });
    });
}
function decideToGenerate(state) {
    console.log("---ASSESS GRADED DOCUMENTS---");
    var webSearch = state.web_search;
    if (webSearch === "yes") {
        console.log("---DECISION: TRANSFORM QUERY---");
        return "transformQuery";
    }
    else {
        console.log("---DECISION: GENERATE---");
        return "generate";
    }
}
// Workflow definition
var workflow = new langgraph_2.StateGraph(GraphState)
    .addNode("Contextualize_query", rephrasedQuery)
    .addNode("retrieve", retrieve)
    .addNode("gradeDocuments", gradeDocuments)
    .addNode("generate", generate)
    .addNode("transformQuery", transformQuery)
    .addNode("webSearchNode", webSearch);
// workflow.setEntryPoint("Contextualize_query");
workflow.addEdge(langgraph_2.START, "Contextualize_query");
workflow.addEdge("Contextualize_query", "retrieve");
workflow.addEdge("retrieve", "gradeDocuments");
workflow.addConditionalEdges("gradeDocuments", decideToGenerate, {
    transformQuery: "transformQuery",
    generate: "generate",
});
workflow.addEdge("transformQuery", "webSearchNode");
workflow.addEdge("webSearchNode", "generate");
workflow.addEdge("generate", langgraph_2.END);
var memory = new langgraph_1.MemorySaver();
var app = workflow.compile({ checkpointer: memory });
// async function runGraph(
//     query: string,
//     id: string
//   ): Promise<[typeof GraphState.State]> {
//     const config = {
//       configurable: { thread_id: id }
//     };
//     try {
//       const memory_state = await app.getState(config);
//       console.log(`State: ${JSON.stringify(memory_state)}`);
//       const result = await app.invoke(
//         { question: query },
//         config
//       );
//       return [result];
//     } catch (error) {
//       console.error("Error in runGraph function:", error);
//       throw new Error("Failed to execute runGraph.");
//     }
//   }
// // Error handling
// process.on('unhandledRejection', (error) => {
//   console.error('Unhandled promise rejection:', error);
// });
// export { runGraph, GraphState };
function runGraph(query, id) {
    return __awaiter(this, void 0, void 0, function () {
        var config, memory_state, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {
                        configurable: { thread_id: id }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, app.getState(config)];
                case 2:
                    memory_state = _a.sent();
                    console.log("State: ".concat(JSON.stringify(memory_state)));
                    return [4 /*yield*/, app.invoke({ question: query }, config)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, [result]];
                case 4:
                    error_3 = _a.sent();
                    console.error("Error in runGraph function:", error_3);
                    throw new Error("Failed to execute runGraph.");
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Error handling
process.on('unhandledRejection', function (error) {
    console.error('Unhandled promise rejection:', error);
});
// Corrected function call (await)
var q1 = "when call drop occurs?";
runGraph(q1, "1").then(function (result) {
    console.log(result);
}).catch(function (error) {
    console.error("Error calling runGraph:", error);
});
