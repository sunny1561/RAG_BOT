





//final one (date 21/1/25)

// import * as os from 'os';
// // import * as ProgressBar from 'cli-progress';
// import * as random from 'random';
// // import * as tf from '@tensorflow/tfjs-node-gpu';
// import { QdrantClient } from '@qdrant/js-client-rest';
// import { MemorySaver } from "@langchain/langgraph";
// import { START, StateGraph, END } from "@langchain/langgraph";
// import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
// import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
// import { ChatOllama } from "@langchain/ollama";
// import { Annotation } from "@langchain/langgraph";
// import { DocumentInterface } from "@langchain/core/documents";
// import { pipeline } from '@xenova/transformers';
// import express from "express";
// import cors from 'cors';

// // function generateUniqueId(existingIds: Set<number>): number {
// //   let randomId: number;
// //   do {
// //     randomId = Math.floor(Math.random() * 1000);
// //   } while (existingIds.has(randomId));
// //   existingIds.add(randomId);
// //   return randomId;
// // }

// const existingIds = new Set<number>();
// const app_1 = express();
// app_1.use(express.json());
// app_1.use(cors({
//   origin: "*"
// }))

// app_1.post("/api/query1",async (req: express.Request, res: express.Response) => {
  
//   const {query}=req.body;
  
//   const ids="1";
//   const result = await runGraph(query, ids);
//   res.status(201).json({message:"hello world",result});
//   
// });
// app_1.listen(4001, () => {
//   console.log("Server is running on port 4001");
// });
// const client=new QdrantClient({url:"http://localhost:6333"})
// const model_name = "llama3.2:3b";
// const llm = new ChatOllama({
//   model: model_name,
//   temperature: 0,
// });
// const model = await pipeline('feature-extraction', 'Xenova/bge-large-en-v1.5');
// async function searchDocuments(query: string, collectionName: string = "3GPP_DATA", limit: number = 3): Promise<any[]> {
//   try {
//     // console.time("ExecutionTime");
//     // Encode the query to get an embedding
//     const queryEmbedding = await model(query, { pooling: 'mean', normalize: true });
    
//     // Convert embedding to a flat array
//     const queryVector = queryEmbedding.tolist()[0];
    
//     // Ensure embedding length matches the expected dimension
//     if (queryVector.length !== 1024) {
//       throw new Error(`Embedding size mismatch: Expected 1024, got ${queryVector.length}`);
//     }

//     // Perform search in Qdrant
//     const results = await client.search(collectionName, {
//       vector: queryVector,
//       limit,
//     });
//     // console.log("time to run the searchDocuments function")
//     // console.timeEnd("ExecutionTime");
//     return results;
//   } catch (error) {
//     console.error("Error in search:", error);
//     throw error;
//   }
// }
// const GraphState = Annotation.Root({
//   question: Annotation<string>({
//     reducer: (x, y) => y ?? x ?? "",
//   }),
//   generation: Annotation<string>({
//     reducer: (x, y) => y ?? x ?? "",
//   }),
//   rel_image: Annotation<string>({
//     reducer: (x, y) => y ?? x ?? "",
//   }),
//   chat_history: Annotation<string>({
//     reducer: (x, y) => y ?? x ?? "",
//   }),
//   web_search: Annotation<string>({
//     reducer: (x, y) => y ?? x ?? "yes",
//   }),
//   documents: Annotation<string[]>({
//     reducer: (x, y) => y ?? x ?? [],
//   }),
//   rel_docs: Annotation<string[]>({
//     reducer: (x, y) => y ?? x ?? [],
//   }),
// });

// class RetrievalEvaluator {
//   binary_score: string;

//   constructor(binary_score: string) {
//       this.binary_score = binary_score;
//   }
// }
// async function Grade(document: string, question: string): Promise<string> {
//   // console.time("ExecutionTime");
// const gradeSystem = `
// You are a grader assessing the strict relevance of a document to a user question.
// Given a question, does the following document have exact information to answer the question? Answer yes or no only

// Example Input:
// Context: The signaling procedures in LTE involve procedures such as attach, detach, and handover between cells.
// Question: What signaling procedures are used in LTE?

// Example Output:
// yes

// Example Input:
// Context: The mobile network supports high-speed data services across various frequencies.
// Question: What are the latest advancements in LTE technology?

// Example Output:
// no

// Return strictly "yes" or "no".
// `;

// const inputText = `
// ${gradeSystem}
// Context:
// ${document}
// Question: ${question}
// `;

// const llm = new ChatOllama({ model: "llama3.2:3b", temperature: 0 });

// try {
//     // Invoke the LLM with the input text and get the response
//     const aiResponse = await llm.invoke(inputText);

//     // Parse the LLM response into the RetrievalEvaluator class
//     const evaluation = new RetrievalEvaluator(aiResponse.content.toString().trim());
//     // console.log(`the time take to run Grade function is`)
//     // console.timeEnd("ExecutionTime");
//     // Return the binary score ('yes' or 'no')
//     return evaluation.binary_score;
// } catch (error) {
//     console.error('Error: ', error);
//     return "Error: Could not classify the response. Check LLM output.";
// }
// }

// async function relevantImages(
//   query: string
// ): Promise<{ context: string; images: string[] }> {
//   // console.time("ExecutionTime");
//   const results = await searchDocuments(query, "Images_collection_All");
//   if (!results.length) {
//     return { context: "No results found for the question.", images: [] };
//   }

//   let top3Context = "";
//   const relImages: string[] = [];

//   for (const result of results) {
//     try {
//       if (result.score > 0.65) {
//         const content = result.payload?.context || "Content not available.";
//         const imagePath = result.payload?.Imagepath || "Unknown Source";
//         relImages.push(imagePath);
//         top3Context += `Context: ${content}\n\n`;
//       }
//     } catch (error) {
//       console.error("Error during processing:", error);
//     }
//   }
//   // console.log("tine to run Relevant image")
//   // console.timeEnd("ExecutionTime");
//   return { context: top3Context, images: relImages };
// }

// // async function retrieve(
// //   state: typeof GraphState.State
// // ): Promise<Partial<typeof GraphState.State>> {
// //   console.log("---RETRIEVE---");
// //   const question = state.question;
// //   const documents = await searchDocuments(question);
// //   const relevantDocs: string[] = [];
// //   const { context: imageContext, images: relImages } = await relevantImages(question);

// //   for (const result of documents) {
// //     if (result.score > 0.65) {
// //       const retrievedDoc = `
// //         Use this context for Answering the Question: ${result.payload?.content || "Unknown Content"}
// //         Section taken from Document - ${result.payload?.source || "Unknown Source"}
// //         Document Title: ${result.payload?.document_title || "Unknown Document Title"}
// //         Section Title: ${result.payload?.section_title || "Unknown Section Title"}
// //         Series Subject: ${result.payload?.series_subject || "Unknown Series Subject"}
// //         Working Group: ${result.payload?.working_group || "Unknown Working Group"}
// //       `;
// //       relevantDocs.push(retrievedDoc.trim());
// //     }
// //   }

// //   let image: string | null = null;
// //   if (relImages.length > 0) {
// //     relevantDocs.push(imageContext);
// //     image = relImages[0];
// //   }

// //   return {
// //     documents: relevantDocs,
// //     question: question,
// //     rel_image: image as string
// //   };
// // }
// async function retrieve(
//   state: typeof GraphState.State
// ): Promise<Partial<typeof GraphState.State>> {
//   console.log("---RETRIEVE---");
//   // console.time("ExecutionTime");
//   const question = state.question;

//   // Run searches concurrently
//   const [documentResults, imageResults] = await Promise.all([
//     searchDocuments(question),
//     relevantImages(question),
//   ]);

//   const relevantDocs: string[] = [];
//   const { context: imageContext, images: relImages } = imageResults;

//   for (const result of documentResults) {
//     if (result.score > 0.65) {
//       const retrievedDoc = `
//         Use this context for Answering the Question: ${result.payload?.content || "Unknown Content"}
//         Section taken from Document - ${result.payload?.source || "Unknown Source"}
//         Document Title: ${result.payload?.document_title || "Unknown Document Title"}
//         Section Title: ${result.payload?.section_title || "Unknown Section Title"}
//         Series Subject: ${result.payload?.series_subject || "Unknown Series Subject"}
//         Working Group: ${result.payload?.working_group || "Unknown Working Group"}
//       `;
//       relevantDocs.push(retrievedDoc.trim());
//     }
//   }

//   let image: string | null = null;
//   if (relImages.length > 0) {
//     relevantDocs.push(imageContext);
//     image = relImages[0];
//   }
//    console.log("")
//   //  console.log(`the time take to run retrieve function is`)
//   //  console.timeEnd("ExecutionTime");
//   return {
//     documents: relevantDocs,
//     question,
//     rel_image: image as string,
//   };
// }

// async function rephrasedQuery(
//   state: typeof GraphState.State
// ): Promise<Partial<typeof GraphState.State>> {
//   console.log("Running Contextualize query node!");
//   console.time("ExecutionTime")
//   // console.time("ExecutionTime");
//   const query = state.question;
//   const history = state.chat_history || "";

//   const systemPrompt = `
// "Given a chat history and the latest user question, which might reference prior context from the chat history,"
// "reformulate the question into a standalone query that can be understood independently, without relying on the chat history."
// "Do NOT provide an answer to the question; only return the reformulated query, or leave it as is if no changes are required."

//   ### OUTPUT FORMAT SHOULD ONLY THE BELOW ONE

//   "reformulated_query": "<question>"
//   `;
//   // const systemPrompt = `
//   // "You are an AI assistant specializing in 3GPP telecom standards.  
//   // Given a chat history and the latest user question, return a standalone, precise question about 3GPP standards.  
//   // Use accurate 3GPP terminology. If the question is already clear, return it as is. Do NOT answer the question.
  
//   // ### Output Format:
//   // "reformulated_query": "<question>"
//   // `;
  
//   const messages = [
//     new SystemMessage(systemPrompt),
//     new HumanMessage(`${history}\n${query}`)
//   ];

//   const response = await llm.invoke(messages);
//   try {
//     const content = typeof response.content === 'string' ? response.content : String(response.content);
//     console.log("Response Content:", content);
    
//     // const match = content.match(/\*\*reformulated_query:\*\*\s*"([^"]*)"/);
//     console.log("Match Result:", content.split(":")[1]);
//     const question = content.split(":")[1]?.trim().replace(/['"]/g, '') || query;
//     // const reformulatedQuery = match?.[1] || query;
//     console.log(question);
//      console.log(`the time take to run rephrased function is`)
//     console.timeEnd("ExecutionTime");
//     return {
//         question: question,
//         chat_history: `Previous query: ${question}`
//       };
//   } catch (error) {
//     console.error("Error processing reformulated query:", error);
//     throw new Error("Failed to extract reformulated query.");
//   }

  
// }

// // async function gradeDocuments(
// //   state: typeof GraphState.State
// // ): Promise<Partial<typeof GraphState.State>> {
// //   console.log("---CHECK DOCUMENT RELEVANCE TO QUESTION---");
// //   console.time("ExecutionTime");
// //   const question = state.question;
// //   const documents = state.documents;
// //   const filteredDocs: string[] = [];
// //   let webSearch = "yes";
// //   for (const doc of documents) {
   
// //     const score = await Grade(doc, question);

// //     if (score.toLowerCase()=="yes") {
// //       console.log("---GRADE: DOCUMENT RELEVANT---");
// //       filteredDocs.push(doc);
// //       webSearch = "no";
// //     }
// //     else continue;
// //   }
// //   console.log('length of grader is ')
// //   console.log(filteredDocs.length)
// //    console.timeEnd("ExecutionTime");
// //   return {
// //     documents: filteredDocs,
// //     question: question,
// //     web_search: webSearch
// //   };
//  //}
// async function gradeDocuments(
//   state: typeof GraphState.State
// ): Promise<Partial<typeof GraphState.State>> {
//   console.log("---CHECK DOCUMENT RELEVANCE TO QUESTION---");
//   console.time("ExecutionTime");
//   const question = state.question;
//   const documents = state.documents || [];
//   let webSearch = "yes";
//   // Concurrently grade documents
//   const gradedDocs = await Promise.all(
//     documents.map(async (doc) => ({
//       doc,
//       score: await Grade(doc, question),
//     }))
//   );

//   // Filter relevant documents
//   const filteredDocs = gradedDocs
//     .filter(({ score }) => score.toLowerCase() === "yes")
//     .map(({ doc }) => doc);

//   if (filteredDocs.length > 0) webSearch = "no";
//   // console.log(`the time take to run gradedocumnets function is`)
//   console.timeEnd("ExecutionTime");
//   console.log('length of grader is ')
//   console.log(filteredDocs.length)
//   return {
//     documents: filteredDocs,
//     question,
//     web_search: webSearch,
//   };
// }

// async function generate(
//   state: typeof GraphState.State
// ): Promise<Partial<typeof GraphState.State>> {
//   console.log("---GENERATE---");
  

// console.time("ExecutionTime")

//   const question = state.question;
//   const documents = state.documents;
//   console.log(documents.length);
//   // const systemPrompt = `
//   // "You are an AI assistant specializing in 3GPP telecom standards. Provide accurate, concise answers based strictly on the provided context. If metadata is available, include it in the response.  
  
//   // ### Guidelines:
//   // 1. **Answer:**  
//   //    - Respond directly based on the context.  
//   //    - If insufficient context is provided, state: *"Insufficient information to answer."*  
  
//   // 2. **Metadata:**  
//   //    - Include metadata fields if present:  
//   //      - **Document Number**: [Value]  
//   //      - **Section Title**: [Value]  
//   //      - **Document Title**: [Value]  
//   //      - **Series Subject**: [Value]  
//   //      - **Working Group**: [Value]  
  
//   // 3. **Strict Adherence:**  
//   //    - Use only the provided context. Do not infer or add external information.  
  
//   // 4. **Style:**  
//   //    - Be professional, concise, and avoid unnecessary details.
//   // `;
// const systemPrompt = `
//   You are a telecom chatbot assistant. Your job is to answer user queries related to telecommunications clearly, concisely, and accurately. Follow these instructions:
  
//   1. Provide direct and structured answers based on the context provided.
//   2. Avoid unnecessary details or unrelated information.
//   3. Use proper telecom terminology, explaining terms only when asked.
//   4. Organize responses in bullet points or short paragraphs for readability.
//   5. If the context is insufficient to answer, state this directly without making assumptions.
  
//   Example Responses:
//   - User Query: "What is the role of RRC in 5G?"
//     Response:
//       - The RRC (Radio Resource Control) in 5G manages signaling between the UE (User Equipment) and the gNB (base station).
//       - It performs functions like:
//         1. Connection setup and release.
//         2. Mobility management.
//         3. Security configuration.
//         4. QoS (Quality of Service) handling.
  
//   - User Query: "Difference between FDD and TDD?"
//     Response:
//       - **FDD (Frequency Division Duplex)**:
//         - Separate frequency bands for uplink and downlink.
//         - Allows simultaneous transmission and reception.
//       - **TDD (Time Division Duplex)**:
//         - Same frequency band for uplink and downlink.
//         - Alternates between uplink and downlink in time slots.
  
//   Stay focused and always provide structured, concise answers.
//   `;
  
// //   const systemPrompt = `You are an AI assistant specializing in 3GPP telecommunications standards. Your primary task is to provide precise and authoritative answers to user queries, using only the provided context. Your responses must be structured, concise, and include all relevant metadata fields available in the context.

// // ### Response Guidelines:
// // 1. **Answer:**  
// //    - Provide a **clear and direct answer** strictly based on the provided context.  
// //    - If the context does not contain sufficient information to answer the query, clearly state: *"The query cannot be answered due to insufficient information in the provided context."*  
// //    - Do not include additional information or assumptions unless explicitly stated in the context.  

// // 2. **Source Metadata:**  
// //    - Always include all available metadata fields from the context in your response, formatted in a structured manner.  
// //    - Include the following metadata fields, if present:  
// //      - **Relevant Document Number**: [Value]  
// //      - **Relevant Section Title**: [Value]  
// //      - **Relevant Document Title**: [Value]  
// //      - **Relevant Series Subject**: [Value]  
// //      - **Relevant Working Group**: [Value]  
// //    - If a specific field is unavailable, omit it without rejecting or acknowledging its absence.  
// //    - Metadata provided in the context must never be excluded or rejected. If metadata is present, ensure it is incorporated into the response.  

// // 3. **Strict Adherence to Source Data:**  
// //    - Responses must strictly adhere to the provided context and include all relevant metadata.  
// //    - Do not reference or infer backend processes, nor discuss access to the context.  

// // 4. **Professional and Authoritative Style:**  
// //    - Ensure responses are professional, authoritative, and concise.  
// //    - Avoid disclaimers or references to limitations, except to indicate insufficient information when the context does not permit answering the query.

// // By following these guidelines, provide clear, context-compliant responses that include all available metadata to ensure accuracy and completeness.
// //   `;
// //     const systemPrompt=`You are an AI assistant specializing in 3GPP standards. Provide clear, concise answers based strictly on the provided context.

// // ### Guidelines:
// // 1. **Answer:**  
// //    - Respond directly based on the context.  
// //    - If the context lacks sufficient information, state: *"Insufficient information to answer the query."*

// // 2. **Include Metadata:**  
// //    - Use all available metadata fields:  
// //      - **Document Number**: [Value if available]  
// //      - **Section Title**: [Value if available]  
// //      - **Document Title**: [Value if available]  
// //      - **Series Subject**: [Value if available]  
// //      - **Working Group**: [Value if available]  

// // 3. **No Assumptions:**  
// //    - Do not infer or add information not in the context.  

// // 4. **Professional Style:**  
// //    - Keep responses concise and authoritative.`


//   const messages = [
//     new SystemMessage(systemPrompt),
//     new HumanMessage(`context: ${documents}\n\nquestion:\n${question}`)
//   ];

//   // Invoke LLM and await the response
//   const response = await llm.invoke(messages);

//   // End timing execution after the async function completes


//   console.timeEnd("ExecutionTime")
//   return {
//     chat_history: state.chat_history + `question is ${question} \n Answer for it is : ${response.content} \n\n`,
//     documents: documents,
//     question: question,
//     generation: response.content as string,
//     rel_image: state.rel_image,
//   };
// }

// async function Internal(
  
//     state: typeof GraphState.State
//   ): Promise<Partial<typeof GraphState.State>> {
//     console.log("---WEB SEARCH---");
  
//     const question = state.question;
//     const documents = state.documents;
  
//     const systemPrompt = `
//          """"You are a telecom expert specializing in 3G, 4G, 5G, and emerging technologies. Assist users with accurate answers to telecom network, standards, and quality assurance queries.
// Rules:

//     Confident Responses Only: Answer only if confident and sure of accuracy.
//     Reference Standards: Quote relevant 3GPP or telecom documents (e.g., TS 23.501) with document number, title, and specific sections when applicable.
//     No Guessing: Respond with "I don't know the answer " if unsure.
//     Keep it Concise: Provide clear, professional, and concise answers focused on user needs."

// """
//     `;
  
//     const messages = [
//       new SystemMessage(systemPrompt),
//       new HumanMessage(`question: ${question}`)
//     ];
  
//     try {
//       const response = await llm.invoke(messages);
//       const llmResults = response.content as string;

//       // Assuming documents is an array of strings
//       const newDocuments = [...documents, llmResults];
     
//       return {
//         generation:llmResults,
//         rel_image:state.rel_image
//       };
//     } catch (error) {
//       console.error("Error during LLM invocation:", error);
//       throw new Error("Failed to perform web search.");
//     }
//   }

//   function decideToGenerate(
//     state: typeof GraphState.State
//   ): "Internal" | "generate" {
//     console.log("---ASSESS GRADED DOCUMENTS---");
//     const webSearch = state.web_search;
  
//     if (webSearch === "yes") {
//       console.log("---DECISION: TRANSFORM QUERY---");
//       return "Internal";
//     } else {
//       console.log("---DECISION: GENERATE---");
//       return "generate";
//     }
//   }

// // Workflow definition
// const workflow = new StateGraph(GraphState)
//   .addNode("Contextualize_query", rephrasedQuery)
//   .addNode("retrieve", retrieve)
//   .addNode("gradeDocuments", gradeDocuments)
//   .addNode("generate", generate)
//   .addNode("Internal_Knowledge", Internal);

// // workflow.setEntryPoint("Contextualize_query");
// workflow.addEdge(START,"Contextualize_query");
// workflow.addEdge("Contextualize_query", "retrieve");
// workflow.addEdge("retrieve", "gradeDocuments");
// workflow.addConditionalEdges(
//   "gradeDocuments",
//   decideToGenerate,
//   {
//     Internal: "Internal_Knowledge",
//     generate: "generate",
//   }
// );
// workflow.addEdge("Internal_Knowledge", END);
// workflow.addEdge("generate", END);
// const memory = new MemorySaver();
// const app = workflow.compile({ checkpointer: memory });
// // Class definition to classify if a question is telecom-related
// class GeneralQuestion {
//   binary_score: string;

//   constructor(binary_score: string) {
//     if (!["yes", "no"].includes(binary_score.toLowerCase())) {
//       throw new Error(
//         "Invalid binary_score: must be 'yes' or 'no'. Received: " + binary_score
//       );
//     }
//     this.binary_score = binary_score.toLowerCase();
//   }
// }

// // Function to classify and answer questions
// async function generalQA(query: string): Promise<string> {
//   const generalModel = new ChatOllama({ model: "llama3.2:3b", temperature: 0 });
//   const assistant = `You are an AI assistant. Give a direct answer to the user's question.`;
//   const systemPrompt = `
//     You are an expert in telecommunications. Respond with "YES" if the user's query is related to telecom topics 
//     (such as network issues, protocols, standards, specifications, troubleshooting, 3G, 4G, 5G, or any other telecom-related concepts). 
//     Respond with "NO" for any other general or unrelated queries that are not telecom-related. Your answers must be strict and clear.

//     Query: {user_query}
//     Response: should only yes or no
//   `;

//   // Prepare the input text for the LLM
 
//   // Default evaluation value
//   let response: string = "";
  
//   try {
//     const messages = [
//       new SystemMessage(systemPrompt),
//       new HumanMessage(`question: ${query}`)
//     ];
//     // Invoke the LLM to classify the question
//     const aiResponse = await generalModel.invoke(messages);
//     const aiResponseContent = aiResponse.content.toString().trim().toLowerCase();
//     // Instantiate GeneralQuestion with the LLM response
//     const evaluation = new GeneralQuestion(aiResponseContent);
//     console.log(`evalua is ${evaluation}`);
//     // If the question is not telecom-related, ask the assistant to answer it directly
//     if (evaluation.binary_score == "no") {
     
//       const messages = [
//         new SystemMessage(assistant),
//         new HumanMessage(`question: ${query}`)
//       ];
//       // Invoke the LLM for the direct answer
//       const res = await generalModel.invoke(messages );
//       response = res.content.toString().trim();
//       return response;
//     }
    
//     return "yes" ;
//   } catch (error) {
//     console.error("Error in generalQA function:", error);
//     return  "Could not classify the response. Check LLM output." ;
//   }
// }


// // async function runGraph(query: string, id: string): Promise<string> {
// //   const config = {
// //     configurable: { thread_id: id },
// //   };

// //   try {
// //     // Check if the query is telecom-related
// //     const qaResult = await generalQA(query); // Await the result of generalQA
// //     if (qaResult!== "yes") {
// //       return qaResult; // Return the response directly if not telecom-related
// //     }

// //     // Fetch memory state and invoke the app for telecom-related queries
// //     const memoryState = await app.getState(config);
// //     console.log(`State: ${JSON.stringify(memoryState)}`);

// //     const result = await app.invoke({ question: query }, config);

// //     // Return the processed result from the app
// //     return result.generation.substring(11),result.rel_image;
// //   } catch (error) {
// //     console.error("Error in runGraph function:", error);
// //     throw new Error("Failed to execute runGraph.");
// //   }
// // }
// async function runGraph(query: string, id: string): Promise<{ response: string; image: string | null }> {
//   const config = {
//     configurable: { thread_id: id },
//   };

//   try {
//     // Check if the query is telecom-related
//     if (!query.includes("previous")) {
//       // Invoke generalQA function for queries not containing "previous"
//       const qaResult = await generalQA(query);
    
//       console.log(`The QA result is: ${qaResult}`);
    
//       // Check if the result is not "yes" (case insensitive)
//       if (qaResult.toString().toLowerCase() !== "yes") {
//         return { response: qaResult, image: null }; // Return non-telecom-related response
//       }
//     }
    

//     // Fetch memory state and invoke the app for telecom-related queries
//     const memoryState = await app.getState(config);
//     console.log(`State: ${JSON.stringify(memoryState)}`);

//     const result = await app.invoke({ question: query }, config);
//     const marker = "**Answer:**";
//     const answerStartIndex = result.generation.indexOf(marker);
    
//     let response;
//     if (answerStartIndex !== -1) {
//       // Extract the part after "**Answer:**"
//       response = result.generation.substring(answerStartIndex + marker.length).trim();
//     } else {
//       // If marker is not found, return result.generation as is
//       response = result.generation;
//     }
//     // Return the processed result and related image (if any)
//     return {
//       response: response,
//       image: result.rel_image || null,
//     };
//   } catch (error) {
//     console.error("Error in runGraph function:", error);
//     throw new Error("Failed to execute runGraph.");
//   }
 
// }

// // Error handling for unhandled promise rejections
// process.on("unhandledRejection", (error) => {
//   console.error("Unhandled promise rejection:", error);
// });



  
// //   const q1 = "What is the role of the Master Information Block (MIB) in the System Information Acquisition procedure?"
// //   const q2="when call drop ocuurs"
  
// //   runGraph(q2, "1")
// //     .then((result) => {
// //       console.log(result.response, result.image);
// //     })
// //     .catch((error) => {
// //       console.error("Error calling runGraph:", error);
// //     });
// //   console.time("ExecutionTime");
// //   const reformulatedQuery =`"reformulated_query": "What does it mean to be subscribed to a Priority Service?"` ;
// // const question = reformulatedQuery.split(":")[1]?.trim().replace(/['"]/g, '') || reformulatedQuery;
// // console.timeEnd("ExecutionTime");
// // console.log(question); // Output: What does it mean to be subscribed to a Priority Service?



///redcuing latency




import * as os from 'os';
// import * as ProgressBar from 'cli-progress';
import * as random from 'random';
// import * as tf from '@tensorflow/tfjs-node-gpu';
import { QdrantClient } from '@qdrant/js-client-rest';
import { MemorySaver } from "@langchain/langgraph";
import { START, StateGraph, END } from "@langchain/langgraph";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";
import { Annotation } from "@langchain/langgraph";
import { DocumentInterface } from "@langchain/core/documents";
import { pipeline } from '@xenova/transformers';
import express, { query } from "express";
import cors from 'cors';
import { custom } from 'zod';

// function generateUniqueId(existingIds: Set<number>): number {
//   let randomId: number;
//   do {
//     randomId = Math.floor(Math.random() * 1000);
//   } while (existingIds.has(randomId));
//   existingIds.add(randomId);
//   return randomId;
// }

const existingIds = new Set<number>();
const app_1 = express();
app_1.use(express.json());
app_1.use(cors({
  origin: "*"
}))

app_1.post("/api/query1",async (req: express.Request, res: express.Response) => {
  
  const {query}=req.body;
  
  const ids="1";
  const result = await runGraph(query,"1");
  res.status(201).json({message:"hello world",result});
  
});
app_1.listen(4002, () => {
  console.log("Server is running on port 4001");
});
const client=new QdrantClient({url:"http://localhost:6333"})
const model_name = "llama3.2:3b";
const llm = new ChatOllama({
  model: model_name,
  temperature: 0,
});
const model = await pipeline('feature-extraction', 'Xenova/bge-large-en-v1.5');
async function searchDocuments(query: string, collectionName: string = "3GPP_DATA", limit: number = 3): Promise<any[]> {
  try {
    // console.time("ExecutionTime");
    // Encode the query to get an embedding
    const queryEmbedding = await model(query, { pooling: 'mean', normalize: true });
    
    // Convert embedding to a flat array
    const queryVector = queryEmbedding.tolist()[0];
    
    // Ensure embedding length matches the expected dimension
    if (queryVector.length !== 1024) {
      throw new Error(`Embedding size mismatch: Expected 1024, got ${queryVector.length}`);
    }

    // Perform search in Qdrant
    const results = await client.search(collectionName, {
      vector: queryVector,
      limit,
    });
    // console.log("time to run the searchDocuments function")
    // console.timeEnd("ExecutionTime");
    return results;
  } catch (error) {
    console.error("Error in search:", error);
    throw error;
  }
}
const GraphState = Annotation.Root({
  question: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),
  generation: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),
  rel_image: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),
  chat_history: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "",
  }),
  web_search: Annotation<string>({
    reducer: (x, y) => y ?? x ?? "yes",
  }),
  documents: Annotation<string[]>({
    reducer: (x, y) => y ?? x ?? [],
  }),
  source_info: Annotation<string[]>({
    reducer: (x, y) => y ?? x ?? [],
  }),
});

class RetrievalEvaluator {
  binary_score: string;

  constructor(binary_score: string) {
      this.binary_score = binary_score;
  }
}
async function Grade(document: string, question: string): Promise<string> {
  // console.time("ExecutionTime");
const gradeSystem = `
You are a grader assessing the strict relevance of a document to a user question.
Given a question, does the following document have exact information to answer the question? Answer yes or no only

Example Input:
Context: The signaling procedures in LTE involve procedures such as attach, detach, and handover between cells.
Question: What signaling procedures are used in LTE?

Example Output:
yes

Example Input:
Context: The mobile network supports high-speed data services across various frequencies.
Question: What are the latest advancements in LTE technology?

Example Output:
no

Return strictly "yes" or "no".
`;

const inputText = `
${gradeSystem}
Context:
${document}
Question: ${question}
`;

const llm = new ChatOllama({ model: "llama3.2:3b", temperature: 0 });

try {
    // Invoke the LLM with the input text and get the response
    const aiResponse = await llm.invoke(inputText);

    // Parse the LLM response into the RetrievalEvaluator class
    const evaluation = new RetrievalEvaluator(aiResponse.content.toString().trim());
    // console.log(`the time take to run Grade function is`)
    // console.timeEnd("ExecutionTime");
    // Return the binary score ('yes' or 'no')
    return evaluation.binary_score;
} catch (error) {
    console.error('Error: ', error);
    return "Error: Could not classify the response. Check LLM output.";
}
}

async function relevantImages(
  query: string
): Promise<{ context: string; images: string[] }> {
  // console.time("ExecutionTime");
  const results = await searchDocuments(query, "Images_collection_All");
  if (!results.length) {
    return { context: "No results found for the question.", images: [] };
  }

  let top3Context = "";
  const relImages: string[] = [];

  for (const result of results) {
    try {
      if (result.score > 0.65) {
        const content = result.payload?.context || "Content not available.";
        const imagePath = result.payload?.Imagepath || "Unknown Source";
        relImages.push(imagePath);
        top3Context += `Context: ${content}\n\n`;
      }
    } catch (error) {
      console.error("Error during processing:", error);
    }
  }
  // console.log("tine to run Relevant image")
  // console.timeEnd("ExecutionTime");
  return { context: top3Context, images: relImages };
}

// async function retrieve(
//   state: typeof GraphState.State
// ): Promise<Partial<typeof GraphState.State>> {
//   console.log("---RETRIEVE---");
//   const question = state.question;
//   const documents = await searchDocuments(question);
//   const relevantDocs: string[] = [];
//   const { context: imageContext, images: relImages } = await relevantImages(question);

//   for (const result of documents) {
//     if (result.score > 0.65) {
//       const retrievedDoc = `
//         Use this context for Answering the Question: ${result.payload?.content || "Unknown Content"}
//         Section taken from Document - ${result.payload?.source || "Unknown Source"}
//         Document Title: ${result.payload?.document_title || "Unknown Document Title"}
//         Section Title: ${result.payload?.section_title || "Unknown Section Title"}
//         Series Subject: ${result.payload?.series_subject || "Unknown Series Subject"}
//         Working Group: ${result.payload?.working_group || "Unknown Working Group"}
//       `;
//       relevantDocs.push(retrievedDoc.trim());
//     }
//   }

//   let image: string | null = null;
//   if (relImages.length > 0) {
//     relevantDocs.push(imageContext);
//     image = relImages[0];
//   }

//   return {
//     documents: relevantDocs,
//     question: question,
//     rel_image: image as string
//   };
// }
async function retrieve(
  state: typeof GraphState.State
): Promise<Partial<typeof GraphState.State>> {
  console.log("---RETRIEVE---");
  // console.time("ExecutionTime");
  const question = state.question;

  // Run searches concurrently
  const [documentResults, imageResults] = await Promise.all([
    searchDocuments(question),
    relevantImages(question),
  ]);

  const relevantDocs: string[] = [];
  const metadata: string[]=[];
  const { context: imageContext, images: relImages } = imageResults;
 
  
  for (const result of documentResults) {
    if (result.score > .65) {  // Only process results with score greater than rank
      const retrievedDoc = `
        Context: ${result.payload?.content || "Unknown Content"}
      `;

      // Add relevant document
      relevantDocs.push(retrievedDoc.trim());
      const metaParts = [];
      
      if (result.payload?.source && result.payload.source !== "Unknown") {
        metaParts.push(` Document Number: ${result.payload.source}\n`);
      }
      
      if (result.payload?.document_title && result.payload.document_title !== "Unknown") {
        metaParts.push(`Document Title: ${result.payload.document_title}\n`);
      }
      
      if (result.payload?.section_title && result.payload.section_title !== "Unknown") {
        metaParts.push(`Section Title: ${result.payload.section_title}\n`);
      }
      
      if (result.payload?.series_subject && result.payload.series_subject !== "Unknown") {
        metaParts.push(`Series Subject: ${result.payload.series_subject}\n`);
      }
      
      if (result.payload?.working_group && result.payload.working_group !== "Unknown") {
        metaParts.push(`Working Group: ${result.payload.working_group}`);
      }
  
      // Check if the current score is higher than the previous rank and update top_metadata
      
  
      // Create metadata and relevant document strings
      const meta = metaParts.join("\n\n");
      console.log(`the source info is ${meta}`);
      // Add the top metadata first, followed by the rest of the metadata
      
      metadata.push(meta.trim());
  
    }
  }
  let image: string | null = null;
  if (relImages.length > 0) {
    relevantDocs.push(imageContext);
    image = relImages[0];
  }
   console.log("")
  //  console.log(`the time take to run retrieve function is`)
  //  console.timeEnd("ExecutionTime");
  return {
    documents: relevantDocs,
    question,
    rel_image: image as string,
    source_info:metadata
  };
}

async function rephrasedQuery(
  state: typeof GraphState.State
): Promise<Partial<typeof GraphState.State>> {
  console.log("Running Contextualize query node!");
  console.time("ExecutionTime")
  // console.time("ExecutionTime");
  const query = state.question;
  const history = state.chat_history || "";
  
  
  const systemPrompt = `
"Given a chat history and the latest user question, which might reference prior context from the chat history,"
"reformulate the question into a standalone query that can be understood independently, without relying on the chat history."
"Do NOT provide an answer to the question; only return the reformulated query, or leave it as is if no changes are required."

  ### OUTPUT FORMAT SHOULD ONLY THE BELOW ONE

  "reformulated_query": "<question>"
  `;
  // const systemPrompt = `
  // "You are an AI assistant specializing in 3GPP telecom standards.  
  // Given a chat history and the latest user question, return a standalone, precise question about 3GPP standards.  
  // Use accurate 3GPP terminology. If the question is already clear, return it as is. Do NOT answer the question.
  
  // ### Output Format:
  // "reformulated_query": "<question>"
  // `;
  
  const messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage(`${history}\n${query}`)
  ];

  const response = await llm.invoke(messages);
  try {
    const content = typeof response.content === 'string' ? response.content : String(response.content);
    console.log("Response Content:", content);
    
    // const match = content.match(/\*\*reformulated_query:\*\*\s*"([^"]*)"/);
    console.log("Match Result:", content.split(":")[1]);
    const question = content.split(":")[1]?.trim().replace(/['"]/g, '') || query;
    // const reformulatedQuery = match?.[1] || query;
    console.log(question);
     console.log(`the time take to run rephrased function is`)
    console.timeEnd("ExecutionTime");
    return {
        question: question,
        chat_history: `Previous query: ${question}`
      };
  } catch (error) {
    console.error("Error processing reformulated query:", error);
    throw new Error("Failed to extract reformulated query.");
  }

  
}

// async function gradeDocuments(
//   state: typeof GraphState.State
// ): Promise<Partial<typeof GraphState.State>> {
//   console.log("---CHECK DOCUMENT RELEVANCE TO QUESTION---");
//   console.time("ExecutionTime");
//   const question = state.question;
//   const documents = state.documents;
//   const filteredDocs: string[] = [];
//   let webSearch = "yes";
//   for (const doc of documents) {
   
//     const score = await Grade(doc, question);

//     if (score.toLowerCase()=="yes") {
//       console.log("---GRADE: DOCUMENT RELEVANT---");
//       filteredDocs.push(doc);
//       webSearch = "no";
//     }
//     else continue;
//   }
//   console.log('length of grader is ')
//   console.log(filteredDocs.length)
//    console.timeEnd("ExecutionTime");
//   return {
//     documents: filteredDocs,
//     question: question,
//     web_search: webSearch
//   };
 //}
async function gradeDocuments(
  state: typeof GraphState.State
): Promise<Partial<typeof GraphState.State>> {
  console.log("---CHECK DOCUMENT RELEVANCE TO QUESTION---");
  console.time("ExecutionTime");
  const question = state.question;
  const documents = state.documents || [];
  let webSearch = "yes";
  // Concurrently grade documents
  const gradedDocs = await Promise.all(
    documents.map(async (doc) => ({
      doc,
      score: await Grade(doc, question),
    }))
  );

  // Filter relevant documents
  const filteredDocs = gradedDocs
    .filter(({ score }) => score.toLowerCase() === "yes")
    .map(({ doc }) => doc);

  if (filteredDocs.length > 0) webSearch = "no";
  // console.log(`the time take to run gradedocumnets function is`)
  console.timeEnd("ExecutionTime");
  console.log('length of grader is ')
  console.log(filteredDocs.length)
  return {
    documents: filteredDocs,
    question,
    web_search: webSearch,
  };
}

async function generate(
  state: typeof GraphState.State
): Promise<Partial<typeof GraphState.State>> {
  console.log("---GENERATE---");
  

console.time("ExecutionTime")

  const question = state.question;
  const documents = state.documents;
  console.log(documents.length);

  const systemPrompt = `
  You are a telecom chatbot assistant. Your job is to answer user queries related to telecommunications clearly, concisely, and accurately. Follow these instructions:

  1. Provide direct and structured answers based on the context provided.
  2. Avoid unnecessary details or unrelated information.
  3. Use proper telecom terminology, explaining terms only when asked.
  4. Organize responses in bullet points or short paragraphs for readability.
  5. If the context is insufficient to answer, state this directly without making assumptions.
  6. Avoid using any Markdown syntax, such as **bold**, *italics*, or other special characters. All responses should be in plain text.

  Example Responses:
  - User Query: "What is the role of RRC in 5G?"
    Response:
      - The RRC (Radio Resource Control) in 5G manages signaling between the UE (User Equipment) and the gNB (base station).
      - It performs functions like:
        1. Connection setup and release.
        2. Mobility management.
        3. Security configuration.
        4. QoS (Quality of Service) handling.
  
  - User Query: "Difference between FDD and TDD?"
    Response:
      - FDD (Frequency Division Duplex):
        - Separate frequency bands for uplink and downlink.
        - Allows simultaneous transmission and reception.
      - TDD (Time Division Duplex):
        - Same frequency band for uplink and downlink.
        - Alternates between uplink and downlink in time slots.

  Stay focused and always provide structured, concise answers.
`;


  const messages = [
    new SystemMessage(systemPrompt),
    new HumanMessage(`context: ${documents}\n\nquestion:\n${question}`)
  ];

  // Invoke LLM and await the response
  const response = await llm.invoke(messages);

// // Join the elements with a space and repeat the same elements after the space
// const source_information = `\n\nSee the Source Information for more details: \n\n` + 
//   (state.source_info?.map(item => item + ' ' + item).join(' ') || "No source information available.");
// const source_information = `\n\nSee the Source Information for more details: \n\n` + 
//   (state.source_info?.length > 0 ? 
//     `${state.source_info[0]}\n\n See other relevant documents:\n\n${state.source_info.slice(1).join('\n')}` 
//     : "No source information available.");

// const source_information = `\n\nSee the Source Information for more details: \n\n` + 
//   (state.source_info?.length > 0 ? 
//     `${state.source_info[0]}\n\n See other relevant documents:\n\n${state.source_info.slice(1).map(item => item + '\n').join('\n')}` 
//     : "No source information available.");

// const final_response = response.content.toString().trim()+`\n\n` +source_information;
  console.timeEnd("ExecutionTime")
  return {
    chat_history: state.chat_history + `question is ${question} \n Answer for it is : ${response.content} \n\n`,
    documents: documents,
    question: question,
    generation: response.content as string,
    rel_image: state.rel_image,
    source_info:state.source_info
  };
}

async function Internal(
  
    state: typeof GraphState.State
  ): Promise<Partial<typeof GraphState.State>> {
    console.log("---Internal Knowledge---");
  
    const question = state.question;
    const documents = state.documents;
  
    const systemPrompt = `
         """"You are a telecom expert specializing in 3G, 4G, 5G, and emerging technologies. Assist users with accurate answers to telecom network, standards, and quality assurance queries.
Rules:

    Confident Responses Only: Answer only if confident and sure of accuracy.
    Reference Standards: Quote relevant 3GPP or telecom documents (e.g., TS 23.501) with document number, title, and specific sections when applicable.
    No Guessing: Respond with "I don't know the answer " if unsure.
    Keep it Concise: Provide clear, professional, and concise answers focused on user needs."

"""
    `;
  
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(`question: ${question}`)
    ];
  
    try {
      const response = await llm.invoke(messages);
      const llmResults = response.content as string;
    //   const source_information = `\n\nSee the Source Information for more details: \n\n` + `\n\n`+
    //   (state.source_info?.length > 0 ? 
    //     `${state.source_info[0]}\n\n See other relevant documents:\n\n${state.source_info.slice(1).map(item => item + '\n').join('\n')}` 
    //     : "No source information available.");
    
    // const final_response = llmResults.toString().trim()+`\n\n` +source_information;
    //   // Assuming documents is an array of strings
    //   const newDocuments = [...documents, llmResults];
     
      return {
        generation:llmResults,
        source_info:state.source_info,
        rel_image:state.rel_image
      };
    } catch (error) {
      console.error("Error during LLM invocation:", error);
      throw new Error("Failed to perform web search.");
    }
  }

  function decideToGenerate(
    state: typeof GraphState.State
  ): "Internal" | "generate" {
    console.log("---ASSESS GRADED DOCUMENTS---");
    const webSearch = state.web_search;
  
    if (webSearch === "yes") {
      console.log("---DECISION: Internal node called---");
      return "Internal";
    } else {
      console.log("---DECISION: GENERATE---");
      return "generate";
    }
  }

// Workflow definition
const workflow = new StateGraph(GraphState)
  .addNode("Contextualize_query", rephrasedQuery)
  .addNode("retrieve", retrieve)
  .addNode("gradeDocuments", gradeDocuments)
  .addNode("generate", generate)
  .addNode("Internal_Knowledge", Internal);

// workflow.setEntryPoint("Contextualize_query");
workflow.addEdge(START,"Contextualize_query");
workflow.addEdge("Contextualize_query", "retrieve");
workflow.addEdge("retrieve", "gradeDocuments");
workflow.addConditionalEdges(
  "gradeDocuments",
  decideToGenerate,
  {
    Internal: "Internal_Knowledge",
    generate: "generate",
  }
);
workflow.addEdge("Internal_Knowledge", END);
workflow.addEdge("generate", END);
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });

// Class definition to classify if a question is telecom-related
class GeneralQuestion {
  binary_score: string;

  constructor(binary_score: string) {
    if (!["yes", "no"].includes(binary_score.toLowerCase())) {
      throw new Error(
        "Invalid binary_score: must be 'yes' or 'no'. Received: " + binary_score
      );
    }
    this.binary_score = binary_score.toLowerCase();
  }
}

// Function to classify and answer questions
async function generalQA(query: string): Promise<string> {
  const generalModel = new ChatOllama({ model: "llama3.2:3b", temperature: 0 });
  const assistant = `You are an AI assistant. Give a direct answer to the user's question.`;
  const systemPrompt = `
    You are an expert in telecommunications. Respond with "YES" if the user's query is related to telecom topics 
    (such as network issues, protocols, standards, specifications, troubleshooting, 3G, 4G, 5G, or any other telecom-related concepts). 
    Respond with "NO" for any other general or unrelated queries that are not telecom-related. Your answers must be strict and clear.

    Query: {user_query}
    Response: should only yes or no
  `;

  // Prepare the input text for the LLM
 
  // Default evaluation value
  let response: string = "";
  
  try {
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(`question: ${query}`)
    ];
    // Invoke the LLM to classify the question
    const aiResponse = await generalModel.invoke(messages);
    const aiResponseContent = aiResponse.content.toString().trim().toLowerCase();
    // Instantiate GeneralQuestion with the LLM response
    const evaluation = new GeneralQuestion(aiResponseContent);
    console.log(`evalua is ${evaluation}`);
    // If the question is not telecom-related, ask the assistant to answer it directly
    if (evaluation.binary_score == "no") {
     
      const messages = [
        new SystemMessage(assistant),
        new HumanMessage(`question: ${query}`)
      ];
      // Invoke the LLM for the direct answer
      const res = await generalModel.invoke(messages );
      response = res.content.toString().trim();
      return response;
    }
    
    return "yes" ;
  } catch (error) {
    console.error("Error in generalQA function:", error);
    return  "Could not classify the response. Check LLM output." ;
  }
}


// async function runGraph(query: string, id: string): Promise<string> {
//   const config = {
//     configurable: { thread_id: id },
//   };

//   try {
//     // Check if the query is telecom-related
//     const qaResult = await generalQA(query); // Await the result of generalQA
//     if (qaResult!== "yes") {
//       return qaResult; // Return the response directly if not telecom-related
//     }

//     // Fetch memory state and invoke the app for telecom-related queries
//     const memoryState = await app.getState(config);
//     console.log(`State: ${JSON.stringify(memoryState)}`);

//     const result = await app.invoke({ question: query }, config);

//     // Return the processed result from the app
//     return result.generation.substring(11),result.rel_image;
//   } catch (error) {
//     console.error("Error in runGraph function:", error);
//     throw new Error("Failed to execute runGraph.");
//   }
// }
async function runGraph(query: string, id: string): Promise<{ source: string[];response: string; image: string | null }> {
  const config = {
    configurable: { thread_id: id },
  };

  try {
    // Check if the query is telecom-related
    if (!query.includes("previous")) {
      // Invoke generalQA function for queries not containing "previous"
      const qaResult = await generalQA(query);
    
      console.log(`The QA result is: ${qaResult}`);
    
      // Check if the result is not "yes" (case insensitive)
      if (qaResult.toString().toLowerCase() !== "yes") {
        return { source:[],response: qaResult, image: null }; // Return non-telecom-related response
      }
    }
    

    // Fetch memory state and invoke the app for telecom-related queries
    const memoryState = await app.getState(config);
    console.log(`State: ${JSON.stringify(memoryState)}`);

    const result = await app.invoke({ question: query }, config);
    const marker = "**Answer:**";
    const answerStartIndex = result.generation.indexOf(marker);
    
    let response;
    if (answerStartIndex !== -1) {
      // Extract the part after "**Answer:**"
      response = result.generation.substring(answerStartIndex + marker.length).trim();
    } else {
      // If marker is not found, return result.generation as is
      response = result.generation;
    }
  //   const source_information = `\n\nSee the Source Information for more details: \n\n` + 
  // (result.source_info?.length > 0 ? 
  //   `${result.source_info[0]}\n\n See other relevant documents:\n\n${result.source_info.slice(1).map(item => item + '\n').join('\n')}` 
  //   : "No source information available.");
    // Return the processed result and related image (if any)
  //  const source_information = 
  const source_information = 
  (result.source_info?.length > 0 ? 
    `${result.source_info[0]}\n\n` +  // First document info
    `See other relevant documents:` + "\n\n"+
    result.source_info.slice(1).map(item => `  - ${item}`).join('\n\n') +  // Adding extra space between items
    '\n'  // Ensure there's a newline at the end for better readability
    : "No source information available.");

     console.log(`${source_information}`);
    return {
      response: response,
      source:result.source_info,
      image: result.rel_image || null,
    };
  } catch (error) {
    console.error("Error in runGraph function:", error);
    throw new Error("Failed to execute runGraph.");
  }
 
}

// Error handling for unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});



const input = {
  question: "give all protocls associated with voice calling?",
};

const config = {
  configurable: {
    thread_id: "stream_messages",
  },
};

// // Ensure `app` is properly initialized or imported
// const stream = await app.stream(input, config);

// let lastEvent = null;

// // Iterate through the stream
// for await (const event of stream) {
//   lastEvent = event; // Keep overwriting with the latest event
// }

// // After the loop, display the last event
// if (lastEvent) {
//   console.log("Last Event Response:");
//   if ("Internal_Knowledge" in lastEvent) {
//     console.log(`${lastEvent["Internal_Knowledge"]["generation"]}\n`);
//     console.log("Source Information:");
//     console.log(`${lastEvent["Internal_Knowledge"]["source_info"]}\n`);
//   }

//   if ("generate" in lastEvent) {
//     console.log(`${lastEvent["generate"]["generation"]}\n`);
//     console.log("Source Information:");
//     console.log(`${lastEvent["generate"]["source_info"]}\n`);
//   }
// } else {
//   console.log("No events received from the stream.");
// }